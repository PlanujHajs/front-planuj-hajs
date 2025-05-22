importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAst2iRPzBatP8xliygZyMuUQKT1CiLSmA",
    authDomain: "planuj-hajs.firebaseapp.com",
    projectId: "planuj-hajs",
    storageBucket: "planuj-hajs.firebasestorage.app",
    messagingSenderId: "29845065974",
    appId: "1:29845065974:web:cb0a66f51e93dbf9881cd7",
    measurementId: "G-TXY3FZ76TV"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

importScripts('./service-worker/push.js');

console.log('Firebase messaging service worker działa!.');

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title || 'Nowe Powiadomienie';
  const notificationOptions = {
    body: payload.notification.body || 'Masz nową wiadomość.',
    icon: payload.notification.icon || '/pwa-192x192.png'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

