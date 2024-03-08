import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData, sendUsersData } from "./store/userActions";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { replaceLoginUser } from "./store/userSlice";
import { StateType } from "./types/user";
import CalendarPage from "./pages/CalendarPage";
import RootLayout from "./pages/RootLayout";

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = useSelector((state: StateType) => state.user);
  const users = user.users;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "mypage", element: <MyPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "calendar", element: <CalendarPage /> },
      ],
    },
  ]);

  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch]);

  useEffect(() => {
    if (user.changed) {
      dispatch(sendUsersData(users));
    }
  }, [user, dispatch, users]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const loginUser = users.find((u) => u.email === user.email);
        dispatch(replaceLoginUser(loginUser));
      } else {
        dispatch(replaceLoginUser(null));
      }
    });

    return () => unsubscribe();
  }, [auth, users, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
