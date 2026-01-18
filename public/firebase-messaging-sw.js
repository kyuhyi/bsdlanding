importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// Firebase 앱 설정 (자동으로 채워진 실제 값입니다)
const firebaseConfig = {
    apiKey: "AIzaSyA74W3fASfF93HD9Ig_xu5q7aO7X1X3C5A",
    authDomain: "test100-31e3c.firebaseapp.com",
    projectId: "test100-31e3c",
    storageBucket: "test100-31e3c.firebasestorage.app",
    messagingSenderId: "1075735055880",
    appId: "1:1075735055880:web:784ff61feb9b390eaccbbd"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// 백그라운드 메시지 핸들러
messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Background Message:", payload);

    const { title, body, image } = payload.notification || {};
    const { link } = payload.data || {};

    const notificationTitle = title || "VIBE CODING";
    const notificationOptions = {
        body: body || "새로운 메시지가 도착했습니다.",
        icon: image || "/bsd-white.png",
        badge: "/bsd-white.png",
        tag: "vibe-push-notification", // 같은 태그는 최신것으로 덮어씀
        renotify: true,
        data: {
            url: link || "/"
        }
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 시 해당 URL로 이동
self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    const urlToOpen = event.notification.data.url;

    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url === urlToOpen && "focus" in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
