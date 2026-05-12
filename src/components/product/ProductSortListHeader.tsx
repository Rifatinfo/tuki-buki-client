"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductPageFilter from "../modules/FilterAndSearch/ProductPageFilter";

interface Props {
  total: number;
}

const SORT_OPTIONS = [
  { label: "Sort by latest", value: "createdAt_desc" },
  { label: "Sort by price: low to high", value: "salePrice_asc" },
  { label: "Sort by price: high to low", value: "salePrice_desc" },
];

const ProductSortListHeader = ({ total }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort =
    searchParams.get("sortBy") && searchParams.get("sortOrder")
      ? `${searchParams.get("sortBy")}_${searchParams.get("sortOrder")}`
      : "createdAt_desc";

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const [sortBy, sortOrder] = value.split("_");

    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    params.delete("page");

    router.push(`?${params.toString()}`);
  };

  const currentLabel =
    SORT_OPTIONS.find((opt) => opt.value === currentSort)?.label ??
    "Sort by latest";

  return (
    <div className="md:flex items-center justify-between sm:px-6 lg:px-8 mb-6 mt-30">
      {/* Left: Results count */}
      <p className="text-sm sm:text-base md:text-xl text-gray-600 whitespace-nowrap text-center mb-6 md:0">
        Showing all <span className="font-semibold">{total}</span> results
      </p>

      {/* Right: Filter + Sort together with gap-4 */}
      <div className="flex items-center ">
        <ProductPageFilter />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-sm text-sm bg-gray-50 border border-gray-200 cursor-pointer whitespace-nowrap">
              {currentLabel}
              <ChevronDown className="h-4 w-4 flex-shrink-0" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48 sm:w-56">
            {SORT_OPTIONS.map((opt) => (
              <DropdownMenuItem
                key={opt.value}
                onClick={() => handleSort(opt.value)}
                className="cursor-pointer text-sm"
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ProductSortListHeader;
