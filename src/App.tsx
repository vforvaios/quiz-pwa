import Home from "./components/Home";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Game from "./components/Game";
import Results from "./components/Results";

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* 🔸 Public pages (Header/Footer) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/results" element={<Results />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
