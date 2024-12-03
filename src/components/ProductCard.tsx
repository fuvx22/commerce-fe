import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/entity";
import { useCart } from "@/contexts/CartContext";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { calculateDiscountPrice } from "@/utils/utils";

const ProductCard = (product: Product) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Card className="overflow-hidden">
      <AspectRatio ratio={1} className="overflow-hidden">
        {!!product.discount && (
          <div
            className="absolute top-1 right-0 bg-red-500 text-white py-1 px-2 font-semibold
            rounded-l-md
          "
          >
            -{product.discount}%
          </div>
        )}
        <img
          src={product.imageUrl}
          alt="Product"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
      <CardContent className="p-2 space-y-1">
        <CardTitle className="text-center">{product.name}</CardTitle>
        {product.discount ? (
          <div className="text-center">
            <span className="line-through mr-2 text-sm text-red-600">
              {formatPrice(product.price)}
            </span>
            {formatPrice(
              calculateDiscountPrice(product.price, product.discount)
            )}
          </div>
        ) : (
          <div className="text-center">{formatPrice(product.price)}</div>
        )}

        <div className="flex justify-center">
          <Button size="sm" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
