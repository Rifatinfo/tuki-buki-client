"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Swal from "sweetalert2";

// ================= Types =================

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  sku: string;
  thumbnailImage: string;
  regularPrice: number;
  salePrice: number;
  quantity: number;
  color?: string;
  size?: string;
  stock: number;
  stockStatus: string;
}

interface CartContextType {
  cart: CartItem[];

  addToCart: (product: CartItem) => void;
  increaseQuantity: (id: string, color?: string, size?: string) => void;
  decreaseQuantity: (id: string, color?: string, size?: string) => void;
  removeFromCart: (id: string, color?: string, size?: string) => void;
  clearCart: () => void;
}

// ================= Context =================

const CartContext = createContext<CartContextType | undefined>(undefined);

// ================= Provider =================

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ================= Load Cart =================

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // ================= Save Cart =================

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ================= Add To Cart =================

  const addToCart = (product: CartItem) => {
  setCart((prev) => {
    const existingProduct = prev.find(
      (item) =>
        item.id === product.id &&
        item.color === product.color &&
        item.size === product.size,
    );

    // ================= EXISTING PRODUCT =================
    if (existingProduct) {
      const newQty = existingProduct.quantity + product.quantity;

      // 🚨 VALIDATION: exceed stock
      if (newQty > product.stock) {
        Swal.fire({
          icon: "error",
          title: "LIMIT EXCEEDED",
          text: `Only ${product.stock} item(s) available`,
        });
        return prev; // ❌ no update
      }

      return prev.map((item) => {
        if (
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size
        ) {
          return {
            ...item,
            quantity: newQty,
          };
        }
        return item;
      });
    }

    // ================= NEW PRODUCT =================
    if (product.quantity > product.stock) {
      Swal.fire({
        icon: "error",
        title: "LIMIT EXCEEDED",
        text: `Only ${product.stock} item(s) available`,
      });
      return prev; // ❌ block add
    }

    return [...prev, product];
  });
};
  // ================= Remove =================

  const removeFromCart = (id: string, color?: string, size?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.color === color && item.size === size),
      ),
    );
  };

  /*===================== Update quantity inside cart =====================*/

  // ================= Increase Quantity =================
  const increaseQuantity = (id: string, color?: string, size?: string) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id && item.color === color && item.size === size) {
          if (item.quantity >= item.stock) return item; // 🚫 block increase

          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      }),
    );
  };

  // ================= Decrease Quantity =================

  const decreaseQuantity = (id: string, color?: string, size?: string) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.color === color && item.size === size) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };
  // ================= Clear Cart =================

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ================= Custom Hook =================

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
