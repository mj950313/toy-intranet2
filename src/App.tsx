import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import CalenderPage from "./pages/CalenderPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsersData } from "./store/userActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Header />
        <div className="w-[1200px] mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/calender" element={<CalenderPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
