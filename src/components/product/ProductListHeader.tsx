import ProductSortListHeader from "./ProductSortListHeader";


interface Props {
  total: number;
}

const ProductSorting = ({ total }: Props) => {
  return <ProductSortListHeader total={total} />;
};

export default ProductSorting;