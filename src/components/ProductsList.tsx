import { Product } from "@/types/entity";
import ProductCard from "@/components/ProductCard";
import SingularProductDialog from "@/components/SingularProductDialog";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

type Props = {
  products: Product[];
};

const ProductsList = ({ products }: Props) => {
  const { addToCart } = useCart();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          onSelected={(product) => handleSelectProduct(product)}
        />
      ))}
      <SingularProductDialog
        product={selectedProduct!}
        open={open}
        onClose={() => setOpen(false)}
        onAddToCart={(product, quantity) => {
          addToCart(product, quantity);
        }}
      />
    </div>
  );
};

export default ProductsList;
