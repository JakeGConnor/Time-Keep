// firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAnRCTxK1wLmjyBbUZxJm-yWNGimGHo6xk",
    authDomain: "timekeeper-1b35e.firebaseapp.com",
    projectId: "timekeeper-1b35e",
    storageBucket: "timekeeper-1b35e.appspot.com",
    messagingSenderId: "561459502544",
    appId: "1:561459502544:web:ee7b7ad43320dca3612dd5",
    measurementId: "G-GYSGSP4YFH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };



export default firebaseConfig;
