import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { StateType } from "../types/user";

export default function Header() {
  const auth = getAuth();
  const loginUser = useSelector((state: StateType) => state.user.loginUser);

  const handleSignout = () => {
    signOut(auth);
  };

  return (
    <header className="bg-mygray sticky top-0 mb-16 text-myorange">
      <div className="flex justify-between w-[1200px] mx-auto py-4">
        <Link to="/" className="font-bold text-2xl">
          TOY FIVE
        </Link>
        <nav className="flex gap-4 items-center">
          {loginUser && <Link to="/mypage">Mypage</Link>}
          {loginUser && <Link to="/calender">Calender</Link>}
          {!loginUser && <Link to="/login">Login</Link>}
          {loginUser && <button onClick={handleSignout}>Logout</button>}
        </nav>
      </div>
    </header>
  );
}
