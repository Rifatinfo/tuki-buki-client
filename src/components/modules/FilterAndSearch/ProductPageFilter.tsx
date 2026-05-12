"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  X,
  Plus,
  Minus,
  Check,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const ProductPageFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ================= COLORS =================
  const colors = [
    { name: "red", hex: "#ef4444" },
    { name: "blue", hex: "#3b82f6" },
    { name: "green", hex: "#10b981" },
    { name: "yellow", hex: "#f59e0b" },
    { name: "black", hex: "#111827" },
    { name: "white", hex: "#ffffff", border: true },
  ];

  // ================= PRICE RANGE =================
  const priceRanges = [
    {
      label: "Under Tk 5,000",
      value: "0-5000",
    },
    {
      label: "Tk 5,000 - Tk 10,000",
      value: "5000-10000",
    },
    {
      label: "Tk 10,000 - Tk 20,000",
      value: "10000-20000",
    },
    {
      label: "Above Tk 20,000",
      value: "20000-999999",
    },
  ];

  // ================= SORT OPTIONS =================
  const sortOptions = [
    {
      label: "Latest",
      sortBy: "createdAt",
      sortOrder: "desc",
    },
    {
      label: "Oldest",
      sortBy: "createdAt",
      sortOrder: "asc",
    },
    {
      label: "Price Low to High",
      sortBy: "salePrice",
      sortOrder: "asc",
    },
    {
      label: "Price High to Low",
      sortBy: "salePrice",
      sortOrder: "desc",
    },
    {
      label: "Name A-Z",
      sortBy: "name",
      sortOrder: "asc",
    },
    {
      label: "Name Z-A",
      sortBy: "name",
      sortOrder: "desc",
    },
  ];

  // ================= STOCK STATUS =================
  const stockOptions = [
    {
      label: "In Stock",
      value: "IN_STOCK",
    },
    {
      label: "Out of Stock",
      value: "OUT_OF_STOCK",
    },
  ];

  // ================= STATES =================
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [selectedColor, setSelectedColor] = useState<string | null>(
    searchParams.get("color")
  );

  const [selectedPrice, setSelectedPrice] = useState<string | null>(
    searchParams.get("priceRange")
  );

  const [selectedStock, setSelectedStock] = useState<string | null>(
    searchParams.get("stockStatus")
  );

  const [selectedSort, setSelectedSort] = useState(
    searchParams.get("sortBy") || "createdAt"
  );

  const [selectedSortOrder, setSelectedSortOrder] = useState(
    searchParams.get("sortOrder") || "desc"
  );

  // ================= APPLY FILTER =================
  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // COLOR
    if (selectedColor) {
      params.set("color", selectedColor);
    } else {
      params.delete("color");
    }

    // PRICE RANGE
    if (selectedPrice) {
      params.set("priceRange", selectedPrice);
    } else {
      params.delete("priceRange");
    }

    // STOCK STATUS
    if (selectedStock) {
      params.set("stockStatus", selectedStock);
    } else {
      params.delete("stockStatus");
    }

    // SORT
    params.set("sortBy", selectedSort);
    params.set("sortOrder", selectedSortOrder);

    // RESET PAGE
    params.set("page", "1");

    router.push(`?${params.toString()}`);

    setIsDrawerOpen(false);
  };

  // ================= CLEAR FILTER =================
  const clearFilters = () => {
    setSelectedColor(null);
    setSelectedPrice(null);
    setSelectedStock(null);
    setSelectedSort("createdAt");
    setSelectedSortOrder("desc");

    router.push("?");
  };

  // ================= ACCORDION =================
  const Accordion = ({
    title,
    children,
    defaultOpen = false,
  }: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
  }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
      <div className="border-b py-5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between w-full items-center group"
        >
          <span className="font-medium text-gray-900 tracking-wide uppercase text-sm">
            {title}
          </span>

          <span className="text-gray-400 group-hover:text-gray-900 transition-colors">
            {isOpen ? (
              <Minus size={18} strokeWidth={1.5} />
            ) : (
              <Plus size={18} strokeWidth={1.5} />
            )}
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="overflow-hidden"
            >
              <div className="pt-5 pb-2">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-gray-100">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 px-6 font-semibold transition-all duration-300 text-sm  tracking-wide active:scale-95 cursor-pointer"
          >
            <SlidersHorizontal size={16} />
            FILTERS
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* DRAWER */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 250,
              }}
              className="fixed top-0 right-0 h-full w-[85vw] sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h2 className="text-lg font-serif text-gray-900">
                  Filter & Sort
                </h2>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 -mr-2 text-gray-400 hover:text-gray-900 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* CONTENT */}
              <div className="flex-grow overflow-y-auto drawer-scroll px-6 py-2">

                {/* SORT */}
                <Accordion title="Sort" defaultOpen={true}>
                  <div className="flex flex-col gap-3">
                    {sortOptions.map((option, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative flex items-center justify-center w-5 h-5 border border-gray-300 rounded-sm">
                          <input
                            type="radio"
                            name="sort"
                            checked={
                              selectedSort === option.sortBy &&
                              selectedSortOrder === option.sortOrder
                            }
                            onChange={() => {
                              setSelectedSort(option.sortBy);
                              setSelectedSortOrder(option.sortOrder);
                            }}
                            className="peer sr-only"
                          />

                          <div className="absolute inset-0 bg-gray-900 scale-0 peer-checked:scale-100 transition-transform flex items-center justify-center rounded-sm">
                            <Check size={12} className="text-white" />
                          </div>
                        </div>

                        <span className="text-sm text-gray-600">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </Accordion>

                {/* COLOR */}
                <Accordion title="Colour" defaultOpen={true}>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((color, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative flex items-center justify-center w-5 h-5 border border-gray-300 rounded-sm">
                          <input
                            type="checkbox"
                            checked={selectedColor === color.name}
                            onChange={() =>
                              setSelectedColor(
                                selectedColor === color.name
                                  ? null
                                  : color.name
                              )
                            }
                            className="peer sr-only"
                          />

                          <div className="absolute inset-0 bg-gray-900 scale-0 peer-checked:scale-100 transition-transform flex items-center justify-center rounded-sm">
                            <Check size={12} className="text-white" />
                          </div>
                        </div>

                        <span className="text-sm text-gray-600 capitalize">
                          {color.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </Accordion>

                {/* PRICE */}
                <Accordion title="Price Range" defaultOpen={true}>
                  <div className="flex flex-col gap-3">
                    {priceRanges.map((range, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative flex items-center justify-center w-5 h-5 border border-gray-300 rounded-sm">
                          <input
                            type="radio"
                            checked={selectedPrice === range.value}
                            onChange={() =>
                              setSelectedPrice(range.value)
                            }
                            className="peer sr-only"
                          />

                          <div className="absolute inset-0 bg-gray-900 scale-0 peer-checked:scale-100 transition-transform flex items-center justify-center rounded-sm">
                            <Check size={12} className="text-white" />
                          </div>
                        </div>

                        <span className="text-sm text-gray-600">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </Accordion>

                {/* STOCK STATUS */}
                <Accordion title="Stock Status" defaultOpen={true}>
                  <div className="flex flex-col gap-3">
                    {stockOptions.map((stock, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative flex items-center justify-center w-5 h-5 border border-gray-300 rounded-sm">
                          <input
                            type="radio"
                            checked={selectedStock === stock.value}
                            onChange={() =>
                              setSelectedStock(stock.value)
                            }
                            className="peer sr-only"
                          />

                          <div className="absolute inset-0 bg-gray-900 scale-0 peer-checked:scale-100 transition-transform flex items-center justify-center rounded-sm">
                            <Check size={12} className="text-white" />
                          </div>
                        </div>

                        <span className="text-sm text-gray-600">
                          {stock.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </Accordion>
              </div>

              {/* FOOTER */}
              <div className="p-6">
                <div className="flex gap-4">
                  <button
                    onClick={clearFilters}
                    className="flex-1 py-3 px-4 text-white bg-black rounded-full text-sm font-medium transition-colors cursor-pointer"
                  >
                    Clear
                  </button>

                  <button
                    onClick={handleApplyFilters}
                    className="flex-1 py-3 px-4 bg-[#e8731a] text-white rounded-full text-sm font-medium transition-colors shadow-md cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPageFilter;