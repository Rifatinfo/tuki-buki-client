import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug } from "@/services/product/getProductBySlug";
import ProductDetails from "@/components/modules/ProductDetails/ProductDetails";

interface PageProps {
  params: Promise<{
    category: string;
    subCategory: string;
    slug: string;
  }>;
}


const ProductDetailsPage = async ({ params }: PageProps) => {
  const { category, subCategory, slug } = await params;
  const product = await getProductBySlug(slug);
  console.log("ProductDetailsPage .... ", product);
  let productSlug: string;

    if (slug.length === 1) {
        // /women/product/jacket-1
        productSlug = slug[0];
    } else {
        // /women/product/winter/jacket-1
        productSlug = slug[1];
    }
  if (!product) notFound();

  return (
    <div className="mt-20">
      <ProductDetails
        product={product}
        category={category}
        subCategory={subCategory}
      />
    </div>
  );
};

export default ProductDetailsPage;