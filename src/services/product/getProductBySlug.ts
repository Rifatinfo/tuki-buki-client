import { serverFetch } from "@/lib/server-fetch";
import { Product, ProductApiResponse } from "@/types/product";

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  try {
    const res = await serverFetch.get(
      `/api/v1/product/?slug=${encodeURIComponent(slug)}&limit=1`
    );

    const result: ProductApiResponse = await res.json();

    if (!result.success || !result.data?.length) {
      return null;
    }

    return result.data[0];
  } catch (error: any) {
    console.error("[getProductBySlug]", error);

    return null;
  }
}