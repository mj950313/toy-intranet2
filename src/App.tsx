import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import CalenderPage from "./pages/CalenderPage";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/calender" element={<CalenderPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
