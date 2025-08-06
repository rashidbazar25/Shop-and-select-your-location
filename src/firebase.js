import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// ✅ إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDMPWbRVOnbV5Lm-32n7rXL6kp5_U5TBqs",
  authDomain: "shoping-c817a.firebaseapp.com",
  projectId: "shoping-c817a",
  storageBucket: "shoping-c817a.appspot.com",
  messagingSenderId: "480026609432",
  appId: "1:480026609432:web:90aceb0d5253649ba9006d",
  measurementId: "G-0RKQXGXKVP"
};

// ✅ تهيئة التطبيق
const app = initializeApp(firebaseConfig);

// ✅ تجهيز الخدمات
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app); // ✅ أضف هذا السطر