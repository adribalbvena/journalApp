// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
import { getEnvironments } from '../helpers';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
VITE_FIREBASE_APIKEY,
VITE_FIREBASE_AUTHDOMAIN,
VITE_FIREBASE_PROJECTID,
VITE_FIREBASE_STORAGEBUCKET,
VITE_FIREBASE_MESSAGINGSENDERID,
VITE_FIREBASE_APPID,
} = getEnvironments();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_FIREBASE_APIKEY,
  authDomain: VITE_FIREBASE_AUTHDOMAIN,
  projectId: VITE_FIREBASE_PROJECTID,
  storageBucket: VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGINGSENDERID,
  appId: VITE_FIREBASE_APPID
};


// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp )
