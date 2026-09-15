import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { PRODUCT_CATALOG } from "../data/products";
import type { CartMap } from "../types/product";

const STORAGE_KEY = "veggo_cart";

interface CartContextValue {
  cart: CartMap;
  cartCount: number;
  cartTotal: number;
  cartMrpTotal: number;
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

// Automatically clean and read only valid catalog items
function readInitialCart(): CartMap {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return {};
    const parsed = JSON.parse(saved);
    const cleaned: CartMap = {};

    // Sirf wahi items load honge jo PRODUCT_CATALOG me exist karte hain
    for (const [id, qty] of Object.entries(parsed)) {
      if (PRODUCT_CATALOG[id] && typeof qty === "number" && qty > 0) {
        cleaned[id] = qty;
      }
    }
    return cleaned;
  } catch {
    return {};
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartMap>(readInitialCart);

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // localStorage unavailable (private mode, quota, etc.)
    }
  }, [cart]);

  const addToCart = useCallback((id: string, qty: number = 1) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + qty }));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });
  }, []);

  const setQuantity = useCallback((id: string, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: qty };
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const { cartCount, cartTotal, cartMrpTotal } = useMemo(() => {
    let count = 0;
    let total = 0;
    let mrpTotal = 0;

    for (const [id, qty] of Object.entries(cart)) {
      const product = PRODUCT_CATALOG[id];

      // ✅ Count aur Total dono sirf valid catalog products ke liye add honge
      if (product && qty > 0) {
        count += qty;
        total += (product.price || 0) * qty;
        mrpTotal += (product.mrp || product.price || 0) * qty;
      }
    }

    return { cartCount: count, cartTotal: total, cartMrpTotal: mrpTotal };
  }, [cart]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      cartCount,
      cartTotal,
      cartMrpTotal,
      addToCart,
      removeFromCart,
      setQuantity,
      removeItem,
      clearCart,
    }),
    [
      cart,
      cartCount,
      cartTotal,
      cartMrpTotal,
      addToCart,
      removeFromCart,
      setQuantity,
      removeItem,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a <CartProvider>");
  return ctx;
}