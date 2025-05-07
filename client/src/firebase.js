import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD5RIAJGxvjb5DepXQhm_bQvKEI99z_Da0",
  authDomain: "amedias-5c246.firebaseapp.com",
  projectId: "amedias-5c246",
  storageBucket: "amedias-5c246.firebasestorage.app",
  messagingSenderId: "903939552645",
  appId: "1:903939552645:web:32796ff07bc1b172fd00ec",
  measurementId: "G-RJX797F4SJ"
};

// Primero se inicializa la app
const app = initializeApp(firebaseConfig);

// Luego se usa app para inicializar otros servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
