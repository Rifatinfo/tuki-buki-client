"use client";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  UserIcon,
  HeartIcon,
  MenuIcon,
  Search,
  ShoppingCart,
} from "lucide-react";
import { MenuCategory, menuData } from "@/components/data/menuData";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import Link from "next/link";
import { useCart } from "@/providers/CartProvider";
import { useWishlist } from "@/providers/WishlistProvider";
import { useCartDrawer } from "@/providers/CartDrawerProvider";

type HeaderProps = {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
};
export function Header({
  sidebarOpen,
  onToggleSidebar,
  darkMode,
  onToggleTheme,
}: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { openDrawer } = useCartDrawer();
  const [activeCategory, setActiveCategory] = useState<MenuCategory | null>(
    null,
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalWishlistItems = wishlist.length;

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <header
        className="fixed top-0 left-0 w-full border-b border-gray-200 bg-white z-30"
        onMouseLeave={() => setActiveCategory(null)}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile: Hamburger & Logo Container */}
            <div className="flex items-center lg:hidden flex-1">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-gray-900 hover:text-[#E8731A] transition-colors"
                aria-label="Open menu"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 -ml-30 md:ml-0 flex items-start justify-start lg:justify-start flex-1 lg:flex-none">
              <Link
                href="/"
                className="flex flex-col items-center lg:items-start group"
              >
                <span className="text-3xl font-extrabold tracking-tighter text-[#E8731A] leading-none">
                  Tugi Bugi
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 ml-8 xl:ml-12 h-full flex-1">
              {menuData.map((category) => (
                <button
                  key={category.name}
                  onMouseEnter={() => setActiveCategory(category)}
                  className={`h-full flex items-center text-sm font-medium tracking-wide uppercase border-b-2 transition-colors ${activeCategory?.name === category.name ? "border-[#E8731A] text-[#E8731A]" : "border-transparent text-gray-900 hover:text-[#E8731A]"}`}
                >
                  {category.name}
                </button>
              ))}
            </nav>

            {/*===================== Right Icons ====================*/}
            <div className="flex items-center justify-end gap-2 sm:gap-4 flex-1 lg:flex-none">
              <a
                href="#"
                className="text-gray-900 hover:text-[#E8731A] transition-colors"
                aria-label="Account"
              >
                <Search className="w-6 h-6" strokeWidth={2} />
              </a>
              <a
                href="#"
                className="text-gray-900 hover:text-[#E8731A] transition-colors"
                aria-label="Account"
              >
                <UserIcon className="w-6 h-6" strokeWidth={2} />
              </a>
              {/* Wishlist Icon with count */}
              <a
                href="#"
                className="relative text-gray-900 hover:text-[#E8731A] transition-colors"
                aria-label="Wishlist"
              >
                <HeartIcon className="w-6 h-6" strokeWidth={2} />
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-[#E8731A] rounded-full">
                  {totalWishlistItems}
                </span>
              </a>

              {/*==================== Shopping Bag Icon with count ===================*/}
              {/* Shopping Bag Icon with count */}

              <button
                onClick={openDrawer}
                className="relative text-gray-900 hover:text-[#E8731A] transition-colors"
                aria-label="Shopping Bag"
              >
                <ShoppingCart className="w-6 h-6" strokeWidth={2} />

                {mounted && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-[#E8731A] rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Mega Menu Dropdown */}
        <AnimatePresence>
          {activeCategory && (
            <div className="hidden lg:block">
              <MegaMenu category={activeCategory} />
            </div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Slide-out Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
