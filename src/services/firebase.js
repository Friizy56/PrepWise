import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔴 PASTE YOUR CONFIG HERE
const firebaseConfig = {
    apiKey: "AIzaSyCE_yJ9hf-inEa6lnez6XL35gs0jAMZIJE",
    authDomain: "prepwise-95a6c.firebaseapp.com",
    projectId: "prepwise-95a6c",
    storageBucket: "prepwise-95a6c.firebasestorage.app",
    messagingSenderId: "427674150126",
    appId: "1:427674150126:web:68dcefd1835aebb2a2ffff",
    measurementId: "G-LEHRVN4YJ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);