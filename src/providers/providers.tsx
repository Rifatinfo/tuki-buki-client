"use client";

import { CartProvider } from "./CartProvider";

import { WishlistProvider } from "./WishlistProvider";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WishlistProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </WishlistProvider>
  );
}