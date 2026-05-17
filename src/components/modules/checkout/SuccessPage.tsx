"use client";

import { CheckCircleIcon } from "lucide-react";

export default function SuccessPage({
  onContinueShopping,
}: {
  onContinueShopping: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
        <h1 className="text-2xl font-bold mt-4">Order Successful</h1>

        <button
          onClick={onContinueShopping}
          className="mt-6 bg-black text-white px-6 py-3 rounded"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}