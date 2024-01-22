// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARARKaWPtvn4qZc7_F0-zlfp9dB2Mfwhw",
  authDomain: "smart-parking-5542a.firebaseapp.com",
  databaseURL: "https://smart-parking-5542a-default-rtdb.firebaseio.com",
  projectId: "smart-parking-5542a",
  storageBucket: "smart-parking-5542a.appspot.com",
  messagingSenderId: "691838087435",
  appId: "1:691838087435:web:3b3fd02d02a111d572720e",
  measurementId: "G-LSBS4RCP0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export default app;