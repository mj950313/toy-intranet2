import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import {
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
const database = getDatabase(app);

export const login = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  signOut(auth);
};

export const listenToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
    user && usersData();
  });
};

async function usersData() {
  return get(ref(database, "users")).then((snapshot) => {
    if (snapshot.exists()) {
      const users = snapshot.val();
    }
  });
}
