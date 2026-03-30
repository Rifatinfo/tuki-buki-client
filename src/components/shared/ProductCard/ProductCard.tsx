"use client";

import  { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Heart,
} from 'lucide-react'
// --- MOCK DATA ---

const ProductCard = ({ product, index }: { product: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      className="group flex flex-col gap-4 cursor-pointer "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm ">
        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/70 backdrop-blur-md hover:bg-white text-gray-600 hover:text-red-500 transition-all duration-300 shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 sm:opacity-100 sm:translate-y-0">
          <Heart size={18} strokeWidth={1.5} />
        </button>

        {/* Primary Image */}
        <img
          src={product.image1}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />

        {/* Secondary Image (Hover) */}
        <img
          src={product.image2}
          alt={`${product.name} alternate view`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out scale-105 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0'}`}
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col items-center text-center px-2">
        <h3 className="text-gray-900 font-medium text-sm sm:text-base tracking-wide transition-colors group-hover:text-gray-600">
          {product.name}
        </h3>
        <p className="text-sm mt-1">
          {product.price}
        </p>
      </div>
    </motion.div>
  )
}

export default ProductCard;