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
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./components/common/ErrorBoundary";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./components/admin/Dashboard";
import { userLoggedIn } from "./models/selectors/loginSelectors";
import Questions from "./components/admin/questions/Questions";
import ProtectedAdminRoute from "./components/common/ProtectedAdminRoute";

const App = () => {
  const loading = useSelector(isLoading);
  const loggedUser = useSelector(userLoggedIn);
  const queryClient = new QueryClient();

  return (
    <HelmetProvider>
      <SnackbarProvider />
      <QueryClientProvider client={queryClient}>
        <Loader show={loading} />
        <Router>
          <ErrorBoundary>
            <Routes>
              {/* 🔸 Public pages (Header/Footer) */}
              <Route element={<PublicLayout user={loggedUser} />}>
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

              <Route
                path="/dashboard"
                element={
                  <ProtectedAdminRoute
                    isAllowed={loggedUser?.isAdmin && loggedUser?.token}
                  >
                    <DashboardLayout />
                  </ProtectedAdminRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="questions" element={<Questions />} />
              </Route>
            </Routes>
          </ErrorBoundary>
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
