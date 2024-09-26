// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5_jBhH0CWNs_Nhfqqsrik-ZuxLERx9ys",
  authDomain: "ai-trip-planner-9d584.firebaseapp.com",
  projectId: "ai-trip-planner-9d584",
  storageBucket: "ai-trip-planner-9d584.appspot.com",
  messagingSenderId: "14442726671",
  appId: "1:14442726671:web:66b417e4d07abd38602a7a",
  measurementId: "G-7SY6DNZLGT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);