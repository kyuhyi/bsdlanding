import { NextResponse } from "next/server";

const ONESIGNAL_APP_ID = "59c7f6c5-47bc-417d-a7a5-7410895a12b8";
const ONESIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;

export async function POST(request: Request) {
    try {
        const { title, message, imageUrl, linkUrl } = await request.json();

        if (!ONESIGNAL_REST_API_KEY) {
            return NextResponse.json({ error: "OneSignal API Key is missing" }, { status: 500 });
        }

        console.log("Sending Push to OneSignal:", { title, message, imageUrl, linkUrl });
        
        const payload: any = {
            app_id: ONESIGNAL_APP_ID,
            included_segments: ["Total Subscriptions"],
            headings: { en: title },
            contents: { en: message },
        };

        // 이미지 URL이 있으면 추가
        if (imageUrl) {
            payload.big_picture = imageUrl;
            payload.chrome_web_image = imageUrl;
            payload.firefox_icon = imageUrl;
        }

        // 링크 URL이 있으면 추가
        if (linkUrl) {
            payload.url = linkUrl;
        }

        const response = await fetch("https://onesignal.com/api/v1/notifications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Basic ${ONESIGNAL_REST_API_KEY}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        console.log("OneSignal Response:", data);

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Push Error Detail:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
