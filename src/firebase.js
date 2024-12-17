import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCBkThJ6ee_lt57fY1vOAgSGgS4LcOL74M",
  authDomain: "todo-app-42fc2.firebaseapp.com",
  projectId: "todo-app-42fc2",
  storageBucket: "todo-app-42fc2.firebasestorage.app",
  messagingSenderId: "18991696796",
  appId: "1:18991696796:web:b9f00da1a0944319581659",
  measurementId: "G-6EHJTT8Q1T",
});
d;
const db = firebaseApp.firestore();

export default db;
