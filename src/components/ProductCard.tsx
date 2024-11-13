import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/entity";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const ProductCard = (product: Product) => {
  return (
    <Card className="overflow-hidden">
      <AspectRatio ratio={1}>
        <img
          src="https://dytbw3ui6vsu6.cloudfront.net/media/catalog/product/resize/914x914/ADLV/ADLV-23SS-ZPLBSN-BLK-002.webp"
          alt="Product"
        />
      </AspectRatio>
      <CardContent className="p-2">
        <CardTitle className="text-xl text-center">{product.name}</CardTitle>
        <div className="text-base text-center">{product.price} VND</div>
        <div className="flex justify-center">
          <Button>Add to cart</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
