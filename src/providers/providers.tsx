"use client";

import { CartDrawerProvider } from "./CartDrawerProvider";
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
        <CartDrawerProvider>
          {children}
        </CartDrawerProvider>
      </CartProvider>
    </WishlistProvider>
  );
}