import { NextResponse } from "next/server";
// 서버 사이드에서는 별도의 firebase-admin 설정을 사용합니다.
import { adminMessaging as fcm, adminDb as db } from "@/lib/firebase-admin";

export async function POST(request: Request) {
    try {
        const { title, message, imageUrl, linkUrl } = await request.json();

        // 1. 모든 유저의 FCM 토큰 가져오기
        const usersSnapshot = await db.collection("users").get();
        const tokens: string[] = [];
        
        usersSnapshot.forEach(doc => {
            const userData = doc.data();
            if (userData.fcmTokens && Array.isArray(userData.fcmTokens)) {
                tokens.push(...userData.fcmTokens);
            }
        });

        const uniqueTokens = Array.from(new Set(tokens)).filter(t => !!t);

        if (uniqueTokens.length === 0) {
            return NextResponse.json({ error: "No registered devices found" }, { status: 400 });
        }

        console.log(`Sending FCM Push to ${uniqueTokens.length} tokens:`, { title, message, imageUrl, linkUrl });

        // 2. FCM 메시지 구성
        const fcmMessage = {
            notification: {
                title: title,
                body: message,
                ...(imageUrl ? { image: imageUrl } : {})
            },
            data: {
                link: linkUrl || "/",
            },
            tokens: uniqueTokens,
        };

        // 3. 멀티캐스트 전송
        const response = await fcm.sendEachForMulticast(fcmMessage);
        
        console.log("FCM Response:", response);

        return NextResponse.json({
            success: true,
            successCount: response.successCount,
            failureCount: response.failureCount,
            recipients: uniqueTokens.length
        });
    } catch (error: any) {
        console.error("FCM Push Error Detail:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
