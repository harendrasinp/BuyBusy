// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp-ESV-SDgWcmTFXa1KWnKu8aYNhfcOSQ",
  authDomain: "buybusy-cdbff.firebaseapp.com",
  projectId: "buybusy-cdbff",
  storageBucket: "buybusy-cdbff.firebasestorage.app",
  messagingSenderId: "263005465703",
  appId: "1:263005465703:web:c376549f2318b3a13f78c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);