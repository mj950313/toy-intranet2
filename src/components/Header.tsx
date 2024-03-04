import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-[#1c1c1c] sticky top-0 text-white">
      <div className="flex justify-between w-[1200px] mx-auto py-1">
        <Link to="/">home</Link>
        <nav>
          <Link to="/mypage">mypage</Link>
          <Link to="/login">login</Link>
          <Link to="/calender">calender</Link>
        </nav>
      </div>
    </header>
  );
}
