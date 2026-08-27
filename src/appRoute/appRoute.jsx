import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import FruitsPage from "../pages/FruitsPage";
import LeafyGreensPage from "../pages/LeafyGreensPage";
import HerbsSeasoningPage from "../pages/HerbsSeasoningPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import AccountPage from "../pages/AccountPage";
import OffersPage from "../pages/OffersPage";
import MyOrdersPage from "../pages/MyOrdersPage"; // <-- 1. इम्पोर्ट सुनिश्चित करें

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/fruits" element={<FruitsPage />} />
        <Route path="/leafy-greens" element={<LeafyGreensPage />} />
        <Route path="/herbs-seasoning" element={<HerbsSeasoningPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/account" element={<AccountPage />} /> 
        <Route path="/offers" element={<OffersPage />} /> 
        
        {/* <-- 2. यह रूट होना आवश्यक है तभी पेज लोड होगा */}
        <Route path="/orders" element={<MyOrdersPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;