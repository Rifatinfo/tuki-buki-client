"use client";

import React from "react";
import { ArrowRightIcon, ShieldCheckIcon } from "lucide-react";
import { useCart } from "@/providers/CartProvider";

interface OrderSummaryCardProps {
  buttonText: string;
  onAction: () => void;
  isCheckout?: boolean;
  disabled?: boolean;
}

export default function OrderSummaryCard({
  buttonText,
  onAction,
  isCheckout = false,
  disabled = false,
}: OrderSummaryCardProps) {
  const { cart, deliveryFee } = useCart();

  // ================= CALCULATIONS =================

  const subtotal = cart.reduce(
    (acc, item) => acc + item.salePrice * item.quantity,
    0,
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const total = subtotal + deliveryFee;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:sticky lg:top-24">
      {/* HEADER */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
      </div>

      <div className="p-6">
        {/* SUMMARY DETAILS */}
        <div className="space-y-3 text-sm mb-5">
          <div className="flex justify-between text-gray-600">
            <span>Total Products ({totalItems})</span>
            <span className="font-medium text-gray-900">
              Tk. {subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Delivery Charge</span>
            <span className="font-medium text-gray-900">
              {!isCheckout && deliveryFee === 0
                ? "Calculated at checkout"
                : `Tk. ${deliveryFee.toLocaleString()}`}
            </span>
          </div>
        </div>

        {/* TOTAL */}
        <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
          <div className="flex justify-between items-baseline">
            <span className="text-base font-semibold text-gray-900">
              Grand Total
            </span>

            <span className="text-2xl font-bold text-[#e8731a]">
              Tk. {total.toLocaleString()}
            </span>
          </div>

          <p className="text-xs text-gray-400 mt-1">
            Including all charges
          </p>
        </div>

        {/* BUTTON */}
        <button
          onClick={onAction}
          disabled={disabled}
          className="w-full bg-[#e8731a] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#d3651a] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {buttonText}
          <ArrowRightIcon className="w-4 h-4" />
        </button>

        {/* SECURITY NOTE */}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
          <ShieldCheckIcon className="w-4 h-4 text-green-600" />
          <span>Secure encrypted checkout</span>
        </div>
      </div>
    </div>
  );
}