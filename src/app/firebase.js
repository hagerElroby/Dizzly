// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7Zt3PRkDp6-1AgyNP1h-BIDWT8WzlV6E",
  authDomain: "auth-module-d898a.firebaseapp.com",
  projectId: "auth-module-d898a",
  storageBucket: "auth-module-d898a.appspot.com",
  messagingSenderId: "1076910845608",
  appId: "1:1076910845608:web:71f6e3683e168642af9c9d",
  measurementId: "G-7WK364SMFF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };