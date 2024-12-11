import { Product } from "@/types/entity";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { calculateDiscountPrice, formatPrice } from "@/utils/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Props = {
  product: Product;
  open: boolean;
  onClose: () => void;
  onAddToCart? : (product: Product, quantity: number) => void;
};

const SingularProductDialog = ({ product, open, onClose, onAddToCart }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-screen-lg min-h-[400px] px-4">
        <div className="flex flex-col md:flex-row gap-4 my-auto">
          <img
            src={product.imageUrl}
            alt="Product"
            className="h-[350px] w-[350px] object-cover rounded-lg"
          />
          <div className="flex-1">
            <div className="flex flex-col space-y-8">
              <div>
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <DialogDescription>{product.description}</DialogDescription>
              </div>
              <div className="text-xl font-semibold">
                {product.discount ? (
                  <div>
                    <div className="line-through mr-2 text-sm text-red-600">
                      {formatPrice(product.price)}
                    </div>

                    {formatPrice(
                      calculateDiscountPrice(product.price, product.discount)
                    )}
                    <span className="text-white bg-red-500 text-sm ml-1 rounded p-1">
                      -{product.discount}%
                    </span>
                  </div>
                ) : (
                  <div>{formatPrice(product.price)}</div>
                )}
              </div>
              <Separator />
              <div className="flex gap-2 justify-end">
                <Input
                  value={quantity}
                  onChange={(e) => setQuantity(+e.target.value)}
                  className="basis-16"
                  type="number"
                  max={99}
                  min={1}
                  defaultValue={1}
                />
                <Button
                  onClick={() => {
                    onAddToCart?.(product, quantity);
                  }}
                  disabled={product.views === 0}
                >
                  <ShoppingCartIcon size={24} />
                  <span className="ml-2">
                    {product.views === 0 ? "Tạm hết hàng" : "Thêm vào giỏ hàng"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SingularProductDialog;
