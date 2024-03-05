import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-mygray sticky top-0 mb-16 text-myorange">
      <div className="flex justify-between w-[1200px] mx-auto py-4">
        <Link to="/" className="font-bold text-2xl">
          TOY FIVE
        </Link>
        <nav className="flex gap-4">
          <Link to="/mypage">mypage</Link>
          <Link to="/calender">calender</Link>
          <Link to="/login">login</Link>
        </nav>
      </div>
    </header>
  );
}
