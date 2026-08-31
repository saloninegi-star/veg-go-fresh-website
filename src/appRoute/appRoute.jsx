import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import { CartProvider } from "../context/CartContext";
import { ToastProvider } from "../context/ToastContext";
import { UiProvider } from "../context/UiContext";
import Layout from "../components/layout/Layout";

// Route-level code splitting: each page's bundle is only fetched when the
// user actually navigates there, instead of all pages shipping in the
// initial Home bundle.
const HomePage = lazy(() => import("../pages/HomePage"));
const FruitsPage = lazy(() => import("../pages/FruitsPage"));
const LeafyGreensPage = lazy(() => import("../pages/LeafyGreensPage"));
const HerbsSeasoningPage = lazy(() => import("../pages/HerbsSeasoningPage"));
const ProductDetailPage = lazy(() => import("../pages/ProductDetailPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const AccountPage = lazy(() => import("../pages/AccountPage"));
const MyOrdersPage = lazy(() => import("../pages/MyOrdersPage"));
const OffersPage = lazy(() => import("../pages/OffersPage"));

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-sm text-slate-400">
      Loading…
    </div>
  );
}
=======
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
>>>>>>> e2c4767fb9fb72018b5e9e01b65713fd05fe3ca1

function AppRoute() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <CartProvider>
        <ToastProvider>
          <UiProvider>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/fruits" element={<FruitsPage />} />
                  <Route path="/leafy-greens" element={<LeafyGreensPage />} />
                  <Route path="/herbs-seasoning" element={<HerbsSeasoningPage />} />
                  <Route path="/product/:productId" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/orders" element={<MyOrdersPage />} />
                  <Route path="/offers" element={<OffersPage />} />
                </Route>
              </Routes>
            </Suspense>
          </UiProvider>
        </ToastProvider>
      </CartProvider>
=======
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
>>>>>>> e2c4767fb9fb72018b5e9e01b65713fd05fe3ca1
    </BrowserRouter>
  );
}

export default AppRoute;
