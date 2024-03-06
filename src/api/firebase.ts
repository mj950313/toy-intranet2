import { initializeApp } from "firebase/app";
import {
  User,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DB_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const login = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  signOut(auth);
};

export const listenToAuthChanges = (callback: (arg0: User | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};