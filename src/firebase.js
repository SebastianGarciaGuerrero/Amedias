import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5RIAJGxvjb5DepXQhm_bQvKEI99z_Da0",
  authDomain: "amedias-5c246.firebaseapp.com",
  projectId: "amedias-5c246",
  storageBucket: "amedias-5c246.firebasestorage.app",
  messagingSenderId: "903939552645",
  appId: "1:903939552645:web:32796ff07bc1b172fd00ec",
  measurementId: "G-RJX797F4SJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
