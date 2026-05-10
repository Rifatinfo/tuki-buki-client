"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

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
    }

    const currentLabel =
        SORT_OPTIONS.find((opt) => opt.value === currentSort)?.label ??
        "Sort by latest";


    return (
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between mb-6 px-4 sm:px-6 lg:px-8">

            {/* Left */}
            <p className="text-xl text-gray-600 text-center  md:text-left">
                Showing all <span className="font-semibold">{total}</span> results
            </p>

            {/* Right */}
            <div className="flex justify-center md:justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 px-6 py-3 rounded-sm text-sm bg-gray-50 border-none cursor-pointer">
                            {currentLabel}
                            <ChevronDown className="h-4 w-4" />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56">
                        {SORT_OPTIONS.map((opt) => (
                            <DropdownMenuItem
                                key={opt.value}
                                onClick={() => handleSort(opt.value)}
                                className="cursor-pointer"
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