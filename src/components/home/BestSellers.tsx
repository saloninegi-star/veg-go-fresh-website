import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCT_CATALOG } from "../../data/products";
import ProductCard from "../shared/ProductCard";

interface BestSellersProps {
  category: string;
}

export default function BestSellers({
  category,
}: BestSellersProps) {
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
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4 shrink-0">
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

        <button
          className="
            shrink-0
            text-[9px]
            sm:text-[10px]
            md:text-[11px]
            font-bold
            text-[#228B22]
            flex
            items-center
            gap-0.5
            hover:underline
            whitespace-nowrap
          "
        >
          View All
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Products */}
      <div className="relative flex-1 min-h-0">

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
            h-full
            flex
            items-stretch
            gap-2
            sm:gap-2.5
            md:gap-3
            overflow-x-auto
            overflow-y-hidden
            scrollbar-hide
            scroll-smooth
            pb-1
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
                  sm:w-[140px]
                  md:w-[150px]
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
  );
}