"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// ================= Types =================

export interface WishlistItem {
  id: string;
  name: string;
  slug: string;
  sku: string;
  thumbnailImage: string;
  regularPrice: number;
  salePrice: number;
  stockStatus: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];

  addToWishlist: (
    product: WishlistItem
  ) => void;

  removeFromWishlist: (
    id: string
  ) => void;

  isWishlisted: (
    id: string
  ) => boolean;

  clearWishlist: () => void;
}

// ================= Context =================

const WishlistContext = createContext<
  WishlistContextType | undefined
>(undefined);

// ================= Provider =================

export const WishlistProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [wishlist, setWishlist] =
    useState<WishlistItem[]>([]);

  // ================= Load Wishlist =================

  useEffect(() => {
    const storedWishlist =
      localStorage.getItem("wishlist");

    if (storedWishlist) {
      setWishlist(
        JSON.parse(storedWishlist)
      );
    }
  }, []);

  // ================= Save Wishlist =================

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // ================= Add =================

  const addToWishlist = (
    product: WishlistItem
  ) => {
    setWishlist((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id
      );

      // Already exists
      if (exists) {
        return prev;
      }

      // Add new
      return [...prev, product];
    });
  };

  // ================= Remove =================

  const removeFromWishlist = (
    id: string
  ) => {
    setWishlist((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  // ================= Check =================

  const isWishlisted = (
    id: string
  ) => {
    return wishlist.some(
      (item) => item.id === id
    );
  };

  // ================= Clear =================

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// ================= Hook =================

export const useWishlist = () => {
  const context =
    useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
};
