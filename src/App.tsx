import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import FooterPage from "./pages/FooterPage";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchUsersData, replaceLoginUser } from "./store/userSlice";
import { StateType } from "./types/user";
import CalendarPage from "./pages/CalendarPage";
import RootLayout from "./pages/RootLayout";
import { checkAuthLoader, protectLoginPageLoader } from "./util/auth";
import { logoutAction } from "./pages/Logout";
import NotFoundPage from "./pages/NotFoundPage";
import { useAppDispatch } from "./store/store";

function App() {
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const user = useSelector((state: StateType) => state.user);
  const users = user.users;

  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가(setIsLoading)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage />, loader: checkAuthLoader },
        { path: "mypage", element: <MyPage />, loader: checkAuthLoader },
        {
          path: "login",
          element: <LoginPage />,
          loader: protectLoginPageLoader,
        },
        {
          path: "calendar",
          element: <CalendarPage />,
          loader: checkAuthLoader,
        },
        {
          path: "logout",
          action: logoutAction,
        },
        {
          path: "*",
          element: <NotFoundPage />,
          loader: checkAuthLoader,
        },
      ],
    },
  ]);

  useEffect(() => {
    dispatch(fetchUsersData()).then(() => setIsLoading(false)); // 데이터 가져오기 완료 후 로딩 상태 변경
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const loginUser = users.find((u) => u.email === user.email);
        dispatch(replaceLoginUser({ loginUser, isLogin: true }));
      } else {
        dispatch(replaceLoginUser({ loginUser: null, isLogin: false }));
      }
    });

    return () => unsubscribe();
  }, [auth, users, dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      {!isLoading && <FooterPage />} {/* 로딩 중이 아닐 때만 푸터를 보여줌 */}
    </>
  );
}

export default App;
