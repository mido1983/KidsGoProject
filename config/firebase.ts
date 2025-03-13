import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIwNmYYEJvtWVBdBIbfSEGDQOIYWNxGxM",
  authDomain: "kidsgo-app.firebaseapp.com",
  projectId: "kidsgo-app",
  storageBucket: "kidsgo-app.appspot.com",
  messagingSenderId: "812631424731",
  appId: "1:812631424731:web:5f9f9f9f9f9f9f9f9f9f9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

export const db = getFirestore(app);
