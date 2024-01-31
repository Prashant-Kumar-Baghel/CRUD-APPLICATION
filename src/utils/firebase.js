// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKp335-dcoUdDGG7pcR4q7Hf6ha7DCFl4",
  authDomain: "crud-application-a989b.firebaseapp.com",
  projectId: "crud-application-a989b",
  storageBucket: "crud-application-a989b.appspot.com",
  messagingSenderId: "897804224091",
  appId: "1:897804224091:web:1ae81a1391dcdef863217e",
  measurementId: "G-CSZZEYVREE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);