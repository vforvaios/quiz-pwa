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
import ProtectedRoute from "./components/common/ProtectedRoute";
import UpdatePrompt from "./components/UpdatePrompt";
import { usePWAUpdate } from "./hooks/usePWAUpdate";
import { useEffect, useState } from "react";

const App = () => {
  const loading = useSelector(isLoading);
  const loggedUser = useSelector(userLoggedIn);
  const queryClient = new QueryClient();

  const { showReload, updateServiceWorker, isUpdating } = usePWAUpdate();
  const [localShowReload, setLocalShowReload] = useState(false);

  useEffect(() => {
    // Έλεγξε αν έχουμε ήδη δείξει το prompt σε αυτό το session
    const hasShownPrompt = sessionStorage.getItem("updatePromptShown");

    if (showReload && !hasShownPrompt) {
      setLocalShowReload(true);
      sessionStorage.setItem("updatePromptShown", "true");
    }
  }, [showReload]);

  const handleUpdate = () => {
    updateServiceWorker();
    setLocalShowReload(false);
    sessionStorage.removeItem("updatePromptShown");
  };

  const handleCancel = () => {
    setLocalShowReload(false);
    // Το prompt θα εμφανιστεί ξανά μόνο μετά από refresh ή σε νέα session
  };

  return (
    <HelmetProvider>
      <UpdatePrompt
        show={localShowReload}
        onUpdate={handleUpdate}
        onCancel={handleCancel}
        isUpdating={isUpdating}
      />
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

                <Route
                  path="/leaderboard"
                  element={
                    <ProtectedRoute isAllowed={loggedUser?.token}>
                      <LeaderBoard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isAllowed={loggedUser?.token}>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
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
                  <ProtectedRoute
                    isAllowed={loggedUser?.isAdmin && loggedUser?.token}
                  >
                    <DashboardLayout />
                  </ProtectedRoute>
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
