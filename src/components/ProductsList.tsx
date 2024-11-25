import { Product } from "@/types/entity";
import ProductCard from "@/components/ProductCard";

type Props = {
  products: Product[];
};

const ProductsList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductsList;
