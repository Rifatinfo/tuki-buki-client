
interface PageProps {
  params: Promise<{
    category: string;
    subCategory: string;
    slug: string;
  }>;
}

const ProductDetailsPage = async ({ params }: PageProps) => {
  

  return (
    <div>

    </div>
  );
};

export default ProductDetailsPage;
