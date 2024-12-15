import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/entity";
import { useCart } from "@/contexts/CartContext";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { calculateDiscountPrice, formatPrice } from "@/utils/utils";

type Props = {
  product: Product;
  onSelected?: (product: Product) => void;
};

const ProductCard = ({ product, onSelected }: Props) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <Card className="overflow-hidden">
      <AspectRatio
        ratio={1}
        className="overflow-hidden cursor-pointer"
        onClick={() => onSelected && onSelected(product)}
      >
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
            <p className="line-through mr-2 text-sm text-red-600">
              {formatPrice(product.price)}
            </p>
            <p>
              {formatPrice(
                calculateDiscountPrice(product.price, product.discount)
              )}
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="pt-4">{formatPrice(product.price)}</p>
          </div>
        )}

        <div className="flex justify-center">
          <Button
            disabled={product.views === 0}
            size="sm"
            onClick={handleAddToCart}
          >
            {product.views === 0 ? "Tạm hết hàng" : "Thêm vào giỏ"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
