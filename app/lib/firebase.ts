// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI7U9N2a4tXlcEbi7JZQtkrh0PFQCCEb0",
  authDomain: "rodatech-bf3ea.firebaseapp.com",
  projectId: "rodatech-bf3ea",
  storageBucket: "rodatech-bf3ea.firebasestorage.app",
  messagingSenderId: "186509051313",
  appId: "1:186509051313:web:55e412ebf69147aef72990"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
export {auth, db}