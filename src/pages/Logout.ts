import { getAuth, signOut } from "@firebase/auth";
import { redirect } from "react-router";

export function logoutAction() {
  const auth = getAuth();
  signOut(auth);
  localStorage.removeItem("token");

  return redirect("/login");
}
