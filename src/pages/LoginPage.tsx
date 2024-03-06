import { useEffect, useState } from "react";
import { login, logout, listenToAuthChanges } from "../api/firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [authUser, setAuthUser] = useState(null);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    error: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = listenToAuthChanges((user) => {
      setAuthUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      login(formState.email, formState.password);
      navigate("/");
    } catch (err) {
      setFormState((prev) => ({
        ...prev,
        error: "아이디 또는 비밀번호를 잘못 입력했습니다.",
      }));
    }
  };

  const handleLogout = () => {
    try {
      logout();
      setFormState((prev) => ({ ...prev, error: "" }));
      alert("로그아웃 성공!");
    } catch (error) {
      alert("로그아웃 실패!");
    }
  };

  return (
    <div className="flex justify-center items-center">
      {authUser ? (
        <div className="text-white">
          <p>현재 로그인된 사용자: {authUser.email}</p>
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
              value={formState.email}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </label>
          <label className="text-white flex flex-col">
            Password
            <input
              className="text-black"
              type="password"
              value={formState.password}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </label>
          {formState.error && <p className="text-red-500">{formState.error}</p>}
          <button className="text-white" type="submit">
            LOGIN
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
