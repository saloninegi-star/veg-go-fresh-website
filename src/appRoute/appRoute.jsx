import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import FruitsPage from "../pages/FruitsPage";
import LeafyGreensPage from "../pages/LeafyGreensPage";
import HerbsSeasoningPage from "../pages/HerbsSeasoningPage";

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/fruits" element={<FruitsPage />} />
        <Route path="/leafy-greens" element={<LeafyGreensPage />} />
        <Route path="/herbs-seasoning" element={<HerbsSeasoningPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;