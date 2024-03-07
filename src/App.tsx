import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import CalendarPage from "./pages/CalendarPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData, sendUsersData } from "./store/userActions";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { replaceLoginUser } from "./store/userSlice";
import { StateType } from "./types/user";

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = useSelector((state: StateType) => state.user);
  const users = user.users;
  const loginUser = user.loginUser;
  const navigate = useNavigate();

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
        navigate("/login");
        dispatch(replaceLoginUser(null));
      }
    });

    return () => unsubscribe();
  }, [auth, users, dispatch, navigate]);

  return (
    <>
      <Header />
      <div className="w-[1200px] mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route
            path="/login"
            element={loginUser ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route path="/calender" element={<CalenderPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
