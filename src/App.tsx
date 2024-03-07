import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import CalendarPage from "./pages/CalendarPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData } from "./store/userActions";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { replaceLoginUser } from "./store/userSlice";
import { StateType } from "./types/user";

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const users = useSelector((state: StateType) => state.user.users);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch]);

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/calender" element={<CalendarPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
