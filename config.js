// import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyB13ZyvDnozmEwmNGIFwfPnjX5Szpr1QQg",
  authDomain: "reader-4f04c.firebaseapp.com",
  projectId: "reader-4f04c",
  storageBucket: "reader-4f04c.appspot.com",
  messagingSenderId: "252131656194",
  appId: "1:252131656194:web:5644c1da7b24d0b1cc1d1b",
  measurementId: "G-DG8VLF2T8R",
};

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
const firebase = getFirestore(app);

export { firebase, functions };
