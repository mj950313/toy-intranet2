import { Outlet } from "react-router";
import Header from "../components/Header";
import ErrorNotification from "../components/ErrorNotification";
import { useSelector } from "react-redux";
import { UiStateType } from "../types/ui";

export default function RootLayout() {
  const fetchError = useSelector((state: UiStateType) => state.ui.fetchStatus);

  return (
    <>
      {fetchError && <ErrorNotification fetchError={fetchError} />}
      <Header />
      <main className="w-[1200px] mx-auto py-16">
        <Outlet />
      </main>
    </>
  );
}
