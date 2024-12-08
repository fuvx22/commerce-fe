// src/pages/CartPage/CartPage.tsx

import React, { useEffect } from "react";
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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { calculateDiscountPrice, formatPrice } from "@/utils/utils";
import {
  useCheckoutInvoice,
  getInvoiceStatusList,
  useOrderInvoice,
} from "@/apis/invoiceAPI";
import { CartItems } from "@/types/entity";
import LoadingPanel from "@/components/LoadingPanel";
import { useShowToast } from "@/utils/toast";
import OrderForm, { OrderFormData } from "@/components/forms/OrderForm";
import LoadingButton from "@/components/LoadingButton";
import { useAuth } from "@/auth/authContext";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartItem, clearCart, getCartTotal } =
    useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { checkoutInvoice, isLoading } = useCheckoutInvoice();
  const { orderInvoice, isLoading: isOdering } = useOrderInvoice();
  const { showToast } = useShowToast();
  const [changeTab, setChangeTab] = React.useState<string>("checkout");
  const cartItemsRef = React.useRef<{
    cartItems: CartItems;
    shippingFee: number;
    totalAmount: number;
  } | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  // useEffect(() => {
  //   getInvoiceStatusList().then((data) => console.log("Invoice status:", data));
  // }, []);

  const handleQuantityChange = (
    productId: string,
    quantity: number,
    stock: number
  ) => {
    updateCartItem(productId, quantity, stock);
  };

  const handleCheckout = async () => {
    const cartItems = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      discount: item.discount,
      productName: item.name,
    }));
    const res = await checkoutInvoice(cartItems as CartItems);
    cartItemsRef.current = res;
    console.log("Checkout response:", cartItemsRef.current);

    if (res) {
      setChangeTab("payment");
    } else {
      showToast(
        "Đặt hàng thất bại!",
        "Đã có lỗi xảy ra, vui lòng thử lại sau",
        "destructive"
      );
    }
  };

  const handleSubmitOrder = async (data: OrderFormData) => {
    if (cartItemsRef.current) {
      const res = await orderInvoice({
        address: data.address,
        paymentMethod: Number(data.paymentMethod),
        note: data.note ?? "",
        totalAmount: cartItemsRef.current.totalAmount,
        cartItems: cartItemsRef.current.cartItems,
      });

      if (res) {
        showToast("Đặt hàng thành công!", "Cảm ơn bạn đã mua hàng", "success");
        setChangeTab("feedback");
        clearCart();
      } else {
        showToast(
          "Đặt hàng thất bại!",
          "Đã có lỗi xảy ra, vui lòng thử lại sau",
          "destructive"
        );
      }
    }
  };

  if (isLoading) {
    return <LoadingPanel />;
  }

  return (
    <div className="cart-page max-w-screen-xl mx-auto">
      <Tabs
        defaultValue="checkout"
        value={changeTab}
        onValueChange={setChangeTab}
        className="w-full"
      >
        <TabsContent value="checkout">
          <h1 className="text-center text-2xl font-bold my-2">Giỏ Hàng</h1>
          {cart.length === 0 ? (
            <p>Giỏ hàng của bạn đang trống.</p>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 md:gap-6">
              <ul className="cart-items flex flex-col gap-2 flex-1">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="h-[120px] flex border rounded-lg items-center overflow-hidden"
                  >
                    <div className="w-[120px] h-full">
                      <img
                        className="max-w-full h-full object-cover m-auto"
                        src={item.imageUrl}
                        alt={item.name}
                      />
                    </div>
                    <div className="flex-1 self-start p-4">
                      <p className="text-xl">{item.name}</p>
                      {item.discount ? (
                        <span>
                          <p className="line-through text-gray-500 text-sm">
                            {formatPrice(item.price)}
                          </p>
                          <p>
                            {formatPrice(
                              calculateDiscountPrice(item.price, item.discount)
                            )}
                          </p>
                        </span>
                      ) : (
                        <p> {formatPrice(item.price)} </p>
                      )}
                    </div>
                    <div className="w-[60px] mr-2">
                      <Input
                        type="number"
                        min="1"
                        max="99"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value, 10),
                            item.views
                          )
                        }
                        className="w-full"
                      />
                      <Button
                        onClick={() => removeFromCart(item.id)}
                        variant={"destructive"}
                        className="w-full mt-1"
                      >
                        Xoá
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
              <Card className="h-fit p-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Checkout</CardTitle>
                </CardHeader>
                <CardContent>
                  <h2 className="font-semibold">
                    Tạm tính: {formatPrice(getCartTotal())}
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
                    <Button
                      onClick={handleCheckout}
                      className="bg-emerald-600 hover:bg-emerald-500"
                      disabled={!isAuthenticated}
                    >
                      Checkout ngay
                    </Button>
                  </div>
                </CardFooter>
                <CardFooter>
                  {!isAuthenticated && (
                    <p className="text-red-500">
                      Đăng nhập để tiếp tục thanh toán
                    </p>
                  )}
                </CardFooter>
              </Card>
            </div>
          )}
        </TabsContent>
        <TabsContent value="payment">
          {cartItemsRef.current ? (
            <div>
              <h1 className="text-center text-2xl font-bold my-2">Checkout</h1>
              <ul className="cart-items flex flex-col gap-1 md:w-[400px] mx-auto">
                <OrderForm onSubmit={handleSubmitOrder} formRef={formRef} />
                {cartItemsRef.current.cartItems.map((item) => (
                  <li key={item.productId} className="flex justify-between">
                    <p>{item.productName}</p>
                    <span className="border-dashed flex-1 border-b-2 mb-1 mx-1"></span>
                    <p> {item.quantity} </p>
                  </li>
                ))}
                <li className="flex justify-between mt-4">
                  <p>Phí giao hàng:</p>
                  <p>{formatPrice(cartItemsRef.current.shippingFee)}</p>
                </li>
                <li className="flex justify-between">
                  <p>Tổng:</p>
                  <p>{formatPrice(cartItemsRef.current.totalAmount)}</p>
                </li>
                <div className="flex justify-end gap-1 py-2">
                  <Button
                    variant={"destructive"}
                    onClick={() => setChangeTab("checkout")}
                  >
                    Cancel
                  </Button>
                  <span>
                    {isOdering ? (
                      <LoadingButton additionClass="bg-emerald-600 " />
                    ) : (
                      <Button
                        className="bg-emerald-600 hover:bg-emerald-500"
                        onClick={() => {
                          formRef.current?.requestSubmit();
                        }}
                      >
                        Đặt hàng
                      </Button>
                    )}
                  </span>
                </div>
              </ul>
            </div>
          ) : (
            <p>Không có đơn hàng nào</p>
          )}
        </TabsContent>
        <TabsContent value="feedback">
          <div className="flex flex-col mx-auto md:w-[350px] mt-16 text-center gap-4">
            <h1 className="text-2xl font-bold">Đặt hàng thành công!</h1>
            <p>
              Đơn hàng của bạn đã được ghi nhận. Đơn hàng của bạn sẽ được tiến
              hành xủa lí
            </p>
            <p className="text-xl">Cảm ơn bạn đã mua hàng</p>

            <Button
              onClick={() => {
                navigate("/");
              }
              }
              className="bg-emerald-600 hover:bg-emerald-500"
            >
              Trở về trang chủ
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CartPage;
