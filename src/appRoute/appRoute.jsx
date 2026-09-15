import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// ================= COMPANY PAGES (Lazy Loaded) =================
const AboutPage = lazy(() => import("../pages/company/AboutPage"));
const FarmerPartnerPage = lazy(() => import("../pages/company/FarmerPartnerPage"));
const DeliveryPartnerPage = lazy(() => import("../pages/company/DeliveryPartnerPage"));
const MembershipPage = lazy(() => import("../pages/company/MembershipPage"));
const QualityLabPage = lazy(() => import("../pages/company/QualityLabPage"));
const CareersPage = lazy(() => import("../pages/company/CareersPage"));

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-sm text-slate-400">
      Loading…
    </div>
  );
}

function AppRoute() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ToastProvider>
          <UiProvider>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route element={<Layout />}>
                  {/* Existing Main Routes */}
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

                  {/* Company Routes */}
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/partner-with-us" element={<FarmerPartnerPage />} />
                  <Route path="/delivery-partner" element={<DeliveryPartnerPage />} />
                  <Route path="/veggo-plus" element={<MembershipPage />} />
                  <Route path="/quality-assurance" element={<QualityLabPage />} />
                  <Route path="/careers" element={<CareersPage />} />
                </Route>
              </Routes>
            </Suspense>
          </UiProvider>
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default AppRoute;