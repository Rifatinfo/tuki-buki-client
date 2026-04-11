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
// import { motion } from 'framer-motion'
// import Link from 'next/link';
// interface AllProductsProps {
//     onNavigate: (
//         page: 'home' | 'analytics' | 'products' | 'add-product' | 'orders',
//     ) => void
// }
// const mockProducts = [
//     {
//         id: 'PRD-001',
//         name: 'Premium Cotton T-Shirt',
//         code: 'TSHIRT-BLK-M',
//         category: 'Men',
//         subcategory: 'T-Shirts',
//         regularPrice: '৳1,200',
//         salePrice: '৳990',
//         stock: 145,
//         status: 'In Stock',
//         image:
//             'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80',
//     },
//     {
//         id: 'PRD-002',
//         name: 'Wireless Noise-Cancelling Headphones',
//         code: 'AUDIO-WH-01',
//         category: 'Electronics',
//         subcategory: 'Audio',
//         regularPrice: '৳15,500',
//         salePrice: '৳12,990',
//         stock: 12,
//         status: 'Low Stock',
//         image:
//             'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80',
//     },
//     {
//         id: 'PRD-003',
//         name: 'Ergonomic Office Chair',
//         code: 'FURN-CH-05',
//         category: 'Home & Garden',
//         subcategory: 'Furniture',
//         regularPrice: '৳8,500',
//         salePrice: '-',
//         stock: 0,
//         status: 'Out of Stock',
//         image:
//             'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=100&q=80',
//     },
//     {
//         id: 'PRD-004',
//         name: 'Smart Watch Gen 5',
//         code: 'ELEC-SW-05',
//         category: 'Electronics',
//         subcategory: 'Wearables',
//         regularPrice: '৳24,000',
//         salePrice: '৳21,500',
//         stock: 45,
//         status: 'In Stock',
//         image:
//             'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&q=80',
//     },
//     {
//         id: 'PRD-005',
//         name: "Women's Summer Dress",
//         code: 'DRS-SUM-S',
//         category: 'Women',
//         subcategory: 'Dresses',
//         regularPrice: '৳2,500',
//         salePrice: '৳1,800',
//         stock: 89,
//         status: 'In Stock',
//         image:
//             'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100&q=80',
//     },
//     {
//         id: 'PRD-006',
//         name: 'Mechanical Gaming Keyboard',
//         code: 'ELEC-KB-02',
//         category: 'Electronics',
//         subcategory: 'Accessories',
//         regularPrice: '৳6,500',
//         salePrice: '৳5,900',
//         stock: 23,
//         status: 'In Stock',
//         image:
//             'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100&q=80',
//     },
// ]
// const AllProducts = ({ onNavigate }: AllProductsProps) => {
//     const [searchTerm, setSearchTerm] = useState('')
//     return (
//         <div className="p-6 md:p-8 space-y-6">

//             {/* Products Table */}
//             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left border-collapse">
//                         <thead>
//                             <tr className="bg-slate-50 border-b border-slate-200">
//                                 <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
//                                     Product
//                                 </th>
//                                 <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
//                                     Category
//                                 </th>
//                                 <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
//                                     Price
//                                 </th>
//                                 <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
//                                     Stock
//                                 </th>
//                                 <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
//                                     Actions
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-slate-100">
//                             {mockProducts.map((product, index) => (
//                                 <motion.tr
//                                     initial={{
//                                         opacity: 0,
//                                         y: 10,
//                                     }}
//                                     animate={{
//                                         opacity: 1,
//                                         y: 0,
//                                     }}
//                                     transition={{
//                                         delay: index * 0.05,
//                                     }}
//                                     key={product.id}
//                                     className="hover:bg-slate-50 transition-colors group"
//                                 >
//                                     <td className="py-3 px-4">
//                                         <div className="flex items-center gap-3">
//                                             <img
//                                                 src={product.image}
//                                                 alt={product.name}
//                                                 className="w-10 h-10 rounded-lg object-cover border border-slate-200"
//                                             />
//                                             <div>
//                                                 <p className="text-sm font-bold text-slate-900">
//                                                     {product.name}
//                                                 </p>
//                                                 <p className="text-xs text-slate-500 font-mono mt-0.5">
//                                                     {product.code}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className="py-3 px-4">
//                                         <p className="text-sm font-medium text-slate-700">
//                                             {product.category}
//                                         </p>
//                                         <p className="text-xs text-slate-500">
//                                             {product.subcategory}
//                                         </p>
//                                     </td>
//                                     <td className="py-3 px-4">
//                                         <p className="text-sm font-bold text-slate-900">
//                                             {product.salePrice !== '-'
//                                                 ? product.salePrice
//                                                 : product.regularPrice}
//                                         </p>
//                                         {product.salePrice !== '-' && (
//                                             <p className="text-xs text-slate-400 line-through">
//                                                 {product.regularPrice}
//                                             </p>
//                                         )}
//                                     </td>
//                                     <td className="py-3 px-4">
//                                         <div className="flex flex-col items-start gap-1">
//                                             <span
//                                                 className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${product.status === 'In Stock' ? 'bg-emerald-100 text-emerald-700' : product.status === 'Low Stock' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}
//                                             >
//                                                 {product.status}
//                                             </span>
//                                             <span className="text-xs text-slate-500 font-medium">
//                                                 {product.stock} units
//                                             </span>
//                                         </div>
//                                     </td>
//                                     <td className="py-3 px-4 text-right">
//                                         <div className="flex items-center justify-end gap-2  transition-opacity">
//                                             <button
//                                                 className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
//                                                 title="View"
//                                             >
//                                                 <Eye className="w-4 h-4" />
//                                             </button>
//                                             <button
//                                                 className="p-1.5 text-slate-400 hover:text-[#FF5000] hover:bg-orange-50 rounded-md transition-colors cursor-pointer"
//                                                 title="Edit"
//                                             >
//                                                 <Edit className="w-4 h-4" />
//                                             </button>
//                                             <button
//                                                 className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
//                                                 title="Delete"
//                                             >
//                                                 <Trash2 className="w-4 h-4" />
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </motion.tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
//                     <span>Showing 1 to 6 of 24 entries</span>
//                     <div className="flex gap-1">
//                         <button className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-50">
//                             Prev
//                         </button>
//                         <button className="px-3 py-1 border border-slate-200 rounded bg-[#FF5000] text-white font-medium">
//                             1
//                         </button>
//                         <button className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50">
//                             2
//                         </button>
//                         <button className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50">
//                             3
//                         </button>
//                         <button className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50">
//                             Next
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AllProducts;

import CustomTable from "@/components/table/CustomTable";
import ProductTableHeader from "@/components/table/ProductTableHeader";
import ProductRow from "@/components/table/ProductRow";
import TablePagination from "@/components/shared/pagination/TablePagination";
import { getProducts } from "@/services/product/getProducts";
import { queryStringFormatter } from "@/lib/formatters";
import Link from 'next/link';


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
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search products by name or SKU..."
            
                            
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5000]/30 focus:border-[#FF5000] transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors w-full md:w-auto justify-center">
                            <Filter className="w-4 h-4" /> Category
                            <ChevronDown className="w-3 h-3 ml-1 text-slate-400" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors w-full md:w-auto justify-center">
                            Sort by: Newest
                            <ChevronDown className="w-3 h-3 ml-1 text-slate-400" />
                        </button>
                    </div>
                </div>

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