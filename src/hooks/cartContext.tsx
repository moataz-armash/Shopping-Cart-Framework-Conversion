import { createContext, ReactNode, useContext, useState } from "react";
import { dummyProducts } from "../data/products";

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  color?: string;
  Gold?: string;
  salePrice: string;
  imageURL: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  products?: Product[];
  addToCart: (item: CartItem) => void;
  // removeFromCart: (id: string) => void;
  // addToFavorites: (item: CartItem) => void;
  // clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(dummyProducts);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
    <CartContext.Provider
      // addToCart, removeFromCart, addToFavorites, clearCart
      value={{ cart, products, addToCart }}
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
