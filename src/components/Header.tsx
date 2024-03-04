import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <Link to="/">home</Link>
      <Link to="/mypage">mypage</Link>
      <Link to="/login">login</Link>
      <Link to="/calender">calender</Link>
    </nav>
  );
}
