// "use client";
// import { useState } from 'react'
import {
    Search,
    Plus,
    Filter,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    ChevronDown,
} from 'lucide-react'


import CustomTable from "@/components/table/CustomTable";
import ProductTableHeader from "@/components/table/ProductTableHeader";
import ProductRow from "@/components/table/ProductRow";
import TablePagination from "@/components/shared/pagination/TablePagination";
import { getProducts } from "@/services/product/getProducts";
import { queryStringFormatter } from "@/lib/formatters";
import Link from 'next/link';
import ProductFilters from '@/components/modules/FilterAndSearch/ProductFilters';


const ProductsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    // Fetch products server-side
    const productsResult = await getProducts(queryString);

    const products = productsResult?.data ?? [];
    const totalPages = Math.ceil(
        (productsResult?.meta?.total || 1) / (productsResult?.meta?.limit || 1)
    );

    return (
        <div className="p-6 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900">All Products</h1>
                            <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
                                {products.length} items
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm mt-1">
                            Manage your product inventory and pricing
                        </p>
                    </div>
                    <Link href="/dashboard/addProduct">
                        <button

                            className="flex items-center gap-2 px-4 py-2 bg-[#FF5000] text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors shadow-sm shadow-orange-500/20 cursor-pointer"
                        >
                            <Plus className="w-4 h-4" /> Add Product
                        </button>
                    </Link>
                </div>

                {/* Filters & Search */}
                <ProductFilters/>

                <CustomTable
                    headers={<ProductTableHeader />}
                    footer={
                        <TablePagination
                            currentPage={productsResult?.meta?.page || 1}
                            totalPages={totalPages}
                            totalItems={productsResult?.meta?.total || 0}
                            limit={productsResult?.meta?.limit || 10}
                        />
                    }
                >
                    {products.map((product: any, index: number) => (
                        <ProductRow
                            key={product.id}
                            product={product}
                            index={index}
                        />
                    ))}
                </CustomTable>
            </div>
        </div>
    );
};

export default ProductsPage;