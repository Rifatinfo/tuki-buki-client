"use client";

import { useState } from "react";
import { HeartIcon, Minus, Plus, ShoppingBag, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { Product } from "@/types/product";
import { ImageGallery } from "./ImageGallery";
import { AccordionSection } from "./AccordionSection";
import Breadcrumb from "./Breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/providers/CartProvider";

interface ProductDetailsProps {
  product: Product;
  category: string;
  subCategory: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const resolveUrl = (url: string): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${BASE_URL}${url}`;
};

const ProductDetails = ({
  product,
  category,
  subCategory,
}: ProductDetailsProps) => {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const images =
    product.images?.length > 0
      ? product.images.map((img) => resolveUrl(img.url))
      : product.thumbnailImage
        ? [resolveUrl(product.thumbnailImage)]
        : [];

  const hasDiscount = product.salePrice < product.regularPrice;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.regularPrice - product.salePrice) / product.regularPrice) *
          100,
      )
    : 0;

  const isOutOfStock =
    product.stockStatus === "OUT_OF_STOCK" || product.stockQuantity === 0;
  const isLowStock =
    product.stockStatus === "LOW_STOCK" ||
    (product.stockQuantity > 0 && product.stockQuantity <= 5);

  const uniqueSizes = [
    ...new Set(product.variants?.map((v) => v.size).filter(Boolean)),
  ] as string[];
  const uniqueColors = [
    ...new Set(product.variants?.map((v) => v.color).filter(Boolean)),
  ] as string[];

  // ======================== Stock Track ========================//
  const selectedVariant = product.variants.find(
    (v: any) => v.color === selectedColor && v.size === selectedSize,
  );

  const stock = selectedVariant?.quantity ?? 0;

  const handleBuyNow = () => {
    // ================= Size Validation =================

    if (uniqueSizes.length > 0 && !selectedSize) {
      Swal.fire({
        icon: "warning",
        title: "Size Required",
        text: "Please select a size",
        confirmButtonColor: "#000",
      });

      return;
    }

    // ================= Color Validation =================

    if (uniqueColors.length > 0 && !selectedColor) {
      Swal.fire({
        icon: "warning",
        title: "Color Required",
        text: "Please select a color",
        confirmButtonColor: "#000",
      });

      return;
    }

    // ================= Out Of Stock =================

    if (product.stockStatus === "OUT_OF_STOCK" || product.stockQuantity === 0) {
      Swal.fire({
        icon: "error",
        title: "Out of Stock",
        text: "This product is currently unavailable",
        confirmButtonColor: "#000",
      });

      return;
    }

    // ================= Add To Cart =================

    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      thumbnailImage: product.thumbnailImage,
      regularPrice: product.regularPrice,
      salePrice: product.salePrice,
      quantity,
      stockStatus: product.stockStatus,
      color: selectedColor,
      stock,
      size: selectedSize,
    });

    // ================= Redirect =================

    window.location.href = "/checkout";
  };

  return (
    <div>
      <Breadcrumb />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="w-full lg:w-[55%]">
            {images.length > 0 ? (
              <ImageGallery images={images} />
            ) : (
              <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No image</span>
              </div>
            )}
          </div>

          <div className="w-full lg:w-[45%] flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-3">
              <p className="text-2xl font-bold">
                Tk{" "}
                {product.salePrice.toLocaleString("en-BD", {
                  minimumFractionDigits: 2,
                })}
              </p>
              {hasDiscount && (
                <>
                  <p className="text-base text-gray-400 line-through">
                    Tk{" "}
                    {product.regularPrice.toLocaleString("en-BD", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                  <span className="bg-black text-white text-xs font-bold px-2 py-0.5">
                    -{discountPercent}%
                  </span>
                </>
              )}
            </div>

            <div className="mb-4">
              {isOutOfStock ? (
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-semibold shadow-lg shadow-red-500/20">
                  Out of Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                  In Stock
                </span>
              )}
            </div>

            {product.shortDescription && (
              <p className="text-sm text-gray-600 leading-relaxed max-w-md mb-6">
                {product.shortDescription}
              </p>
            )}

            <div className="flex flex-col md:flex-row gap-4 mb-2">
              {/* QUANTITY */}
              <div className="flex flex-col gap-2 mb-6">
                <label className="text-sm font-bold">Quantity</label>
                <div className="flex items-center border border-gray-300 w-32 h-11">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex-1 text-center text-sm font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => {
                      if (!selectedColor) {
                        Swal.fire({
                          icon: "warning",
                          title: "Please select a color first",
                        });
                        return;
                      }

                      if (!selectedSize) {
                        Swal.fire({
                          icon: "warning",
                          title: "Please select a size first",
                        });
                        return;
                      }

                      if (stock <= 0) {
                        Swal.fire({
                          icon: "error",
                          title: "Out of stock",
                        });
                        return;
                      }

                      setQuantity((prev) => {
                        if (prev < stock) return prev + 1;

                        Swal.fire({
                          icon: "error",
                          title: "LIMIT EXCEEDED",
                          text: `Only ${stock} item(s) available`,
                        });

                        return prev;
                      });
                    }}
                    className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {/* SIZE */}
              {uniqueSizes.length > 0 && (
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-sm font-bold">Size</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger
                      className="
                            w-full px-4 py-[22px]
                            border-2 border-gray-200
                            rounded-none
                            text-gray-900 font-medium
                            focus:ring-0 focus:border-black
                        "
                    >
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueSizes.map((size) => (
                        <SelectItem
                          key={size}
                          value={size}
                          className="py-2 px-3 text-sm"
                        >
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* COLOR */}
              {uniqueColors.length > 0 && (
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-sm font-bold">Color</label>
                  <Select
                    value={selectedColor}
                    onValueChange={setSelectedColor}
                  >
                    <SelectTrigger
                      className="
                            w-full px-4 py-[22px]
                            border-2 border-gray-200
                            rounded-none
                            text-gray-900 font-medium
                            focus:ring-0 focus:border-black
                        "
                    >
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueColors.map((color) => (
                        <SelectItem
                          key={color}
                          value={color}
                          className="py-2 px-3 text-sm"
                        >
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <div className="flex justify-between py-3 border-t border-gray-200">
              <span className="text-sm font-bold">Product Code</span>
              <span className="text-sm text-gray-500">{product.sku}</span>
            </div>

            {product.tags?.length > 0 && (
              <div className="flex justify-between items-start py-3 border-t border-gray-200">
                <span className="text-sm font-bold">Tags</span>
                <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
                  {product.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 mb-8">
              {product.sizeGuidImage && (
                <AccordionSection title="Size Guide">
                  <Image
                    src={resolveUrl(product.sizeGuidImage)}
                    alt="Size Guide"
                    width={600}
                    height={400}
                    className="w-full object-contain rounded"
                  />
                </AccordionSection>
              )}

              {product.fullDescription && (
                <AccordionSection title="Product Description">
                  <p className="text-sm leading-relaxed text-gray-700">
                    {product.fullDescription}
                  </p>
                </AccordionSection>
              )}

              {product.additionalInformation?.length > 0 && (
                <AccordionSection title="Additional Information">
                  <div className="divide-y divide-gray-100">
                    {product.additionalInformation.map((info) => (
                      <div
                        key={info.id}
                        className="flex justify-between py-2 text-sm"
                      >
                        <span className="font-medium">{info.key}</span>
                        <span className="text-gray-600">{info.value}</span>
                      </div>
                    ))}
                  </div>
                </AccordionSection>
              )}
            </div>
            <div className="py-2 md:py-0">
              <button
                onClick={() => {
                  if (!selectedColor) {
                    Swal.fire({
                      icon: "warning",
                      title: "Please select a color first",
                    });
                    return;
                  }
                  if (!selectedSize) {
                    Swal.fire({
                      icon: "warning",
                      title: "Please select a size first",
                    });
                    return;
                  }
                  if (stock === 0) {
                    Swal.fire({
                      icon: "error",
                      title: "OUT OF STOCK",
                      text: "This product is currently unavailable",
                    });
                    return;
                  }
                 

                  addToCart({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    sku: product.sku,
                    thumbnailImage: product.thumbnailImage,
                    regularPrice: product.regularPrice,
                    salePrice: product.salePrice,
                    quantity,
                    stockStatus: product.stockStatus,
                    color: selectedColor,
                    stock,
                    size: selectedSize,
                  });
                  

                   if (quantity > stock) {
                    Swal.fire({
                      icon: "error",
                      title: "LIMIT EXCEEDED",
                      text: `Only ${stock} item(s) available`,
                    });
                    return;
                  }
                }}
                disabled={isOutOfStock}
                className="flex-1 w-full md:hidden bg-black cursor-pointer text-white h-12 font-bold text-sm uppercase tracking-wide transition-colors  disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                {isOutOfStock ? "Out of Stock" : "Add to Bag"}
              </button>
            </div>
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => {
                  if (!selectedColor) {
                    Swal.fire({
                      icon: "warning",
                      title: "Please select a color first",
                    });
                    return;
                  }
                  if (!selectedSize) {
                    Swal.fire({
                      icon: "warning",
                      title: "Please select a size first",
                    });
                    return;
                  }
                  if (stock === 0) {
                    Swal.fire({
                      icon: "error",
                      title: "OUT OF STOCK",
                      text: "This product is currently unavailable",
                    });
                    return;
                  }
                 

                  addToCart({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    sku: product.sku,
                    thumbnailImage: product.thumbnailImage,
                    regularPrice: product.regularPrice,
                    salePrice: product.salePrice,
                    quantity,
                    stockStatus: product.stockStatus,
                    color: selectedColor,
                    stock,
                    size: selectedSize,
                  });
                  
                   if (quantity > stock) {
                    Swal.fire({
                      icon: "error",
                      title: "LIMIT EXCEEDED",
                      text: `Only ${stock} item(s) available`,
                    });
                    return;
                  }
                }}
                disabled={isOutOfStock}
                className={`w-full hidden md:flex-1 h-12 md:flex items-center justify-center gap-2 
              bg-black text-white font-bold text-sm uppercase tracking-wide 
              transition-colors
              ${isOutOfStock ? "cursor-not-allowed " : "cursor-pointer"}
            `}
              >
                <ShoppingBag className="w-4 h-4" />
                {isOutOfStock ? "Out of Stock" : "Add to Bag"}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="flex-1 bg-white text-black border border-black h-12 font-bold text-sm uppercase tracking-wide cursor-pointer transition-colors disabled:cursor-not-allowed  flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Buy Now
              </button>

              <button
                onClick={() => setWishlisted((p) => !p)}
                className="w-12 h-12 flex-shrink-0 flex items-center justify-center  border-black transition-colors"
                aria-label="Toggle Wishlist"
              >
                <HeartIcon
                  className={`w-5 h-5 transition-colors cursor-pointer ${
                    wishlisted ? "fill-black " : "text-black"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
