"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  limit?: number;
}

const TablePagination = ({
  currentPage,
  totalPages,
  totalItems = 0,
  limit = 10,
}: TablePaginationProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const pagesToShow = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (currentPage > 4) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 3) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  // ✅ Calculate "Showing X to Y of Z"
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalItems);

  return (
    <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
      
      {/* EXACT SAME TEXT */}
      <span>
        Showing {start} to {end} of {totalItems} entries
      </span>

      <div className="flex gap-1">
        
        {/* Prev */}
        <button
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={currentPage <= 1 || isPending}
          className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>

        {/* Pages */}
        {pagesToShow().map((page, idx) =>
          page === "..." ? (
            <span
              key={idx}
              className="px-3 py-1"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => navigateToPage(page as number)}
              className={`px-3 py-1 border border-slate-200 rounded cursor-pointer ${
                page === currentPage
                  ? "bg-[#FF5000] text-white font-medium"
                  : "bg-white hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={currentPage === totalPages || isPending}
          className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TablePagination;