// firebaseConfig.js

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAnRCTxK1wLmjyBbUZxJm-yWNGimGHo6xk",
    authDomain: "timekeeper-1b35e.firebaseapp.com",
    projectId: "timekeeper-1b35e",
    storageBucket: "timekeeper-1b35e.appspot.com",
    messagingSenderId: "561459502544",
    appId: "1:561459502544:web:ee7b7ad43320dca3612dd5",
    measurementId: "G-GYSGSP4YFH"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { firestore, storage, auth };