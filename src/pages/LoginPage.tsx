import { useEffect, useState } from "react";
import { login, logout, listenToAuthChanges } from "../api/firebase";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("null");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = listenToAuthChanges((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("로그인 성공!");
      navigate("/");
    } catch (err) {
      alert("로그인 실패!");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      alert("로그아웃 성공!");
    } catch (error) {
      alert("로그아웃 실패!");
    }
  };

  return (
    <div className="flex justify-center items-center">
      {user ? (
        <div className="text-white">
          <p>현재 로그인된 사용자: {user.email}</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <form
          className="w-[400px] rounded-lg p-4 bg-white/10 flex flex-col gap-4"
          onSubmit={handleLogin}
        >
          <label className="text-white flex flex-col">
            Email
            <input
              className="text-black"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="text-white flex flex-col">
            Password
            <input
              className="text-black"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="text-white" type="submit">
            LOGIN
          </button>
        </form>
      )}
    </div>
  );
}
