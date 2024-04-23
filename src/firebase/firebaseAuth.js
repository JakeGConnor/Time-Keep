import { auth } from './firebaseConfig';

// Sign in with Google
export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const userCredential = await auth.signInWithPopup(provider);
    return userCredential;
  } catch (error) {
    throw error;
  }
};
