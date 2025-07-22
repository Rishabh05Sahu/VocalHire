
import { initializeApp,getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiUNNRUrExJl-wLLUJis5GB1h6uh0hL0A",
  authDomain: "vocalhire-d9972.firebaseapp.com",
  projectId: "vocalhire-d9972",
  storageBucket: "vocalhire-d9972.firebasestorage.app",
  messagingSenderId: "677206986758",
  appId: "1:677206986758:web:494608ec7d5dd398a87387",
  measurementId: "G-3627S7DDG3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
