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
  isFavorite?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  products?: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity?: (id: number) => void;
  decreaseQuantity?: (id: number) => void;
  toggleFavorite?: (id: number) => void;
  total?: number;
  length?: number;
  // removeFromCart: (id: string) => void;
  // addToFavorites: (item: CartItem) => void;
  // clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(dummyProducts);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const toggleFavorite = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, isFavorite: !product.isFavorite }
          : product,
      ),
    );
  };

  const total = cart.reduce(
    (acc, item) => acc + +item.price * item.quantity,
    0,
  );

  const length = cart?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  return (
    <CartContext.Provider
      // addToCart, removeFromCart, addToFavorites, clearCart
      value={{
        cart,
        products,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        total,
        removeFromCart,
        toggleFavorite,
        length,
      }}
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
