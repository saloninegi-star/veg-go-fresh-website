import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { PRODUCT_CATALOG } from "../../data/products";
import ProductCard from "../shared/ProductCard";

interface BestSellersProps {
  category: string;
}

export default function BestSellers({ category }: BestSellersProps) {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products =
    category === "all"
      ? Object.values(PRODUCT_CATALOG)
      : Object.values(PRODUCT_CATALOG).filter(
          (product: any) =>
            product.category?.toLowerCase() === category.toLowerCase()
        );

  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const isAtStart = container.scrollLeft <= 1;
    const isAtEnd =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - 1;

    setCanScrollLeft(!isAtStart);
    setCanScrollRight(!isAtEnd);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      checkScroll();
    }, 100);

    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      clearTimeout(timer);
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [products.length, category]);

  // Modal open hone par background scroll lock karne ke liye
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -220,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 220,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Main Best Sellers Card */}
      <div
        className="
          relative
          w-full
          min-w-0
          h-full
          bg-white
          rounded-2xl
          border border-[#EEF4ED]
          p-3
          sm:p-3.5
          md:p-4
          flex
          flex-col
          shadow-sm
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3 shrink-0">
          <div className="text-left min-w-0">
            <h3
              className="
                text-sm
                sm:text-base
                font-bold
                text-slate-900
                leading-tight
                truncate
              "
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Best Selling Products
            </h3>

            <p className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 truncate">
              Most popular{" "}
              {category === "all"
                ? "products"
                : category.replace("-", " ")}{" "}
              today
            </p>
          </div>

          {/* View All Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="
              shrink-0
              text-[10px]
              sm:text-[11px]
              md:text-xs
              font-bold
              text-[#228B22]
              flex
              items-center
              gap-1
              hover:underline
              cursor-pointer
              whitespace-nowrap
              py-1
              px-1.5
            "
          >
            View All
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Products Horizontal Slider */}
        <div className="relative flex-1 flex items-center min-h-0">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="
                hidden
                sm:flex
                absolute
                left-0
                top-1/2
                -translate-y-1/2
                z-20
                w-7
                h-7
                md:w-8
                md:h-8
                rounded-full
                bg-white
                border
                border-[#EEF4ED]
                shadow-md
                items-center
                justify-center
                hover:bg-slate-50
              "
              aria-label="Scroll products left"
            >
              <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-600" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="
              w-full
              flex
              items-start
              gap-2
              sm:gap-2.5
              md:gap-3
              overflow-x-auto
              overflow-y-visible
              scrollbar-hide
              scroll-smooth
              pt-0.5
              pb-2
              px-0.5
            "
          >
            {products.length > 0 ? (
              products.map((product: any) => (
                <div
                  key={product.id}
                  className="
                    shrink-0
                    w-[125px]
                    sm:w-[135px]
                    md:w-[145px]
                  "
                >
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="w-full flex items-center justify-center py-6 text-xs text-slate-400">
                No products available in this category.
              </div>
            )}
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="
                hidden
                sm:flex
                absolute
                right-0
                top-1/2
                -translate-y-1/2
                z-20
                w-7
                h-7
                md:w-8
                md:h-8
                rounded-full
                bg-white
                border
                border-[#EEF4ED]
                shadow-md
                items-center
                justify-center
                hover:bg-slate-50
              "
              aria-label="Scroll products right"
            >
              <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-600" />
            </button>
          )}
        </div>
      </div>

      {/* View All Popup Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 md:p-6 animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="
              relative
              w-full
              max-w-4xl
              max-h-[88vh]
              bg-white
              rounded-2xl
              shadow-2xl
              flex
              flex-col
              overflow-hidden
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-100 shrink-0">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Best Selling Products
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Showing all {products.length} popular items
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content / All Products Grid */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-full">
              {products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {products.map((product: any) => (
                    <div key={product.id} className="w-full flex justify-center">
                      <div className="w-full max-w-[170px]">
                        <ProductCard product={product} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-sm text-slate-400">
                  No products found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}