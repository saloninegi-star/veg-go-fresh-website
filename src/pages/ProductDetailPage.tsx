import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  X,
  Leaf,
  Bot,
  Plus,
  Minus,
  Check,
  Star,
  Truck,
  RotateCcw,
  Heart,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";

// Reusable Navbar और VegGoLogo को इम्पोर्ट करें
import Navbar, { VegGoLogo } from "../components/Navbar";

/* ---------------------------------------------------------------------- */
/*  Brand palette tokens                                                  */
/* ---------------------------------------------------------------------- */
const BRAND = {
  forestGreen: "#135029",
  leafGreen: "#228B22",
  lightMintBg: "#EAF5E9",
  textDark: "#111827",
  textMuted: "#5F6D63",
  borderLight: "#EEF4ED",
};

/* ---------------------------------------------------------------------- */
/*  COMPLETE PRODUCT CATALOG                                              */
/* ---------------------------------------------------------------------- */
export interface ProductDetail {
  id: string;
  name: string;
  category: string;
  weight: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  img: string;
  gallery: string[];
  description: string;
  highlights: string[];
}

export const PRODUCT_CATALOG: Record<string, ProductDetail> = {
  tomato: {
    id: "tomato",
    name: "Fresh Tomato",
    category: "Vegetables",
    weight: "1 kg",
    price: 25.0,
    mrp: 35.0,
    rating: 4.7,
    reviews: 128,
    img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524593689594-aae2f26b75ab?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Juicy and naturally ripened tomatoes, perfect for cooking salads, gravies, soups and more.",
    highlights: ["Rich in Vitamins", "Farm Fresh", "No Preservatives", "Hygienically Packed"],
  },
  onion: {
    id: "onion",
    name: "Fresh Onion",
    category: "Vegetables",
    weight: "1 kg",
    price: 28.0,
    mrp: 40.0,
    rating: 4.5,
    reviews: 96,
    img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80"],
    description: "Farm-fresh onions with a strong flavour, essential for everyday Indian cooking.",
    highlights: ["Long Shelf Life", "Farm Fresh", "No Preservatives", "Hand Sorted"],
  },
  potato: {
    id: "potato",
    name: "Fresh Potato",
    category: "Vegetables",
    weight: "1 kg",
    price: 22.0,
    mrp: 30.0,
    rating: 4.6,
    reviews: 154,
    img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80"],
    description: "Farm-fresh potatoes, versatile for curries, fries and everyday meals.",
    highlights: ["Rich in Carbs", "Farm Fresh", "No Preservatives", "Hygienically Packed"],
  },
  capsicum: {
    id: "capsicum",
    name: "Capsicum",
    category: "Vegetables",
    weight: "250 g",
    price: 25.0,
    mrp: 35.0,
    rating: 4.5,
    reviews: 74,
    img: "https://images.unsplash.com/photo-1563565080-8a4115b37f34?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1563565080-8a4115b37f34?auto=format&fit=crop&w=800&q=80"],
    description: "Crisp and fresh green bell peppers (capsicum), essential for curries, stir-fries, and Chinese dishes.",
    highlights: ["Rich in Vitamin C", "Farm Fresh", "No Preservatives", "Crunchy Texture"],
  },
  banana: {
    id: "banana",
    name: "Fresh Banana",
    category: "Fruits",
    weight: "1 dozen",
    price: 40.0,
    mrp: 60.0,
    rating: 4.8,
    reviews: 210,
    img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Naturally ripened bananas, sweet and packed with instant energy and potassium.",
    highlights: ["Rich in Potassium", "Naturally Ripened", "No Preservatives", "Hygienically Packed"],
  },
  apple: {
    id: "apple",
    name: "Fresh Apple",
    category: "Fruits",
    weight: "4 pcs",
    price: 120.0,
    mrp: 160.0,
    rating: 4.7,
    reviews: 183,
    img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576179635662-9d1983e97e1e?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Crisp, sweet, and highly nutritious apples sourced directly from Himachal orchards.",
    highlights: ["Rich in Fibre", "Farm Fresh", "No Preservatives", "Hygienically Packed"],
  },
  strawberry: {
    id: "strawberry",
    name: "Fresh Strawberries",
    category: "Fruits",
    weight: "250 g",
    price: 90.0,
    mrp: 120.0,
    rating: 4.6,
    reviews: 72,
    img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80"],
    description: "Sweet, juicy strawberries handpicked at peak ripeness.",
    highlights: ["Rich in Vitamin C", "Farm Fresh", "No Preservatives", "Hygienically Packed"],
  },
  dragonfruit: {
    id: "dragonfruit",
    name: "Dragon Fruit",
    category: "Fruits",
    weight: "2 pcs",
    price: 140.0,
    mrp: 180.0,
    rating: 4.5,
    reviews: 34,
    img: "https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&w=800&q=80"],
    description: "Exotic dragon fruit, mildly sweet and packed with antioxidants.",
    highlights: ["Rich in Antioxidants", "Exotic Pick", "No Preservatives", "Hygienically Packed"],
  },
  kiwi: {
    id: "kiwi",
    name: "Fresh Kiwi",
    category: "Fruits",
    weight: "4 pcs",
    price: 110.0,
    mrp: 150.0,
    rating: 4.6,
    reviews: 48,
    img: "https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=800&q=80"],
    description: "Tangy-sweet kiwis, a great source of Vitamin C.",
    highlights: ["Rich in Vitamin C", "Farm Fresh", "No Preservatives", "Hygienically Packed"],
  },
  orange: {
    id: "orange",
    name: "Fresh Oranges",
    category: "Fruits",
    weight: "1 kg",
    price: 80.0,
    mrp: 110.0,
    rating: 4.5,
    reviews: 65,
    img: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=800&q=80"],
    description: "Juicy, tangy oranges, perfect for fresh juice or snacking.",
    highlights: ["Rich in Vitamin C", "Farm Fresh", "No Preservatives", "Hygienically Packed"],
  },
  spinach: {
    id: "spinach",
    name: "Fresh Spinach",
    category: "Leafy Greens",
    weight: "250 g",
    price: 30.0,
    mrp: 40.0,
    rating: 4.6,
    reviews: 87,
    img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80"],
    description: "Tender, iron-rich spinach leaves, freshly harvested every morning.",
    highlights: ["Rich in Iron", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },
  coriander: {
    id: "coriander",
    name: "Fresh Coriander",
    category: "Leafy Greens",
    weight: "100 g",
    price: 20.0,
    mrp: 30.0,
    rating: 4.5,
    reviews: 64,
    img: "https://images.unsplash.com/photo-1588879460618-9244e6d2e6f1?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1588879460618-9244e6d2e6f1?auto=format&fit=crop&w=800&q=80"],
    description: "Aromatic fresh coriander leaves, perfect for garnish and chutneys.",
    highlights: ["Freshly Cut", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },
  mint: {
    id: "mint",
    name: "Fresh Mint",
    category: "Leafy Greens",
    weight: "100 g",
    price: 25.0,
    mrp: 35.0,
    rating: 4.6,
    reviews: 58,
    img: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1628557044797-f21a177c37ec?auto=format&fit=crop&w=800&q=80"],
    description: "Fragrant mint leaves, great for chutneys, teas and cooling drinks.",
    highlights: ["Aromatic", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },
  methi: {
    id: "methi",
    name: "Methi Leaves",
    category: "Leafy Greens",
    weight: "250 g",
    price: 35.0,
    mrp: 45.0,
    rating: 4.4,
    reviews: 41,
    img: "https://images.unsplash.com/photo-1628773822503-930a7eaecf80?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1628773822503-930a7eaecf80?auto=format&fit=crop&w=800&q=80"],
    description: "Fresh, slightly bitter methi leaves, packed with nutrition.",
    highlights: ["Rich in Nutrients", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },
  amaranth: {
    id: "amaranth",
    name: "Amaranth Leaves",
    category: "Leafy Greens",
    weight: "250 g",
    price: 40.0,
    mrp: 55.0,
    rating: 4.5,
    reviews: 37,
    img: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=800&q=80"],
    description: "Nutritious amaranth greens, a household favourite for sabzi.",
    highlights: ["Rich in Iron", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },
  kale: {
    id: "kale",
    name: "Kale Leaves",
    category: "Leafy Greens",
    weight: "200 g",
    price: 70.0,
    mrp: 90.0,
    rating: 4.6,
    reviews: 29,
    img: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=800&q=80"],
    description: "Superfood kale, packed with antioxidants and perfect for salads and smoothies.",
    highlights: ["Superfood", "Farm Fresh", "No Chemicals", "Hygienically Packed"],
  },
};

const ALL_PRODUCTS_LIST = Object.values(PRODUCT_CATALOG);

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const product = productId ? PRODUCT_CATALOG[productId] : undefined;

  const [cart, setCart] = useState<Record<string, number>>(
    product ? { [product.id]: 1 } : {}
  );
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const fontHead = { fontFamily: "'Poppins', sans-serif" };
  const fontBody = { fontFamily: "'Inter', sans-serif" };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2200);
  };

  useEffect(() => {
    if (!product) return;
    setQty(1);
    setActiveImg(0);
    setWishlisted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product?.id]);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, q]) => {
    const p = PRODUCT_CATALOG[id];
    return sum + (p ? p.price * q : 0);
  }, 0);

  const addToCart = (id: string, amount = 1) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + amount }));
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FBFDFB] text-center px-4 gap-3">
        <h1 className="text-lg font-bold text-slate-900">Product not found</h1>
        <p className="text-xs text-slate-500 max-w-xs">
          We couldn't find "{productId}" in our catalog. It may have been removed or the link is incorrect.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-2 px-5 py-2.5 rounded-lg text-white text-xs font-bold"
          style={{ backgroundColor: BRAND.forestGreen }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const discountPct = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  let relatedProducts = ALL_PRODUCTS_LIST.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  if (relatedProducts.length < 3) {
    const backupItems = ALL_PRODUCTS_LIST.filter(
      (p) => p.id !== product.id && p.category !== product.category
    ).slice(0, 3 - relatedProducts.length);
    relatedProducts = [...relatedProducts, ...backupItems];
  }

  return (
    <div className="min-h-screen bg-[#FBFDFB] text-slate-800 flex flex-col" style={fontBody}>
      
      {/* ================= REUSABLE NAVBAR ================= */}
      <Navbar
        setMobileNav={setMobileNav}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setAiModalOpen={setAiModalOpen}
        setCartOpen={setCartOpen}
        cartCount={cartCount}
        cartTotal={cartTotal}
        showToast={showToast}
      />

      {/* ================= TOAST ================= */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#135029] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-emerald-400/30 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6 flex-1 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-5">
          <button onClick={() => navigate("/")} className="hover:text-[#135029] transition">Home</button>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="hover:text-[#135029] transition">{product.category}</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-[#135029] font-bold">{product.name}</span>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          
          {/* COLUMN 1: Image & Product Details */}
          <div className="space-y-6">
            <div className="border border-[#EEF4ED] rounded-2xl bg-white p-6 flex flex-col items-center justify-center relative min-h-[360px] shadow-2xs">
              <img
                src={product.gallery[activeImg] || product.img}
                alt={product.name}
                className="max-h-72 object-contain rounded-xl select-none"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Gallery Thumbnails */}
            {product.gallery.length > 1 && (
              <div className="flex items-center justify-center gap-2.5">
                {product.gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                      activeImg === i ? "border-[#135029]" : "border-[#EEF4ED] hover:border-[#C2DEC1]"
                    }`}
                  >
                    <img src={src} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Product Details Block */}
            <div className="bg-white rounded-2xl border border-[#EEF4ED] p-5 shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900 mb-2" style={fontHead}>Product Details</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{product.description}</p>
            </div>
          </div>

          {/* COLUMN 2: Purchase & Info Block */}
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827]" style={fontHead}>
                {product.name}
              </h1>
              <div className="text-xs text-slate-500 font-medium mt-1">{product.weight}</div>
              
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-bold text-[#135029] flex items-center gap-0.5">
                  <Star className="w-3.5 h-3.5 fill-[#135029] text-[#135029]" />
                  <span>{product.rating}</span>
                </span>
                <span className="text-[11px] text-slate-400">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-black text-slate-900">₹{product.price.toFixed(2)}</span>
              <span className="text-sm text-slate-400 line-through">₹{product.mrp.toFixed(2)}</span>
              <span className="text-xs font-bold text-[#228B22]">{discountPct}% OFF</span>
            </div>

            <div className="inline-block bg-[#EAF6EA] text-[#135029] text-[11px] font-semibold px-2.5 py-1 rounded-md text-left">
              Handpicked fresh {product.name.toLowerCase()} from local farms.
            </div>

            {/* Highlights */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              {product.highlights.map((h) => (
                <div key={h} className="flex items-center gap-2 text-xs font-medium text-[#1E5F26]">
                  <span className="w-4 h-4 rounded-full bg-[#EAF6EA] text-[#135029] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
                  </span>
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Qty & Add to Cart */}
            <div className="flex items-center gap-3 pt-3">
              <div className="flex items-center gap-3.5 bg-white border border-[#DCEAD9] rounded-lg px-3.5 py-2.5 shadow-2xs">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="hover:opacity-75">
                  <Minus className="w-3.5 h-3.5 text-[#135029]" strokeWidth={3} />
                </button>
                <span className="text-xs font-bold w-4 text-center text-slate-900">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="hover:opacity-75">
                  <Plus className="w-3.5 h-3.5 text-[#135029]" strokeWidth={3} />
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart(product.id, qty);
                  showToast(`Added ${qty} × ${product.name} to cart`);
                }}
                className="flex-1 py-3 rounded-lg text-white text-xs sm:text-sm font-bold tracking-wide shadow-xs transition hover:brightness-105"
                style={{ backgroundColor: BRAND.forestGreen }}
              >
                Add to Cart
              </button>
            </div>

            <button
              onClick={() => {
                addToCart(product.id, qty);
                setCartOpen(true);
              }}
              className="w-full py-3 rounded-lg bg-white border-2 border-[#135029] text-[#135029] text-xs sm:text-sm font-bold tracking-wide transition hover:bg-[#F4FAF4]"
            >
              Buy Now
            </button>

            <button
              onClick={() => {
                setWishlisted((w) => !w);
                showToast(wishlisted ? "Removed from wishlist" : "Added to wishlist");
              }}
              className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#E03838] transition mx-auto"
            >
              <Heart className={`w-4 h-4 ${wishlisted ? "fill-[#E03838] text-[#E03838]" : ""}`} />
              <span>{wishlisted ? "Added to Wishlist" : "Add to Wishlist"}</span>
            </button>
          </div>

          {/* COLUMN 3: Sidebar (Delivery Info & Dynamic Suggestions) */}
          <div className="space-y-6">
            
            {/* Delivery Information Card */}
            <div className="rounded-2xl border border-[#EEF4ED] bg-white p-5 space-y-4 shadow-2xs text-left">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider" style={fontHead}>Delivery Information</h3>
              <div className="text-xs text-emerald-800 bg-[#EAF6EA] px-3 py-2 rounded-lg font-bold inline-block w-full">
                FREE DELIVERY on orders above ₹299
              </div>
              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-[#228B22] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <div className="text-slate-400 font-medium">Estimated Delivery</div>
                    <div className="font-bold text-slate-800">Today, 6 PM – 8 PM</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <RotateCcw className="w-4 h-4 text-[#228B22] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <div className="text-slate-400 font-medium">Return Policy</div>
                    <div className="font-bold text-slate-800">Easy returns within 24 hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Suggestions (More Like This) */}
            <div className="rounded-2xl border border-[#EEF4ED] bg-white p-5 shadow-2xs text-left">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4" style={fontHead}>More Like This</h3>
              <div className="space-y-3.5">
                {relatedProducts.map((rp) => (
                  <div
                    key={rp.id}
                    onClick={() => navigate(`/product/${rp.id}`)}
                    className="flex items-center gap-3 p-1 rounded-xl hover:bg-[#F4FAF4] cursor-pointer transition"
                  >
                    <img src={rp.img} alt={rp.name} className="w-12 h-12 rounded-lg object-cover bg-slate-50 border border-slate-100" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">{rp.name}</div>
                      <div className="text-[10px] text-slate-400">{rp.weight}</div>
                      <div className="text-xs font-bold text-slate-900 mt-0.5">₹{rp.price.toFixed(2)}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(rp.id, 1);
                        showToast(`Added ${rp.name} to cart`);
                      }}
                      className="w-7 h-7 rounded-full bg-[#135029] text-white flex items-center justify-center hover:bg-[#1E7D32] transition shrink-0"
                    >
                      <Plus className="w-4 h-4" strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* ================= CART DRAWER ================= */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in relative z-50">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#F4FAF4]">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#135029]" />
                <h3 className="font-bold text-base text-slate-900" style={fontHead}>My Cart ({cartCount} items)</h3>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-1 rounded-lg hover:bg-slate-200 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cartCount === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
                  <ShoppingCart className="w-12 h-12 mb-3 text-slate-300" />
                  <p className="text-sm font-semibold text-slate-700">Your basket is empty</p>
                </div>
              ) : (
                Object.entries(cart).map(([id, q]) => {
                  const p = PRODUCT_CATALOG[id];
                  if (!p) return null;
                  return (
                    <div key={id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                      <img src={p.img} alt={p.name} className="w-14 h-14 rounded-lg object-cover bg-white" />
                      <div className="flex-1 min-w-0 text-left">
                        <div className="text-xs font-bold text-slate-900 truncate">{p.name}</div>
                        <div className="text-[10px] text-slate-500">{p.weight}</div>
                        <div className="text-xs font-bold text-[#135029] mt-0.5">₹{p.price.toFixed(2)}</div>
                      </div>
                      <div className="flex items-center gap-2 bg-[#135029] rounded-lg p-1 text-white">
                        <button
                          onClick={() =>
                            setCart((prev) => {
                              const next = { ...prev };
                              if (next[id] > 1) next[id] -= 1;
                              else delete next[id];
                              return next;
                            })
                          }
                          className="w-5 h-5 flex items-center justify-center hover:opacity-80"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-3 text-center">{q}</span>
                        <button onClick={() => addToCart(id, 1)} className="w-5 h-5 flex items-center justify-center hover:opacity-80">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {cartCount > 0 && (
              <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
                <div className="flex justify-between text-slate-900 font-bold text-sm">
                  <span>Total Amount</span>
                  <span className="text-[#135029]">₹{cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => {
                    showToast("🎉 Order placed! Fast delivery dispatched.");
                    setCart({});
                    setCartOpen(false);
                  }}
                  className="w-full py-3 rounded-lg text-white font-bold text-xs tracking-wide shadow-md transition hover:brightness-110"
                  style={{ backgroundColor: BRAND.forestGreen }}
                >
                  Proceed to Checkout (₹{cartTotal.toFixed(2)})
                </button>
              </div>
            )}
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-xs fixed inset-0 z-40" onClick={() => setCartOpen(false)} />
        </div>
      )}

      {/* ================= AI MODAL ================= */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#D5EAD3] overflow-hidden flex flex-col z-50">
            <div className="p-4 bg-[#135029] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-300" />
                <h3 className="text-sm font-bold">VegGo Smart Assistant</h3>
              </div>
              <button onClick={() => setAiModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3 text-left text-xs bg-[#F4FAF4]">
              <div className="p-3 bg-white rounded-xl border border-[#D5EAD3] text-slate-700 shadow-2xs">
                👋 Hello Shiva! Want a recipe idea using {product.name.toLowerCase()}?
              </div>
            </div>
          </div>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setAiModalOpen(false)} />
        </div>
      )}

      {/* ================= MOBILE NAV ================= */}
      {mobileNav && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-72 bg-white h-full shadow-2xl p-5 overflow-y-auto flex flex-col text-left relative z-50">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <VegGoLogo className="h-9 w-auto" />
              <button onClick={() => setMobileNav(false)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <button onClick={() => { setMobileNav(false); navigate("/"); }} className="text-xs font-bold text-[#135029] text-left py-2">
              Back to Home
            </button>
          </div>
          <div className="flex-1 bg-black/40 fixed inset-0 z-40" onClick={() => setMobileNav(false)} />
        </div>
      )}

      <style>
        {`
          @keyframes slideIn { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          .animate-slide-in { animation: slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .animate-fade-in { animation: fadeIn 0.25s ease-out forwards; }
        `}
      </style>
    </div>
  );
}