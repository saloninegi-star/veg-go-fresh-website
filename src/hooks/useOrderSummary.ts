import { useMemo } from "react";
import { useCart } from "../context/CartContext";
import { PRODUCT_CATALOG } from "../data/products";

export const DELIVERY_CHARGE = 20;
export const PACKAGING_CHARGE = 10;
export const FREE_DELIVERY_THRESHOLD = 299;

/**
 * Cart totals + checkout business rules (delivery fee threshold, packaging
 * charge) in one place. CartPage and CheckoutPage both read from here so the
 * numbers can never drift apart between the two screens.
 */
export function useOrderSummary() {
  const { cart } = useCart();

  return useMemo(() => {
    const cartEntries = Object.entries(cart).filter(([id]) => PRODUCT_CATALOG[id]);
    const cartCount = cartEntries.reduce((a, [, q]) => a + q, 0);

    const subtotal = cartEntries.reduce((sum, [id, q]) => sum + (PRODUCT_CATALOG[id]?.price ?? 0) * q, 0);
    const mrpTotal = cartEntries.reduce((sum, [id, q]) => sum + (PRODUCT_CATALOG[id]?.mrp ?? 0) * q, 0);
    const savings = Math.max(0, mrpTotal - subtotal);

    const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_CHARGE;
    const packagingCharge = cartEntries.length > 0 ? PACKAGING_CHARGE : 0;
    const totalAmount = subtotal + deliveryCharge + packagingCharge;
    const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

    return {
      cartEntries,
      cartCount,
      subtotal,
      mrpTotal,
      savings,
      deliveryCharge,
      packagingCharge,
      totalAmount,
      amountToFreeDelivery,
    };
  }, [cart]);
}
