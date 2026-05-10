
//================= Category Service =================//
export const fetchProductsByCategory = async (category: string, searchParams: Promise<{ page?: string; limit?: string; sortBy?: string; sortOrder?: string }>) => {
    const sp = await searchParams
    const query = new URLSearchParams({
        category,
        ...(sp.page && { page: sp.page }),
        ...(sp.limit && { limit: sp.limit }),
        ...(sp.sortBy && { sortBy: sp.sortBy }),
        ...(sp.sortOrder && { sortOrder: sp.sortOrder }),
    }).toString()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/product?${query}`, {
        cache: "no-store",
    });
    return res.json();

};
//================= Sub-Category Service =================//
export const fetchProductsBySubCategory = async (subCategory: string, searchParams: Promise<{ page?: string; limit?: string; sortBy?: string; sortOrder?: string }>) => {
    const sp = await searchParams
    const query = new URLSearchParams({
        subCategory,
        ...(sp.page && { page: sp.page }),
        ...(sp.limit && { limit: sp.limit }),
        ...(sp.sortBy && { sortBy: sp.sortBy }),
        ...(sp.sortOrder && { sortOrder: sp.sortOrder }),
    }).toString()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/product?${query}`, {
        cache: "no-store",
    });
    return res.json();
};

