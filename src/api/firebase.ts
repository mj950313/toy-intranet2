import { initializeApp } from "firebase/app";
import {
  User,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DB_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// export const login = async (email: string, password: string) => {
//   await signInWithEmailAndPassword(auth, email, password);
// };

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
      {
        method: "POST",
        body: JSON.stringify({ email, password, returnSecureToken: true }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    if (data.error && data.error.message) {
      throw new Error(data.error.message);
    }

    await signInWithEmailAndPassword(auth, email, password);

    localStorage.setItem("token", data.idToken);
  } catch (error) {
    console.log(error);
  }
};

export const listenToAuthChanges = (callback: (arg0: User | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
