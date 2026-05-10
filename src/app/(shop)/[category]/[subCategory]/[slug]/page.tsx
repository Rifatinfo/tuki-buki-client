import ProductDetails from "@/components/modules/ProductDetails/ProductDetails";

interface PageProps {
  params: Promise<{
    category: string;
    subCategory: string;
    slug: string;
  }>;
}

const ProductDetailsPage = async ({ params }: PageProps) => {
  const { slug, category, subCategory, } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/slug/${slug}`,
    {
      cache: "no-store",
    }
  );


  const json = await res.json();
  const product = json.data;
  
  console.log("ProductDetailsPage", product);
  return <ProductDetails  product={product} category={category} subCategory={subCategory} />;
};

export default ProductDetailsPage;