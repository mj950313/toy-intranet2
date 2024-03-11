import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "../api/firebase";
import { useSelector } from "react-redux";
import { StateType } from "../types/user";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

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

  const users = useSelector((state: StateType) => state.user.users);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const user = users.find((user) => user.email === data.email);
    if (!user) {
      return setError("email", {
        message: "등록되지 않은 이메일 주소입니다.",
      });
    }
    try {
      login(data.email, data.password, setIsLoading);
    } catch (err) {
      setError("password", {
        message: "비밀번호가 틀립니다.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="w-[400px] rounded-lg p-4 bg-white/10 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
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
        {!isLoading && <button className="text-white">로그인</button>}
        {isLoading && <BeatLoader className="mx-auto" color="white" />}
      </form>
    </div>
  );
};
export default LoginPage;
