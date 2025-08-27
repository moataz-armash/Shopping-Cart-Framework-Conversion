import { createContext, ReactNode, useContext, useState } from "react";
import { products } from "../data/products";

interface CartItem {
  id: number;
  title: string;
  category: string;
  price: string;
  color?: string;
  Gold?: string;
  salePrice: string;
  imageURL: string;
}

interface CartContextType {
  cart: CartItem[];
  // addToCart: (item: CartItem) => void;
  // removeFromCart: (id: string) => void;
  // addToFavorites: (item: CartItem) => void;
  // clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(products);

  return (
    <CartContext.Provider
      // addToCart, removeFromCart, addToFavorites, clearCart
      value={{ cart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
