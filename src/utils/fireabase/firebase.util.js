import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4jMMRB1UQTG0m6AZPoCpnZwIHKKHLj9E",
  authDomain: "react-crwn-clothing-e1bfc.firebaseapp.com",
  projectId: "react-crwn-clothing-e1bfc",
  storageBucket: "react-crwn-clothing-e1bfc.firebasestorage.app",
  messagingSenderId: "901571855613",
  appId: "1:901571855613:web:5253deb21f83cbfd0f2a94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnap = await getDoc(userDocRef);

  if (!userSnap.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }
  return userDocRef;
};
