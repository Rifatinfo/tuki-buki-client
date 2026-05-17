"use client";

import { useEffect } from "react";
import { MinusIcon, PlusIcon, Trash2Icon, ShoppingBagIcon } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import OrderSummaryCard from "./OrderSummaryCard";
import Image from "next/image";

export default function CartPage({ onProceed }: { onProceed: () => void }) {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    setDeliveryType,
  } = useCart();

  useEffect(() => {
    setDeliveryType("");
  }, [setDeliveryType]);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingBagIcon className="w-10 h-10 text-gray-300 mb-4" />
        <h2 className="text-xl font-bold">Your cart is empty</h2>
      </div>
    );
  }

  console.log("Card", cart);
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-12 gap-8">
      {/* ITEMS */}
      <div className="lg:col-span-8 space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 transition-all shadow-md"
          >
            <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50  overflow-hidden">
              <Image
                width={128}
                height={128}
                alt="product"
                src={`${process.env.NEXT_PUBLIC_API_URL}${item.thumbnailImage}`}
                unoptimized
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.name}
                  </h3>

                  <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-4">
                    {item.size && (
                      <span className="bg-gray-50 px-2 py-1 rounded-md">
                        Size: {item.size}
                      </span>
                    )}

                    {item.color && (
                      <span className="bg-gray-50 px-2 py-1 rounded-md">
                        Color: {item.color}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    TK {(item.salePrice * item.quantity).toLocaleString()}
                  </p>

                  <p className="text-sm text-gray-500">
                    TK {item.salePrice.toLocaleString()} each
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                {/* Quantity Selector */}
                <div className="flex items-center bg-gray-50 rounded-lg p-1">
                  <button
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-md transition-all shadow-sm"
                    onClick={() =>
                      decreaseQuantity(item.id, item.color, item.size)
                    }
                    aria-label="Decrease quantity"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>

                  <span className="w-12 text-center font-medium text-gray-900">
                    {item.quantity}
                  </span>

                  <button
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-md transition-all shadow-sm"
                    onClick={() =>
                      increaseQuantity(item.id, item.color, item.size)
                    }
                    aria-label="Increase quantity"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                  onClick={() => removeFromCart(item.id, item.color, item.size)}
                >
                  <Trash2Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">Remove</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="lg:col-span-4">
        <OrderSummaryCard
          buttonText="Proceed to Checkout"
          onAction={onProceed}
        />
      </div>
    </div>
  );
}
