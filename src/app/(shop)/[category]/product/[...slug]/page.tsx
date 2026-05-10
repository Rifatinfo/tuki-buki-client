
interface ProductDetailsPageProps {
    params: Promise<{
        category: string;
        slug: string[]; // catch-all
    }>;
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
    
    
    return (
        <div>
            
        </div>
    );

}

export default ProductDetailsPage;
