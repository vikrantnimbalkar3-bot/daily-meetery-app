importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAbRJqMtELOp2WlVzfrsBXwNIBQCHhB0gA",
  authDomain: "daily-meetery-6fe00.firebaseapp.com",
  projectId: "daily-meetery-6fe00",
  storageBucket: "daily-meetery-6fe00.firebasestorage.app",
  messagingSenderId: "723697995611",
  appId: "1:723697995611:web:bfaf3b6c0ced6e046e547e"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: icon || 'https://daily-meetery-app.vercel.app/DSC04901.jpg',
    badge: undefined,
    vibrate: [200, 100, 200],
    data: payload.data
  });
});
