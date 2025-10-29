import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Game from "./components/Game";
import Results from "./components/Results";
import Categories from "./components/Categories";
import Home from "./components/Home";
import HomeLayout from "./layouts/HomeLayout";

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* 🔸 Public pages (Header/Footer) */}
          <Route element={<PublicLayout />}>
            <Route path="/categories" element={<Categories />} />
            <Route path="/game" element={<Game />} />
            <Route path="/results" element={<Results />} />
          </Route>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
