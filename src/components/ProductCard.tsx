import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/entity";
import { useCart } from "@/contexts/CartContext";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const ProductCard = (product: Product) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <Card className="overflow-hidden">
      <AspectRatio ratio={1} className="overflow-hidden">
        <img src={product.image} alt="Product" className="h-full w-full object-cover" />
      </AspectRatio>
      <CardContent className="p-2">
        <CardTitle className="text-xl text-center">{product.name}</CardTitle>
        <div className="text-base text-center">{product.price} VND</div>
        <div className="flex justify-center">
          <Button onClick={handleAddToCart}>Add to cart</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
