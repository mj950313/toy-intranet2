import { initializeApp } from "firebase/app";
import {
  User,
  browserSessionPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DB_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// export const login = async (email: string, password: string) => {
//   await signInWithEmailAndPassword(auth, email, password);
// };

export const login = async (email: string, password: string) => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    const result = await signInWithEmailAndPassword(auth, email, password);

    localStorage.setItem("token", result.user.accessToken);
  } catch (error) {
    throw error;
  }
};

export const listenToAuthChanges = (callback: (arg0: User | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
