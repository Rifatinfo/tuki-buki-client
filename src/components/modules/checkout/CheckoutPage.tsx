"use client";

import { useEffect, useState } from "react";
import { ChevronLeftIcon } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import OrderSummaryCard from "./OrderSummaryCard";
import { createOrder } from "@/services/order/order";

export default function CheckoutPage({
  onBack,
  onSuccess,
}: {
  onBack: () => void;
  onSuccess: () => void;
}) {
  const { cart, setDeliveryType, clearCart } = useCart();
  const [selectedDelivery, setSelectedDelivery] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    division: "",
    address: "",
  });

  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (selectedDelivery === "dhaka") {
      setDeliveryType("inside_dhaka");
    } else if (selectedDelivery === "outside") {
      setDeliveryType("outside_dhaka");
    } else {
      setDeliveryType("");
    }
  }, [selectedDelivery, setDeliveryType]);

  const isValid =
    form.fullName &&
    form.phone &&
    form.email &&
    form.address &&
    selectedDelivery &&
    selectedPayment &&
    agreed;

  const handlePlaceOrder = async () => {
    if (!isValid) return;

    const payload = {
      deliveryInfo: {
        name: form.fullName,
        phone: form.phone,
        state: form.division,
        address: form.address,
      },
      deliveryType:
        selectedDelivery === "dhaka" ? "inside_dhaka" : "outside_dhaka",
      paymentMethod: selectedPayment === "online" ? "ONLINE" : "COD",
      checkoutEmail: form.email,

      // 🔥 FIXED BACKEND FORMAT
      cartItems: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
        sku: item.sku,
      })),
    };

    await createOrder(payload);

    clearCart();
    onSuccess();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-12 gap-8">
      {/* BACK */}
      <button onClick={onBack} className="flex items-center gap-2 mb-4">
        <ChevronLeftIcon /> Back
      </button>

      {/* FORM */}
      <div className="lg:col-span-8 space-y-4">
        <input
          placeholder="Full Name"
          className="border p-3 w-full"
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />

        <input
          placeholder="Phone"
          className="border p-3 w-full"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        {/* EMAIL FIELD ADDED */}
        <input
          placeholder="Email"
          className="border p-3 w-full"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Division"
          className="border p-3 w-full"
          onChange={(e) => setForm({ ...form, division: e.target.value })}
        />

        <textarea
          placeholder="Address"
          className="border p-3 w-full"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        {/* DELIVERY */}
        <div className="flex gap-3">
          <button onClick={() => setSelectedDelivery("dhaka")}>
            Inside Dhaka
          </button>
          <button onClick={() => setSelectedDelivery("outside")}>
            Outside Dhaka
          </button>
        </div>

        {/* PAYMENT */}
        <div className="flex gap-3">
          <button onClick={() => setSelectedPayment("online")}>Online</button>
          <button onClick={() => setSelectedPayment("cod")}>COD</button>
        </div>

        {/* TERMS */}
        <label>
          <input
            type="checkbox"
            onChange={(e) => setAgreed(e.target.checked)}
          />
          I agree to terms
        </label>
      </div>

      {/* SUMMARY */}
      <div className="lg:col-span-4">
        <OrderSummaryCard
          buttonText="Place Order"
          onAction={handlePlaceOrder}
          isCheckout={true}
          disabled={!isValid}
        />
      </div>
    </div>
  );
}
