import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, Star, Truck, RotateCcw, Heart, ChevronRight, Plus } from "lucide-react";
import { PRODUCT_CATALOG, getRelatedProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import QuantityStepper from "../components/shared/QuantityStepper";

const BRAND = { forestGreen: "#135029" };

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const product = productId ? PRODUCT_CATALOG[productId] : undefined;

  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    if (!product) return;
    setQty(1);
    setActiveImg(0);
    setWishlisted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 gap-3">
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
  const relatedProducts = getRelatedProducts(product);

  return (
    <main className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6 w-full">
      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-5">
        <button onClick={() => navigate("/")} className="hover:text-[#135029] transition">Home</button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="hover:text-[#135029] transition">{product.category}</span>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-[#135029] font-bold">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {/* Image + description */}
        <div className="space-y-6">
          <div className="border border-[#EEF4ED] rounded-2xl bg-white p-6 flex flex-col items-center justify-center relative min-h-[360px] shadow-2xs">
            <img
              src={product.gallery[activeImg] || product.img}
              alt={product.name}
              className="max-h-72 object-contain rounded-xl select-none"
              referrerPolicy="no-referrer"
            />
          </div>

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

          <div className="bg-white rounded-2xl border border-[#EEF4ED] p-5 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Product Details</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Purchase block */}
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">{product.name}</h1>
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

          <div className="flex items-center gap-3 pt-3">
            <QuantityStepper value={qty} onIncrease={() => setQty((q) => q + 1)} onDecrease={() => setQty((q) => Math.max(1, q - 1))} />
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
              navigate("/cart");
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

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#EEF4ED] bg-white p-5 space-y-4 shadow-2xs text-left">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Delivery Information</h3>
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

          <div className="rounded-2xl border border-[#EEF4ED] bg-white p-5 shadow-2xs text-left">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">More Like This</h3>
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
  );
}
