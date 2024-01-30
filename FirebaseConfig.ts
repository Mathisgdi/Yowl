// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjb77qs1gQ5jaiX8w0KJWlcqKAAbSgLjo",
  authDomain: "yowl-join.firebaseapp.com",
  projectId: "yowl-join",
  storageBucket: "yowl-join.appspot.com",
  messagingSenderId: "581292534351",
  appId: "1:581292534351:web:bff3659df3eb4080f9583a",
  measurementId: "G-KM0RNGP8C7",
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);