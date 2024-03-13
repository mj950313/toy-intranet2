import { Outlet } from "react-router";
import Header from "../components/Header";
import ErrorNotification from "../components/ErrorNotification";
import { useSelector } from "react-redux";
import { StateType } from "../types/user";
import Footer from "../components/Footer";

export default function RootLayout() {
  const fetchStatus = useSelector((state: StateType) => state.user.fetchStatus);

  return (
    <>
      {fetchStatus === "rejected" && <ErrorNotification />}
      <Header />
      <main className="w-[1200px] mx-auto py-16">
        <Outlet />
      </main>
      {fetchStatus !== "pending" && <Footer />}
    </>
  );
}
