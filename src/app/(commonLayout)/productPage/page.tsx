"use client";

import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion'
import {
    SlidersHorizontal,
    ChevronDown,
    Heart,
    X,
    Plus,
    Minus,
    Check,
} from 'lucide-react'
import ProductCard from "@/components/shared/ProductCard/ProductCard";
const productPage = () => {
    const colors = [
        {
            name: 'Red',
            hex: '#ef4444',
        },
        {
            name: 'Blue',
            hex: '#3b82f6',
        },
        {
            name: 'Green',
            hex: '#10b981',
        },
        {
            name: 'Yellow',
            hex: '#f59e0b',
        },
        {
            name: 'Black',
            hex: '#111827',
        },
        {
            name: 'White',
            hex: '#ffffff',
            border: true,
        },
    ]
    const priceRanges = [
        'Under ₹10,000',
        '₹10,000 - ₹15,000',
        '₹15,000 - ₹20,000',
        'Above ₹20,000',
    ]

// const products: Product[] = [
//   {
//     id: 1,
//     name: 'Crimson Red Muslin Saree',
//     slug: 'crimson-red-muslin-saree',
//     price: 'TK 12,999',
//     regularPrice: 12999,
//     thumbnailImage:
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975769/0660000105971_aj9z3s.webp',
//     images: [
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975769/0660000105971_aj9z3s.webp',
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975767/0430000121008_zq6vso.webp',
//     ],
//     image1:
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975769/0660000105971_aj9z3s.webp',
//     image2:
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975767/0430000121008_zq6vso.webp',
//   },

//   {
//     id: 2,
//     name: 'Midnight Bloom Drape',
//     slug: 'midnight-bloom-drape',
//     price: 'TK 14,500',
//     regularPrice: 14500,
//     thumbnailImage:
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975765/0660000105903_uwcy9g.webp',
//     images: [
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975765/0660000105903_uwcy9g.webp',
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975763/0550000165231_fmdfjm.webp',
//     ],
//     image1:
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975765/0660000105903_uwcy9g.webp',
//     image2:
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975763/0550000165231_fmdfjm.webp',
//   },

//   {
//     id: 3,
//     name: 'Ivory Gold Threadwork',
//     slug: 'ivory-gold-threadwork',
//     price: 'TK 22,000',
//     regularPrice: 22000,
//     thumbnailImage:
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975767/0430000121008_zq6vso.webp',
//     images: [
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975767/0430000121008_zq6vso.webp',
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975769/0660000105971_aj9z3s.webp',
//     ],
//     image1:
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975767/0430000121008_zq6vso.webp',
//     image2:
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975769/0660000105971_aj9z3s.webp',
//   },

//   {
//     id: 4,
//     name: 'Emerald Forest Silk',
//     slug: 'emerald-forest-silk',
//     price: 'TK 6,450',
//     regularPrice: 6450,
//     thumbnailImage:
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975763/0550000165231_fmdfjm.webp',
//     images: [
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975763/0550000165231_fmdfjm.webp',
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975765/0660000105903_uwcy9g.webp',
//     ],
//     image1:
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975763/0550000165231_fmdfjm.webp',
//     image2:
//       'https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975765/0660000105903_uwcy9g.webp',
//   },
// ];
    // --- COMPONENTS ---
    const Accordion = ({
        title,
        children,
        defaultOpen = false,
    }: {
        title: string
        children: React.ReactNode
        defaultOpen?: boolean
    }) => {
        const [isOpen, setIsOpen] = useState(defaultOpen)
        return (
            <div className="border-b border-gray-200 py-5">
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
                                height: 'auto',
                                opacity: 1,
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: 'easeInOut',
                            }}
                            className="overflow-hidden"
                        >
                            <div className="pt-5 pb-2">{children}</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )
    }
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [selectedColor, setSelectedColor] = useState<string | null>(null)
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 mt-20">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="flex items-center gap-2 px-6 py-3   transition-all duration-300 text-sm font-medium tracking-wide active:scale-95 cursor-pointer"
                    >
                        <SlidersHorizontal size={16} />
                        FILTERS
                    </button>
                    <span className="text-sm text-gray-400 tracking-wider hidden sm:inline-block">
                        162 RESULTS
                    </span>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className="text-sm text-gray-400 tracking-wide">
                        Sort By:
                    </span>
                    <button className="flex items-center gap-1.5 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                        Newest <ChevronDown size={16} strokeWidth={1.5} />
                    </button>
                </div>
            </div>

            {/* Product Grid
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-16 mt-10">
                {products.map((product, idx) => (
                    <ProductCard key={product.id} product={product} index={idx} />
                ))}
            </div> */}

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
                                x: '100%',
                            }}
                            animate={{
                                x: 0,
                            }}
                            exit={{
                                x: '100%',
                            }}
                            transition={{
                                type: 'spring',
                                damping: 28,
                                stiffness: 250,
                            }}
                            className="fixed top-0 right-0 h-full w-[85vw] sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                                <h2 className="text-lg font-serif italic text-gray-900">
                                    Filter & Sort
                                </h2>
                                <button
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="p-2 -mr-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Drawer Content */}
                            <div className="flex-grow overflow-y-auto drawer-scroll px-6 py-2">
                                {/* Colour Filter */}
                                <Accordion title="Colour" defaultOpen={true}>
                                    <div className="flex flex-wrap gap-3">
                                        {colors.map((color) => (
                                            <button
                                                key={color.name}
                                                onClick={() => setSelectedColor(color.name)}
                                                className={`group relative w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${color.border ? 'border border-gray-200' : ''}`}
                                                style={{
                                                    backgroundColor: color.hex,
                                                }}
                                                title={color.name}
                                            >
                                                {selectedColor === color.name && (
                                                    <Check
                                                        size={16}
                                                        className={
                                                            color.name === 'White'
                                                                ? 'text-gray-900'
                                                                : 'text-white'
                                                        }
                                                    />
                                                )}
                                            </button>
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

                                {/* Additional Filter Example */}
                                <Accordion title="Fabric">
                                    <div className="flex flex-col gap-3">
                                        {['Pure Muslin', 'Cotton Blend', 'Silk Muslin'].map(
                                            (fabric, idx) => (
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
                                                        {fabric}
                                                    </span>
                                                </label>
                                            ),
                                        )}
                                    </div>
                                </Accordion>
                            </div>

                            {/* Drawer Footer */}
                            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setSelectedColor(null)}
                                        className="flex-1 py-3 px-4 border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                                    >
                                        Clear All
                                    </button>
                                    <button
                                        onClick={() => setIsDrawerOpen(false)}
                                        className="flex-1 py-3 px-4 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors shadow-md"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default productPage;