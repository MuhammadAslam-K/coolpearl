// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';  // Add this import


// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAhGmbcf1GcSfPeIjZndILWCC11sbsGTL4",
    authDomain: "pearl-test-d9450.firebaseapp.com",
    projectId: "pearl-test-d9450",
    storageBucket: "pearl-test-d9450.appspot.com",
    messagingSenderId: "223833263765",
    appId: "1:223833263765:web:656ac1d10eecaeea41959c",
    measurementId: "G-M034EWNHWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);  // Initialize storage

export { db, storage };