import { Plus, Minus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { PRODUCT_CATALOG } from "../../data/products";

interface AddToCartControlProps {
  productId: string;
  /** stops the surrounding card's onClick (navigation) from firing */
  stopPropagation?: boolean;
}

export default function AddToCartControl({
  productId,
  stopPropagation = true,
}: AddToCartControlProps) {
  const { cart, addToCart, removeFromCart } = useCart();
  const { showToast } = useToast();
  const qty = cart[productId] || 0;
  const product = PRODUCT_CATALOG[productId];

  const guard = (fn: () => void) => (e: React.MouseEvent) => {
    if (stopPropagation) e.stopPropagation();
    fn();
  };

  const handleAdd = () => {
    addToCart(productId);
    showToast(`Added ${product?.name ?? "item"} to cart`);
  };

  if (qty === 0) {
    return (
      <button
        onClick={guard(handleAdd)}
        className="w-7 h-7 rounded-lg bg-[#135029] text-white flex items-center justify-center hover:bg-[#1E7D32] transition active:scale-95 shadow-md"
        aria-label={`Add ${product?.name ?? "item"}`}
      >
        <Plus className="w-4 h-4 text-white stroke-[3px]" />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1.5 bg-[#135029] text-white rounded-lg px-2 py-1 shadow-md h-7">
      <button
        onClick={guard(() => removeFromCart(productId))}
        className="w-3.5 h-3.5 flex items-center justify-center hover:opacity-80 active:scale-90"
      >
        <Minus className="w-2.5 h-2.5 text-white stroke-[3px]" />
      </button>
      <span className="text-xs font-bold w-3 text-center leading-none">{qty}</span>
      <button
        onClick={guard(handleAdd)}
        className="w-3.5 h-3.5 flex items-center justify-center hover:opacity-80 active:scale-90"
      >
        <Plus className="w-2.5 h-2.5 text-white stroke-[3px]" />
      </button>
    </div>
  );
}
