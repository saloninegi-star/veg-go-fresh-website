import { useNavigate } from "react-router-dom";
import type { ProductDetail } from "../../types/product";
import AddToCartControl from "./AddToCartControl";

interface ProductCardProps {
  product: ProductDetail;
  /** slightly taller image for grid pages (Fruits/Leafy/Herbs) vs. the compact home carousel row */
  imageHeightClassName?: string;
}

export default function ProductCard({
  product,
  imageHeightClassName = "h-28",
}: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="rounded-2xl p-3 flex flex-col justify-between bg-white hover:shadow-md transition-all duration-200 group border border-[#EEF4ED] cursor-pointer"
    >
      <div className={`${imageHeightClassName} w-full overflow-hidden rounded-xl bg-slate-50 mb-2.5`}>
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="text-left mb-3 px-0.5">
        <div className="text-sm font-extrabold text-slate-900 truncate">{product.name}</div>
        <div className="text-[11px] text-slate-400 font-medium mt-0.5">{product.weight}</div>
      </div>

      <div className="flex items-center justify-between gap-1 px-0.5">
        <div className="flex items-baseline gap-1 min-w-0">
          <span className="text-sm font-black text-slate-900 leading-none whitespace-nowrap">
            ₹{product.price.toFixed(2)}
          </span>
          <span className="text-[10px] text-slate-400 line-through leading-none whitespace-nowrap">
            ₹{product.mrp.toFixed(2)}
          </span>
        </div>
        <AddToCartControl productId={product.id} />
      </div>
    </div>
  );
}
