import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCu3ejGEyaqtqYn3IAcSA447d46NtwiWeA",
    authDomain: "chat-bot-7a266.firebaseapp.com",
    projectId: "chat-bot-7a266",
    storageBucket: "chat-bot-7a266.appspot.com",
    messagingSenderId: "213189053693",
    appId: "1:213189053693:web:76209881949bb562d80294",
    measurementId: "G-5BP166NJ6D"
  };

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация Firestore
const db = getFirestore(app);

export { db };
