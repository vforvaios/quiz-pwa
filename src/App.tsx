import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Game from "./components/Game";
import Results from "./components/Results";
import Categories from "./components/Categories";
import Home from "./components/Home";
import HomeLayout from "./layouts/HomeLayout";
import Loader from "./components/common/Loader";
import { useSelector } from "react-redux";
import { isLoading } from "./models/selectors/loaderSelectors";
import Login from "./components/Login";
import LeaderBoard from "./components/LeaderBoard";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ForgotPassword from "./components/ForgotPassword";

const App = () => {
  const loading = useSelector(isLoading);
  return (
    <HelmetProvider>
      <Loader show={loading} />
      <Router>
        <Routes>
          {/* 🔸 Public pages (Header/Footer) */}
          <Route element={<PublicLayout />}>
            <Route path="/categories" element={<Categories />} />
            <Route path="/game" element={<Game />} />
            <Route path="/results" element={<Results />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
