// src/pages/CartPage/CartPage.tsx

import React from "react";
import { useCart } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartItem, clearCart, getCartTotal } =
    useCart();

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateCartItem(productId, quantity);
  };

  return (
    <div className="cart-page max-w-screen-xl mx-auto">
      <h1 className="text-center text-2xl font-bold my-2">Giỏ Hàng</h1>
      {cart.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div className="flex flex-col md:flex-row justify-evenly">
          <ul className="cart-items flex flex-col gap-2">
            {cart.map((item) => (
              <li
                key={item._id}
                className="h-[120px] w-[720px] max-w-full flex border rounded-lg items-center"
              >
                <div className="w-[120px] overflow-hidden">
                  <img
                    className="object-cover"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <div className="cart-item-details flex-1 p-2">
                  <p className="text-xl font-bold">{item.name}</p>
                  <p> {item.price.toFixed(2)} VNĐ</p>
                </div>
                <div className="w-[60px] mr-2">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item._id,
                        parseInt(e.target.value, 10)
                      )
                    }
                    className="w-full"
                  />
                  <Button
                    onClick={() => removeFromCart(item._id)}
                    variant={"destructive"}
                    className="w-full mt-1"
                  >
                    Xoá
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <Card className="px-10">
            <CardHeader>
              <CardTitle className="text-xl">Thanh toán</CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="font-bold">
                Tổng: {getCartTotal().toFixed(0)} VNĐ
              </h2>
            </CardContent>
            <CardFooter>
              <div className="flex gap-1">
                <Button
                  variant={"destructive"}
                  onClick={clearCart}
                  className="clear-cart-button"
                >
                  Xoá tất cả
                </Button>
                <Button className="bg-green-500 hover:bg-green-400">
                  Thanh toán
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CartPage;
