"use client";

import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { useCartDrawer } from "@/providers/CartDrawerProvider";
import { useCart } from "@/providers/CartProvider";

export function CartDrawer() {
  const { isOpen, closeDrawer } = useCartDrawer();

  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const router = useRouter();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.salePrice * item.quantity,
    0,
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Your cart is empty",
      });

      closeDrawer();
      return;
    }

    closeDrawer();
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 220,
            }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <ShoppingBag size={22} />
                Shopping Cart
              </h2>

              <button
                onClick={closeDrawer}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
              {cart.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Your cart is empty</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={`${item.id}-${item.color}-${item.size}-${index}`}
                    className="flex gap-4 border-b pb-2 shadow-2xl p-2 "
                  >
                    {/* Image */}
                    <div className="w-24 h-38 bg-gray-100 overflow-hidden flex-shrink-0 ">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${item.thumbnailImage}`}
                        alt={item.name}
                        unoptimized
                        width={100}
                        height={120}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-medium line-clamp-2">
                            {item.name}
                          </h3>

                          <p className="text-xs text-gray-500 mt-1">
                            SKU: {item.sku}
                          </p>

                          {/* Color & Size */}
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                            {item.color && (
                              <span>
                                Color:{" "}
                                <span className="font-medium">
                                  {item.color}
                                </span>
                              </span>
                            )}

                            {item.size && (
                              <span>
                                Size:{" "}
                                <span className="font-medium">{item.size}</span>
                              </span>
                            )}
                          </div>

                          <p className="font-semibold mt-2">
                            TK {item.salePrice}
                          </p>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() =>
                            removeFromCart(item.id, item.color, item.size)
                          }
                          className="text-red-500 hover:text-red-600 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center mt-4">
                        <div className="flex items-center border  overflow-hidden">
                          <button
                            onClick={() =>
                              decreaseQuantity(item.id, item.color, item.size)
                            }
                            className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="w-10 text-center text-sm font-medium">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id, item.color, item.size)
                            }
                            className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t p-5 space-y-4 bg-white">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>TK {subtotal}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full text-white py-3 bg-[#e8731a] font-medium  transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
