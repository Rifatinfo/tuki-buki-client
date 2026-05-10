// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useTransition } from "react";

// interface TablePaginationProps {
//   currentPage: number;
//   totalPages: number;
//   totalItems?: number;
//   limit?: number;
// }

// const TablePagination = ({
//   currentPage,
//   totalPages,
//   totalItems = 0,
//   limit = 10,
// }: TablePaginationProps) => {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();
//   const searchParams = useSearchParams();

//   const navigateToPage = (newPage: number) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("page", newPage.toString());

//     startTransition(() => {
//       router.push(`?${params.toString()}`);
//     });
//   };

//   const pagesToShow = () => {
//     const pages: (number | string)[] = [];

//     if (totalPages <= 7) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//       return pages;
//     }

//     pages.push(1);

//     if (currentPage > 4) pages.push("...");

//     const start = Math.max(2, currentPage - 1);
//     const end = Math.min(totalPages - 1, currentPage + 1);

//     for (let i = start; i <= end; i++) pages.push(i);

//     if (currentPage < totalPages - 3) pages.push("...");

//     pages.push(totalPages);

//     return pages;
//   };

//   //  Calculate "Showing X to Y of Z"
//   const start = (currentPage - 1) * limit + 1;
//   const end = Math.min(currentPage * limit, totalItems);

//   return (
//     <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
      
//       {/* EXACT SAME TEXT */}
//       <span>
//         Showing {start} to {end} of {totalItems} entries
//       </span>

//       <div className="flex gap-1">
        
//         {/* Prev */}
//         <button
//           onClick={() => navigateToPage(currentPage - 1)}
//           disabled={currentPage <= 1 || isPending}
//           className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
//         >
//           Prev
//         </button>

//         {/* Pages */}
//         {pagesToShow().map((page, idx) =>
//           page === "..." ? (
//             <span
//               key={idx}
//               className="px-3 py-1"
//             >
//               ...
//             </span>
//           ) : (
//             <button
//               key={page}
//               onClick={() => navigateToPage(page as number)}
//               className={`px-3 py-1 border border-slate-200 rounded cursor-pointer ${
//                 page === currentPage
//                   ? "bg-[#FF5000] text-white font-medium"
//                   : "bg-white hover:bg-slate-50"
//               }`}
//             >
//               {page}
//             </button>
//           )
//         )}

//         {/* Next */}
//         <button
//           onClick={() => navigateToPage(currentPage + 1)}
//           disabled={currentPage === totalPages || isPending}
//           className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 cursor-pointer"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TablePagination;

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

  //  Calculate "Showing X to Y of Z"
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalItems);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        
        {/* Showing text */}
        <div className="text-sm text-gray-600 font-medium order-2 sm:order-1">
          Showing <span className="text-[#FF5000] font-semibold">{start}</span> to{" "}
          <span className="text-[#FF5000] font-semibold">{end}</span> of{" "}
          <span className="text-gray-900 font-semibold">{totalItems}</span> entries
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-1.5 order-1 sm:order-2">
          
          {/* Previous Button */}
          <button
            onClick={() => navigateToPage(currentPage - 1)}
            disabled={currentPage <= 1 || isPending}
            className="group relative px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border-2 border-gray-200 bg-white hover:border-[#FF5000] hover:bg-gradient-to-r hover:from-[#FF5000]/5 hover:to-transparent disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:bg-white transition-all duration-200 cursor-pointer"
          >
            <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 group-hover:text-[#FF5000] transition-colors">
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Prev</span>
            </span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {pagesToShow().map((page, idx) =>
              page === "..." ? (
                <span
                  key={idx}
                  className="px-2 sm:px-3 py-2 text-gray-400 font-medium select-none"
                >
                  •••
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => navigateToPage(page as number)}
                  disabled={isPending}
                  className={`
                    min-w-[36px] sm:min-w-[44px] h-9 sm:h-11 px-2 sm:px-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 cursor-pointer
                    ${
                      page === currentPage
                        ? "bg-gradient-to-br from-[#FF5000] to-[#FF6B35] text-white shadow-lg shadow-[#FF5000]/30 scale-105 ring-2 ring-[#FF5000]/20"
                        : "bg-white border-2 border-gray-200 text-gray-700 hover:border-[#FF5000] hover:text-[#FF5000] hover:bg-gradient-to-r hover:from-[#FF5000]/5 hover:to-transparent"
                    }
                  `}
                >
                  {page}
                </button>
              )
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={() => navigateToPage(currentPage + 1)}
            disabled={currentPage === totalPages || isPending}
            className="group relative px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border-2 border-gray-200 bg-white hover:border-[#FF5000] hover:bg-gradient-to-l hover:from-[#FF5000]/5 hover:to-transparent disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:bg-white transition-all duration-200 cursor-pointer"
          >
            <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 group-hover:text-[#FF5000] transition-colors">
              <span className="hidden sm:inline">Next</span>
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {isPending && (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#FF5000] font-medium">
          <div className="w-4 h-4 border-2 border-[#FF5000] border-t-transparent rounded-full animate-spin"></div>
          Loading...
        </div>
      )}
    </div>
  );
};

export default TablePagination;