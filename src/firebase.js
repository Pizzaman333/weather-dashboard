import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "h24-forecast.firebaseapp.com",
  projectId: "h24-forecast",
  storageBucket: "h24-forecast.firebasestorage.app",
  messagingSenderId: "876140869302",
  appId: "1:876140869302:web:36feef853c50a387ff5817",
  measurementId: "G-ETR4NHQQ2P"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);