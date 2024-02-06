// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";// This line imports the getFirestore function from the Firebase Firestore library. This function is used to initialize and get access to a Firestore database.
import {getStorage} from "firebase/storage"//This line imports the getStorage function from the Firebase Storage library. T
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
export const db=getFirestore(app);//Here, db is an instance of the Firestore database obtained by calling getFirestore and passing in the Firebase app instance (app). This instance can be used to interact with the Firestore database, including reading and writing data.
export const storage=getStorage(app);//storage is an instance of Firebase Cloud Storage obtained by calling getStorage and passing in the Firebase app instance (app). This instance allows you to perform operations related to storing and retrieving files in Firebase Cloud Storage.

//These instances (db for Firestore and storage for Storage) can be imported into other parts of your application to interact with the respective Firebase services.