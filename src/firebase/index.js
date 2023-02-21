// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXJGmlG7ef5Q9dSqbLMylS7Bu2gO5CtGs",
  authDomain: "todosapp-828cd.firebaseapp.com",
  projectId: "todosapp-828cd",
  storageBucket: "todosapp-828cd.appspot.com",
  messagingSenderId: "652663310931",
  appId: "1:652663310931:web:a3e69c32fee7dbda99d4a6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

//init firestore service
const db = getFirestore(app);


export { db }