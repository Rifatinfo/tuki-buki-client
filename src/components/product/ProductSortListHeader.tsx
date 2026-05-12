"use client";

import ProductPageFilter from "../modules/FilterAndSearch/ProductPageFilter";

interface Props {
  total: number;
}

const ProductSortListHeader = ({ total }: Props) => {
  return (
    <div className="flex justify-between gap-4 sm:gap-0 px-2  lg:px-8 mb-6 mt-30">
      
      {/* Left: Results count */}
      <p className="text-sm sm:text-base text-gray-600 whitespace-nowrap text-center sm:text-left">
        Showing all{" "}
        <span className="font-semibold">{total}</span> results
      </p>

      {/* Right: Filter */}
      <div className="flex justify-center sm:justify-end">
        <ProductPageFilter />
      </div>
    </div>
  );
};

export default ProductSortListHeader;