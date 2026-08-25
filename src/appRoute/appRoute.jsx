import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import FruitsPage from "../pages/FruitsPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/fruits" element={<FruitsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
