import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "../api/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateType } from "../types/user";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const users = useSelector((state: StateType) => state.user.users);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!users.some((user) => user.email === data.email)) {
      setError("email", {
        message: "존재하는 직원 이메일이 아닙니다.",
      });
    } else {
      try {
        await login(data.email, data.password);
        navigate("/");
      } catch (err) {
        setError("password", {
          message: "비밀번호를 잘못 입력했습니다.",
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="w-[400px] rounded-lg p-4 bg-white/10 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="email" className="text-white flex flex-col">
          이메일
          <input
            className="text-black"
            type="email"
            id="email"
            {...register("email", {
              required: "이메일을 입력하세요.",
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </label>
        <label htmlFor="password" className="text-white flex flex-col">
          비밀번호
          <input
            className="text-black"
            type="password"
            id="password"
            {...register("password", {
              required: "비밀번호를 입력하세요.",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자 이상이어야 합니다.",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </label>
        <button className="text-white" type="submit">
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
