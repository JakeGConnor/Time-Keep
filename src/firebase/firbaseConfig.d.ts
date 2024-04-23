// firebaseConfig.d.ts

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

declare module '../firebase/firebaseConfig' {
  const firestore: firebase.firestore.Firestore;
  const storage: firebase.storage.Storage;
  const auth: firebase.auth.Auth;

  export { firestore, storage, auth };
}