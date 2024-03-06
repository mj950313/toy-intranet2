import { useState } from "react";
import { login } from "../api/firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    error: "",
  });

  const navigate = useNavigate();

<<<<<<< HEAD
  useEffect(() => {
    const unsubscribe = listenToAuthChanges((user) => {
      setAuthUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
=======
  const handleLogin = async (e: React.FormEvent) => {
>>>>>>> develop
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

<<<<<<< HEAD
  const handleLogout = () => {
    try {
      logout();
      setFormState((prev) => ({ ...prev, error: "" }));
      alert("로그아웃 성공!");
    } catch (error) {
      alert("로그아웃 실패!");
    }
  };

=======
>>>>>>> develop
  return (
    <div className="flex justify-center items-center">
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
    </div>
  );
};

export default LoginPage;
