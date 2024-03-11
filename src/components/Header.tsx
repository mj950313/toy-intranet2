import { Form, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateType } from "../types/user";

export default function Header() {
  const isLogin = useSelector((state: StateType) => state.user.isLogin);

  return (
    <header className="bg-mygray sticky top-0 mb-16 text-myorange">
      <div className="flex justify-between w-[1200px] mx-auto py-4">
        <Link to="/" className="font-bold text-2xl">
          TOY FIVE
        </Link>
        <nav className="flex gap-4 items-center">
          {isLogin && <Link to="/mypage">Mypage</Link>}
          {isLogin && <Link to="/calendar">Calender</Link>}
          {!isLogin && <Link to="/login">Login</Link>}
          {isLogin && (
            <Form action="/logout" method="post">
              <button>Logout</button>
            </Form>
          )}
        </nav>
      </div>
    </header>
  );
}
