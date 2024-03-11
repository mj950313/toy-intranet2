import { Outlet } from "react-router";
import Header from "../components/Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="w-[1200px] mx-auto py-16">
        <Outlet />
      </main>
    </>
  );
}
