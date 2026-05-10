

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Eye, ShoppingCart  } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductViewModal from "../ProductViewModal";

// --- Types ---
interface ProductImage {
  id: string;
  productId: string;
  url: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  sku : string;
  thumbnailImage: string;
  images: ProductImage[];
  regularPrice: number;
  salePrice: number;
  stockStatus: "IN_STOCK" | "OUT_OF_STOCK";
  stockQuantity : number
}

interface ProductCardProps {
  product: Product;
  index: number;
  category: string;
  subCategory?: string;
}



function calcDiscount(regular: number, sale: number) {
  return Math.round(((regular - sale) / regular) * 100);
}


const ProductCard = ({ product, index, category, subCategory }: ProductCardProps) => {
  console.log("Product", product);
  const [openView, setOpenView] = useState(false);

  const resolveUrl = (url : any) => {
  if (!url?.trim()) return "/placeholder.png";

  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_API_URL}${url}`;
};

const productImages = [
  product?.thumbnailImage,
  ...(product?.images?.map((img: any) => img.url) || []),
]
  .filter(Boolean)
  .map((img) => resolveUrl(img));

const [isHovered, setIsHovered] = useState(false);
const [currentImage, setCurrentImage] = useState(0);
const [wishlisted, setWishlisted] = useState(false);

useEffect(() => {
  let interval: NodeJS.Timeout;

  if (isHovered && productImages.length > 1) {
    interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % productImages.length);
    }, 1000);
  } else {
    setCurrentImage(0);
  }

  return () => clearInterval(interval);
}, [isHovered, productImages.length]);

  const discount = product.salePrice < product.regularPrice
    ? calcDiscount(product.regularPrice, product.salePrice)
    : null;

   //  always include subCategory in URL if available
    const href = subCategory
        ? `/${category}/product/${subCategory}/${product.slug}`
        : `/${category}/product/${product.slug}`;



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col gap-4 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={href}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 ">

          <div className="absolute top-3 left-3 z-20 flex gap-2">

          {/* Sale Badge */}
          {discount && (
            <span className="bg-black text-white font-medium text-[10px] tracking-widest px-2 py-1">
              -{discount}%
            </span>
          )}

          {/* Sold Badge */}
          {(product.stockStatus === "OUT_OF_STOCK" || product.stockQuantity === 0) && (
            <span className="bg-black text-white text-[10px] tracking-widest font-medium px-2 py-1 uppercase">
              Sold
            </span>
          )}

      </div>

        {/* Action Buttons */}
          <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 
            opacity-100 sm:opacity-0 
            sm:group-hover:opacity-100 
            translate-y-0 sm:translate-y-2 
            sm:group-hover:translate-y-0 
            transition-all duration-300">

            {/* Wishlist */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setWishlisted((prev) => !prev);
              }}
              className="p-2 rounded-full bg-white/70 backdrop-blur-md hover:bg-white shadow-sm cursor-pointer"
              aria-label="Add to wishlist"
            >
              <Heart
                size={18}
                strokeWidth={1.5}
                className={wishlisted ? "fill-black " : "text-gray-600"}
              />
            </button>

            {/* Quick View */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenView(true);
              }}
              className="p-2 rounded-full bg-white/70 backdrop-blur-md hover:bg-white shadow-sm cursor-pointer"
              aria-label="Quick view"
            >
              <Eye size={18} strokeWidth={1.5} className="text-gray-600" />
            </button>

            {/* Add to Cart */}
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log("Add to cart");
              }}
              className="p-2 rounded-full bg-white/70 backdrop-blur-md hover:bg-white shadow-sm cursor-pointer"
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} strokeWidth={1.5} className="text-gray-600" />
            </button>
          </div>

          {/* Primary Image */}
          <Image
            src={productImages[currentImage]}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-all duration-700 ease-in-out"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col items-center text-center px-2 mt-4">
          <h3 className="text-gray-900 font-medium text-sm sm:text-base tracking-wide transition-colors group-hover:text-gray-600">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-semibold text-gray-900">
              {product.salePrice.toLocaleString()} TK
            </span>
            {discount && (
              <span className="text-sm text-gray-400 line-through">
                {product.regularPrice.toLocaleString()} TK
              </span>
            )}
          </div>
        </div>
      </Link>

      {/*=========== Add the Modal outside the Link =================*/}
      <ProductViewModal
        product={product}
        open={openView}
        setOpen={setOpenView}
      />
    </motion.div>

    
  );
};

export default ProductCard;