// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-32e1c.firebaseapp.com",
  projectId: "taskmanager-32e1c",
  storageBucket: "taskmanager-32e1c.appspot.com",
  messagingSenderId: "755902202966",
  appId: "1:755902202966:web:0463ec6afcfc75aabea7f7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// console.log(firebaseConfig);
