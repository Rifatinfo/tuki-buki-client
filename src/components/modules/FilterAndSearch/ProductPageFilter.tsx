"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, Plus, Minus, Check } from "lucide-react";
const ProductPageFilter = () => {
  const colors = [
    {
      name: "Red",
      hex: "#ef4444",
    },
    {
      name: "Blue",
      hex: "#3b82f6",
    },
    {
      name: "Green",
      hex: "#10b981",
    },
    {
      name: "Yellow",
      hex: "#f59e0b",
    },
    {
      name: "Black",
      hex: "#111827",
    },
    {
      name: "White",
      hex: "#ffffff",
      border: true,
    },
  ];
  const priceRanges = [
    "Under Tk 5,000",
    "Tk 5,000 - Tk 10,000",
    "Tk 10,000 - Tk 20,000",
    "Above Tk 20,000",
  ];

  // --- COMPONENTS ---
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  return (
    <div className="">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between  border-gray-100">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 px-6    transition-all duration-300 text-sm font-medium tracking-wide active:scale-95 cursor-pointer"
          >
            <SlidersHorizontal size={16} />
            FILTERS
          </button>
        </div>
      </div>

      {/* Product Grid */}

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 250,
              }}
              className="fixed top-0 right-0 h-full w-[85vw] sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h2 className="text-lg font-serif  text-gray-900">
                  Filter & Sort
                </h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 -mr-2 text-gray-400 hover:text-gray-900  rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-grow overflow-y-auto drawer-scroll px-6 py-2">
                {/* Colour Filter */}
                <Accordion title="Colour" defaultOpen={true}>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((color, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        {/* Custom Checkbox */}
                        <div className="relative flex items-center justify-center w-5 h-5 border border-gray-300 rounded-sm group-hover:border-gray-900 transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedColor === color.name}
                            onChange={() => setSelectedColor(color.name)}
                            className="peer sr-only"
                          />

                          <div className="absolute inset-0 bg-gray-900 scale-0 peer-checked:scale-100 transition-transform flex items-center justify-center rounded-sm">
                            <Check size={12} className="text-white" />
                          </div>
                        </div>

                        {/* Color Name */}
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                          {color.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </Accordion>

                {/* Price Range Filter */}
                <Accordion title="Price Range" defaultOpen={true}>
                  <div className="flex flex-col gap-3">
                    {priceRanges.map((range, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative flex items-center justify-center w-5 h-5 border border-gray-300 rounded-sm group-hover:border-gray-900 transition-colors">
                          <input type="checkbox" className="peer sr-only" />
                          <div className="absolute inset-0 bg-gray-900 scale-0 peer-checked:scale-100 transition-transform flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                          {range}
                        </span>
                      </label>
                    ))}
                  </div>
                </Accordion>
              </div>

              {/* Drawer Footer */}
              <div className="p-6">
                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedColor(null)}
                    className="flex-1 py-3 px-4  text-white bg-black  rounded-full text-sm font-medium  transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex-1 py-3 px-4 bg-[#e8731a] text-white rounded-full text-sm font-medium  transition-colors shadow-md cursor-pointer"
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
