// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvAEnv4IsVlhQF3KX2gKOc9en2aaus2qw",
  authDomain: "react-journal-a58ca.firebaseapp.com",
  projectId: "react-journal-a58ca",
  storageBucket: "react-journal-a58ca.appspot.com",
  messagingSenderId: "258306065938",
  appId: "1:258306065938:web:a92be86367980182d4facb"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)