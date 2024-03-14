import { Outlet } from "react-router";
import Header from "../components/Header";
import ErrorNotification from "../components/ErrorNotification";
import { useSelector } from "react-redux";
import { StateType } from "../types/user";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

export default function RootLayout() {
  const fetchStatus = useSelector((state: StateType) => state.user.fetchStatus);
  const { pathname } = useLocation();

  return (
    <>
      {fetchStatus === "rejected" && <ErrorNotification />}
      <Header />
      <main className="w-[1200px] mx-auto py-16">
        <Outlet />
      </main>
      {(fetchStatus !== "pending" || pathname === "/login") && <Footer />}
    </>
  );
}
