import { Form, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateType } from "../types/user";

export default function Header() {
  const isLogin = useSelector((state: StateType) => state.user.isLogin);
  const { pathname } = useLocation();

  return (
    <header className="backdrop-blur-sm sticky top-0 z-20">
      <div className="flex justify-between w-[1200px] mx-auto py-4">
        <Link to="/" className="font-bold text-2xl">
          TOY FIVE
        </Link>
        <nav className="flex gap-4 items-center text-white">
          {isLogin && (
            <Link
              to="/mypage"
              className={`hover:text-white font-bold ${
                pathname === "/mypage" ? "text-white" : "text-myorange"
              }`}
            >
              Mypage
            </Link>
          )}
          {isLogin && (
            <Link
              to="/calendar"
              className={`hover:text-white font-bold ${
                pathname === "/calendar" ? "text-white" : "text-myorange"
              }`}
            >
              Calender
            </Link>
          )}
          {!isLogin && (
            <Link to="/login" className="text-myorange font-bold">
              Login
            </Link>
          )}
          {isLogin && (
            <Form action="/logout" method="post">
              <button className="text-myorange hover:text-white font-bold">
                Logout
              </button>
            </Form>
          )}
        </nav>
      </div>
    </header>
  );
}
