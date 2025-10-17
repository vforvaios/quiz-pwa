import { Home } from "./components/Home";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* 🔸 Public pages (Header/Footer) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* 🔸 Dashboard (χωρίς Header/Footer)
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAllowed={userToken}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="templates" element={<Templates />} />
            <Route path="profile" element={<Profile />} />
          </Route> */}
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
