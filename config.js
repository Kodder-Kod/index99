import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"; // Use getAuth directly for web auth


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFn-n3pn6GSza-CPNyBAy-GWHSGCeDx_c",
  authDomain: "indicies-1b2ca.firebaseapp.com",
  databaseURL: "https://indicies-1b2ca-default-rtdb.firebaseio.com",
  projectId: "indicies-1b2ca",
  storageBucket: "indicies-1b2ca.firebasestorage.app",
  messagingSenderId: "916455311467",
  appId: "1:916455311467:web:05650d3e8642e0e5a6c92e",
  measurementId: "G-ZC9D0T1W4M"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase services using the modular SDK
const db = getDatabase(app);

// Initialize Firebase Auth with React Native persistence
const auth = getAuth(app);

export { db, auth };