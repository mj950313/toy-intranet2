import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "../api/firebase";
import { useSelector } from "react-redux";
import { StateType } from "../types/user";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";

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
      await login(data.email, data.password, setIsLoading);
    } catch (err) {
      setError("password", {
        message: "비밀번호가 틀립니다.",
      });
    }
  };

  return (
    <div
      style={{ height: "calc(100vh - 350px)" }}
      className="flex justify-center items-center"
    >
      <form
        className="bg-white/30 w-[400px] rounded-lg p-4 backdrop-blur-sm flex flex-col items-center gap-4"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        autoComplete="off"
      >
        <h1 className="text-4xl font-bold m-6">TOY FIVE</h1>
        <div className="w-full flex flex-col font-bold relative">
          <label className="text-lg pb-2" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <input
              className="text-black/60 bg-white/30 rounded-md py-1.5 pl-1 w-full outline-none"
              type="email"
              id="email"
              {...register("email", {
                required: "이메일을 입력하세요.",
              })}
            />
            <BiUser
              className="absolute right-3 bottom-[-1px] text-myorange text-xl"
              style={{ transform: "translateY(-50%)" }}
            />
          </div>
          {errors.email && (
            <p className="text-myorange text-center p-1 my-2 bg-white/10 rounded-md">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="w-full flex flex-col font-bold relative">
          <label className="text-lg pb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              className="text-black/60 bg-white/30 rounded-md py-1.5 pl-1 w-full outline-none"
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
            <AiOutlineUnlock
              className="absolute right-3 bottom-[-1px] text-myorange text-xl"
              style={{ transform: "translateY(-50%)" }}
            />
          </div>
          {errors.password && (
            <p className="text-myorange text-center p-1 my-2 bg-white/10 rounded-md">
              {errors.password.message}
            </p>
          )}
        </div>

        {!isLoading && (
          <button className="text-white my-4 p-3 w-full text-[18px] rounded-full bg-myorange">
            Login
          </button>
        )}
        {isLoading && <BeatLoader className="mx-auto my-4" color="#f46804" />}
      </form>
    </div>
  );
};
export default LoginPage;
