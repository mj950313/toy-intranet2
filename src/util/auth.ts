import { redirect } from "react-router";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }

  return null;
}

export function protectLoginPageLoader() {
  const token = getAuthToken();

  if (token) {
    return redirect("/");
  }

  return null;
}
