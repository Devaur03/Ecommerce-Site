import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZWLYSZwXzt0DXbCC-5j6dIyLz9eY5_Vk",
  authDomain: "ecommercefurniture03.firebaseapp.com",
  projectId: "ecommercefurniture03",
  storageBucket: "ecommercefurniture03.firebasestorage.app",
  messagingSenderId: "253443713410",
  appId: "1:253443713410:web:d6dd430a62302612d7879b",
  measurementId: "G-Y6S07K2S3E"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
