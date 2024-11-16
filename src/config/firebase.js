import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { setLogLevel } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAhGmbcf1GcSfPeIjZndILWCC11sbsGTL4",
    authDomain: "pearl-test-d9450.firebaseapp.com",
    projectId: "pearl-test-d9450",
    storageBucket: "pearl-test-d9450.appspot.com",
    messagingSenderId: "223833263765",
    appId: "1:223833263765:web:656ac1d10eecaeea41959c",
    measurementId: "G-M034EWNHWH"

    // apiKey: "AIzaSyCZ0XDUXhXCvMaU5E1sZ3SY9c6RgD0TZg8",
    // authDomain: "coolpearl-a5f47.firebaseapp.com",
    // projectId: "coolpearl-a5f47",
    // storageBucket: "coolpearl-a5f47.firebasestorage.app",
    // messagingSenderId: "884171445309",
    // appId: "1:884171445309:web:04ddb273bfdf4b2955c654",
    // measurementId: "G-KV4MRL2HK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
// setLogLevel("debug");

export { db, storage };