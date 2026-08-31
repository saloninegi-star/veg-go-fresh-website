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

/** cart is stored as { [productId]: quantity } — see context/CartContext.tsx */
export type CartMap = Record<string, number>;
