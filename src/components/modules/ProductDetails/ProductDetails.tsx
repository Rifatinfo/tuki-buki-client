"use client";
import { useState } from "react";
import { HeartIcon, MapPinIcon } from "lucide-react";
import { ImageGallery } from "./ImageGallery";
import { AccordionSection } from "./AccordionSection";

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
  "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975767/0430000121008_zq6vso.webp",
  "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975765/0660000105903_uwcy9g.webp",
  "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975763/0550000165231_fmdfjm.webp",
];
const PRODUCT_PRICE = 4367.44;
const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleAddToBag = () => {
    setIsCartOpen(true);
  };
  const productData = {
    name: "White Embroidered Addi Cotton Panjabi",
    image: PRODUCT_IMAGES[0],
    price: PRODUCT_PRICE,
    quantity,
    size: selectedSize,
    color: selectedColor,
  };
  return (
    <>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left Column: Image Gallery */}
          <div className="w-full lg:w-[55%]">
            <ImageGallery images={PRODUCT_IMAGES} />
          </div>

          {/* Right Column: Product Info */}
          <div className="w-full lg:w-[45%] flex flex-col">
            {/* Title & Price */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              White Embroidered Addi Cotton Panjabi
            </h1>
            <p className="text-xl text-gray-900 mb-4">Tk 4,367.44</p>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mb-4">
              White Embroidered Adi Cotton Panjabi original perfect
            </p>
            {/* Quantity & Dropdowns */}
            <div className="space-y-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Quantity */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-900">
                    Quantity
                  </label>
                  <div className="flex items-center border border-gray-300 w-32 h-11">
                    <button
                      onClick={decrementQuantity}
                      className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center text-sm font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Size & Color Dropdowns */}
                <div className="grid grid-cols-2 gap-4 flex-1">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-900">
                      Size
                    </label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="border border-gray-300 h-11 px-3 text-sm text-gray-700 bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Choose an Option...</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-900">
                      Color
                    </label>
                    <select
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="border border-gray-300 h-11 px-3 text-sm text-gray-700 bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Choose an Option...</option>
                      <option value="White">White</option>
                      <option value="Off-White">Off-White</option>
                      <option value="Cream">Cream</option>
                      <option value="Beige">Beige</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Code */}
            <div className="flex justify-between items-center py-4 border-t border-gray-200">
              <span className="text-sm font-bold text-gray-900">
                Product Code
              </span>
              <span className="text-sm text-gray-600">15E230360454</span>
            </div>

            {/* Accordions */}
            <div className="mb-8">
              <AccordionSection title="Size Guide">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-2 font-medium">Size</th>
                        <th className="py-2 font-medium">Chest (in)</th>
                        <th className="py-2 font-medium">Length (in)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">S</td>
                        <td className="py-2">38</td>
                        <td className="py-2">40</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">M</td>
                        <td className="py-2">40</td>
                        <td className="py-2">42</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">L</td>
                        <td className="py-2">42</td>
                        <td className="py-2">44</td>
                      </tr>
                      <tr>
                        <td className="py-2">XL</td>
                        <td className="py-2">44</td>
                        <td className="py-2">46</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </AccordionSection>

              <AccordionSection title="Product Description">
                <p className="leading-relaxed">
                  Elevate your ethnic wardrobe with this exquisite White
                  Embroidered Addi Cotton Panjabi. Crafted from premium
                  breathable cotton, it features intricate embroidery along the
                  shoulder and chest, blending traditional craftsmanship with
                  contemporary elegance. Perfect for festive occasions,
                  weddings, and cultural celebrations.
                </p>
                <ul className="list-disc pl-5 mt-4 space-y-1">
                  <li>Material: 100% Addi Cotton</li>
                  <li>Fit: Regular Fit</li>
                  <li>Care: Dry clean recommended</li>
                </ul>
              </AccordionSection>

              <AccordionSection title="Reviews">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {"★★★★★".split("").map((star, i) => (
                        <span key={i}>{star}</span>
                      ))}
                    </div>
                    <span className="text-sm font-medium">5.0 out of 5</span>
                  </div>
                  <p className="text-sm italic">
                    Excellent quality and perfect fit. The embroidery details
                    are stunning in person. - Verified Buyer
                  </p>
                </div>
              </AccordionSection>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={handleAddToBag}
                className="flex-[0.45] bg-black text-white h-12 font-bold text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors"
              >
                ADD TO BAG
              </button>
              <button className="flex-[0.45] bg-white text-black border border-black h-12 font-bold text-sm uppercase tracking-wide hover:bg-gray-50 transition-colors">
                SHOP NOW
              </button>
              <button
                className="flex-[0.1] h-12 flex items-center justify-center hover:bg-gray-50 transition-colors group"
                aria-label="Add to Wishlist"
              >
                <HeartIcon className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      {/* <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        product={productData}
      /> */}
    </>
  );
};

export default ProductDetails;
