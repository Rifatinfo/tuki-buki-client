
/* eslint-disable @typescript-eslint/no-explicit-any */

import NotFoundsvg from "@/components/notFound/NotFoundsvg";
import ProductSorting from "@/components/product/ProductListHeader";
import TablePagination from "@/components/shared/pagination/TablePagination";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { getCategories } from "@/services/product/getCategories";
import { fetchProductsByCategory } from "@/services/product/productData";

import Link from "next/link";
import { Suspense } from "react";

export interface PageProps {
    params: Promise<{
        category: string
    }>;
    searchParams: Promise<{
        page?: string;
        limit?: string;
        sortBy?: string
        sortOrder?: string
    }>
}


const CategoryPage = async ({ params, searchParams }: PageProps) => {
    const { category } = await params;
    
    const categoryRes = await getCategories();
    const categories = categoryRes?.data || [];

    const categoryId = categories.find(
        (c: any) => c.name.toLowerCase() === category.toLowerCase()
    )?.id;

    if (!categoryId) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-gray-100 rounded-full p-6 mb-6 mt-30">
                      <NotFoundsvg/>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Category Not Found
                </h3>

                <p className="text-sm text-gray-500 max-w-md">
                    The category "{category}" does not exist.
                </p>

                <Link href="/">
                    <button
                        className="cursor-pointer mt-6 px-6 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
                    >
                        Go Back
                    </button>
                </Link>
            </div>
        );
    }


    const response = await fetchProductsByCategory(categoryId, searchParams);
    // console.log("Response : ", response);
    
    const products = response?.data ?? [];
    const total = response?.meta?.total ?? 0;
    const limit = Number(response?.meta?.limit) || 12;
    const currentPage = Number(response?.meta?.page) || 1;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    return (
        <div className="mt-30">
            <div className="space-y-6">
                
                <ProductSorting total={total} />

                {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center  text-center ">
                        <div className="rounded-full p-6 mb-6 ">
                            <NotFoundsvg/>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            No Products Found
                        </h3>

                        <p className="text-sm text-gray-500 max-w-md">
                            We couldn't find any products in this category right now.
                            Try exploring other categories or check back later.
                        </p>

                        <Link href="/">
                            <button
                                className="cursor-pointer mt-6 px-6 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
                            >
                                Go Back
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4">
                        {products.map((product: any) => (
                            <ProductCard key={product.id} product={product} category={category} index={0} />
                        ))}
                    </div>
                    </div>
                )}
            </div>

            <div>
                <Suspense fallback={null}>
                    <TablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                </Suspense>
            </div>
        </div>
    );
};


export default CategoryPage;