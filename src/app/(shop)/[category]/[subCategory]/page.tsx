/* eslint-disable @typescript-eslint/no-explicit-any */


import NotFoundsvg from "@/components/notFound/NotFoundsvg";
import ProductSorting from "@/components/product/ProductListHeader";
import TablePagination from "@/components/shared/pagination/TablePagination";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { getSubCategories } from "@/services/product/getCategories";
import { fetchProductsBySubCategory } from "@/services/product/productData";

import Link from "next/link";
import { Suspense } from "react";

export interface PageProps {
    params: Promise<{
        category: string;
        subCategory: string;
    }>;
    searchParams: Promise<{
        page?: string;
        limit?: string;
        sortBy?: string;
        sortOrder?: string;
    }>
}

const SubCategoryPage = async ({ params, searchParams }: PageProps) => {
    const { category, subCategory } = await params;
    console.log("Category:", category);
    console.log("SubCategory:", subCategory);
    const subCategoryRes = await getSubCategories();
    const subCategories = subCategoryRes?.data || [];

    const subCategoryId = subCategories.find(
        (sc: any) => sc.name.toLowerCase() === subCategory.toLowerCase()
    )?.id;


    if (!subCategoryId) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-gray-100 rounded-full p-6 mb-6 mt-20">
                    <NotFoundsvg/>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    SubCategory Not Found
                </h3>

                <p className="text-sm text-gray-500 max-w-md">
                    The subcategory "{subCategory}" does not exist.
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

    const response = await fetchProductsBySubCategory(subCategoryId, searchParams);
    console.log("Response : ", response);
    
    const products = response?.data ?? [];
    const total = response?.meta?.total ?? 0;
    const limit = Number(response?.meta?.limit) || 12;
    const currentPage = Number(response?.meta?.page) || 1;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    return (
        <div>
            <div className="space-y-6">
                
                <ProductSorting total={total} />

                {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-gray-100 rounded-full p-6 mb-6">
                           <NotFoundsvg/>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            No Products Found
                        </h3>

                        <p className="text-sm text-gray-500 max-w-md">
                            We couldn't find any products in this subcategory right now.
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
                                <ProductCard key={product.id} product={product} category={subCategory} subCategory={subCategory} index={0} />
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

export default SubCategoryPage;