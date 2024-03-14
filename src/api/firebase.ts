import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DB_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
};
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const login = async (
  email: string,
  password: string,
  setIsLoading: (arg0: boolean) => void
) => {
  try {
    setIsLoading(true);
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    const accessToken = await user.getIdToken();
    localStorage.setItem("token", accessToken);
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};
