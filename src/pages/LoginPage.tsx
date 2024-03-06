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

  return (
    <div className="flex justify-center items-center">
      <form
        className="w-[400px] rounded-lg p-4 bg-white/10 flex flex-col gap-4"
        onSubmit={handleLogin}
      >
        <label htmlFor="email" className="text-white flex flex-col">
          EMAIL
          <input
            className="text-black"
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </label>
        <label htmlFor="password" className="text-white flex flex-col">
          PASSWORD
          <input
            className="text-black"
            type="password"
            id="password"
            name="password"
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
