'use client';

import CartPage from "@/components/modules/checkout/CartPage";
import CheckoutPage from "@/components/modules/checkout/CheckoutPage";
import SuccessPage from "@/components/modules/checkout/SuccessPage";
import { useState } from "react";


export default function CheckoutFlow() {
  const [currentPage, setCurrentPage] = useState<"cart" | "checkout" | "success">("cart");

  return (
    <div className="flex flex-col min-h-screen mt-30">
      {/* Progress */}
      {currentPage !== "success" && (
        <div className="hidden sm:flex items-center gap-4 text-sm font-medium p-4">
          <span className={currentPage === "cart" ? "text-[#e8731a]" : "text-gray-400"}>
            1. Cart
          </span>
          <div className="w-8 h-px bg-gray-200" />
          <span className={currentPage === "checkout" ? "text-[#e8731a]" : "text-gray-400"}>
            2. Checkout
          </span>
        </div>
      )}

      <main className="flex-1">
        {currentPage === "cart" && (
          <CartPage onProceed={() => setCurrentPage("checkout")} />
        )}

        {currentPage === "checkout" && (
          <CheckoutPage
            onBack={() => setCurrentPage("cart")}
            onSuccess={() => setCurrentPage("success")}
          />
        )}

        {currentPage === "success" && (
          <SuccessPage onContinueShopping={() => setCurrentPage("cart")} />
        )}
      </main>
    </div>
  );
}