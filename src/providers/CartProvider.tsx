// "use client";

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";
// import Swal from "sweetalert2";

// // ================= Types =================

// export interface CartItem {
//   id: string;
//   name: string;
//   slug: string;
//   sku: string;
//   thumbnailImage: string;
//   regularPrice: number;
//   salePrice: number;
//   quantity: number;
//   color?: string;
//   size?: string;
//   stock: number;
//   stockStatus: string;
// }

// interface CartContextType {
//   cart: CartItem[];

//   addToCart: (product: CartItem) => void;
//   increaseQuantity: (id: string, color?: string, size?: string) => void;
//   decreaseQuantity: (id: string, color?: string, size?: string) => void;
//   removeFromCart: (id: string, color?: string, size?: string) => void;
//   clearCart: () => void;
// }

// // ================= Context =================

// const CartContext = createContext<CartContextType | undefined>(undefined);

// // ================= Provider =================

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   // ================= Load Cart =================

//   useEffect(() => {
//     const storedCart = localStorage.getItem("cart");

//     if (storedCart) {
//       setCart(JSON.parse(storedCart));
//     }
//   }, []);

//   // ================= Save Cart =================

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // ================= Add To Cart =================

//   const addToCart = (product: CartItem) => {
//   setCart((prev) => {
//     const existingProduct = prev.find(
//       (item) =>
//         item.id === product.id &&
//         item.color === product.color &&
//         item.size === product.size,
//     );

//     // ================= EXISTING PRODUCT =================
//     if (existingProduct) {
//       const newQty = existingProduct.quantity + product.quantity;

//       // 🚨 VALIDATION: exceed stock
//       if (newQty > product.stock) {
//         Swal.fire({
//           icon: "error",
//           title: "LIMIT EXCEEDED",
//           text: `Only ${product.stock} item(s) available`,
//         });
//         return prev; // ❌ no update
//       }

//       return prev.map((item) => {
//         if (
//           item.id === product.id &&
//           item.color === product.color &&
//           item.size === product.size
//         ) {
//           return {
//             ...item,
//             quantity: newQty,
//           };
//         }
//         return item;
//       });
//     }

//     // ================= NEW PRODUCT =================
//     if (product.quantity > product.stock) {
//       Swal.fire({
//         icon: "error",
//         title: "LIMIT EXCEEDED",
//         text: `Only ${product.stock} item(s) available`,
//       });
//       return prev; // ❌ block add
//     }

//     return [...prev, product];
//   });
// };
//   // ================= Remove =================

//   const removeFromCart = (id: string, color?: string, size?: string) => {
//     setCart((prev) =>
//       prev.filter(
//         (item) =>
//           !(item.id === id && item.color === color && item.size === size),
//       ),
//     );
//   };

//   /*===================== Update quantity inside cart =====================*/

//   // ================= Increase Quantity =================
//   const increaseQuantity = (id: string, color?: string, size?: string) => {
//     setCart((prev) =>
//       prev.map((item) => {
//         if (item.id === id && item.color === color && item.size === size) {
//           if (item.quantity >= item.stock) return item; // 🚫 block increase

//           return {
//             ...item,
//             quantity: item.quantity + 1,
//           };
//         }
//         return item;
//       }),
//     );
//   };

//   // ================= Decrease Quantity =================

//   const decreaseQuantity = (id: string, color?: string, size?: string) => {
//     setCart((prev) =>
//       prev
//         .map((item) => {
//           if (item.id === id && item.color === color && item.size === size) {
//             return {
//               ...item,
//               quantity: item.quantity - 1,
//             };
//           }
//           return item;
//         })
//         .filter((item) => item.quantity > 0),
//     );
//   };
//   // ================= Clear Cart =================

//   const clearCart = () => {
//     setCart([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         increaseQuantity,
//         decreaseQuantity,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// // ================= Custom Hook =================

// export const useCart = () => {
//   const context = useContext(CartContext);

//   if (!context) {
//     throw new Error("useCart must be used inside CartProvider");
//   }

//   return context;
// };


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

// ================= DELIVERY TYPE =================

type DeliveryType = "inside_dhaka" | "outside_dhaka";

// ================= CONTEXT TYPE =================

interface CartContextType {
  cart: CartItem[];

  addToCart: (product: CartItem) => void;
  increaseQuantity: (id: string, color?: string, size?: string) => void;
  decreaseQuantity: (id: string, color?: string, size?: string) => void;
  removeFromCart: (id: string, color?: string, size?: string) => void;
  clearCart: () => void;

  // ✅ DELIVERY STATE (FIX ADDED)
  deliveryType: DeliveryType | "";
  setDeliveryType: (type: DeliveryType | "") => void;

  // ✅ CALCULATED VALUES
  subtotal: number;
  deliveryFee: number;
  total: number;
  totalItems: number;
}

// ================= CONTEXT =================

const CartContext = createContext<CartContextType | undefined>(undefined);

// ================= DELIVERY MAP (YOUR BACKEND) =================

export const DELIVERY_CHARGE: Record<string, number> = {
  inside_dhaka: 60,
  outside_dhaka: 130,
};

// ================= PROVIDER =================

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryType, setDeliveryType] =
    useState<DeliveryType | "">("");

  // ================= LOAD CART =================

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // ================= SAVE CART =================

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ================= CART ACTIONS =================

  const addToCart = (product: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) =>
          i.id === product.id &&
          i.color === product.color &&
          i.size === product.size,
      );

      if (existing) {
        const newQty = existing.quantity + product.quantity;

        if (newQty > product.stock) {
          Swal.fire({
            icon: "error",
            title: "LIMIT EXCEEDED",
            text: `Only ${product.stock} item(s) available`,
          });
          return prev;
        }

        return prev.map((i) =>
          i.id === product.id &&
          i.color === product.color &&
          i.size === product.size
            ? { ...i, quantity: newQty }
            : i,
        );
      }

      if (product.quantity > product.stock) {
        Swal.fire({
          icon: "error",
          title: "LIMIT EXCEEDED",
          text: `Only ${product.stock} item(s) available`,
        });
        return prev;
      }

      return [...prev, product];
    });
  };

  const removeFromCart = (id: string, color?: string, size?: string) => {
    setCart((prev) =>
      prev.filter(
        (i) =>
          !(i.id === id && i.color === color && i.size === size),
      ),
    );
  };

  const increaseQuantity = (id: string, color?: string, size?: string) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id === id && i.color === color && i.size === size) {
          if (i.quantity >= i.stock) return i;
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      }),
    );
  };

  const decreaseQuantity = (id: string, color?: string, size?: string) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id && i.color === color && i.size === size
            ? { ...i, quantity: i.quantity - 1 }
            : i,
        )
        .filter((i) => i.quantity > 0),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // ================= CALCULATIONS =================

  const subtotal = cart.reduce(
    (acc, item) => acc + item.salePrice * item.quantity,
    0,
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const deliveryFee =
    deliveryType ? DELIVERY_CHARGE[deliveryType] || 0 : 0;

  const total = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,

        // ✅ DELIVERY FIX
        deliveryType,
        setDeliveryType,

        // ✅ PRICING FIX
        subtotal,
        deliveryFee,
        total,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ================= HOOK =================

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};