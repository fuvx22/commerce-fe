import slider from "@/assets/slider.jpg";
import ProductsList from "@/components/ProductsList";
import { useGetProducts } from "@/apis/productAPI";
import { useEffect, useRef } from "react";
import { Product } from "@/types/entity";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoadingPanel from "@/components/LoadingPanel";

const HomePage = () => {
  const { getProductsByCategory, isLoading } = useGetProducts();
  const cate1 = "26b71f64-0959-40d6-a4f1-7a1eb290dd09";
  const cate2 = "26b71f64-0959-40d6-a4f1-7a1eb290dd42";
  const cate3 = "26b71f64-0959-40d6-a4f1-7a1eb290dd92";
  const products = useRef<[]>([]);

  const fetchProducts = async (cateId: string) => {
    const res = await getProductsByCategory(cateId, 1, 4);
    return (res.data as Product[]) || [];
  };

  useEffect(() => {
    (async () => {
      products.current[0] = await fetchProducts(cate1);
      products.current[1] = await fetchProducts(cate2);
      products.current[2] = await fetchProducts(cate3);
    })();
  }, []);

  return (
    <div className="flex flex-col gap-4 my-4">
      <div className="rounded w-full h-[450px] overflow-hidden">
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-white uppercase text-center">
          Shop mô hình 2024
          <p className="text-2xl">Chuyên bán lẻ mô hình anime.</p>
        </span>
        <img className="w-full h-full object-cover" src={slider} alt="" />
      </div>
      {isLoading ? (
        <LoadingPanel />
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-3xl text-red-600 uppercase font-semibold text-center mb-4">
              Mô hình One Piece
            </p>
            <ProductsList products={products.current[0] || []} />
          </div>
          <div>
            <p className="text-3xl text-red-600 uppercase font-semibold text-center mb-4">
              Mô hình Naruto
            </p>
            <ProductsList products={products.current[1] || []} />
          </div>
          <div>
            <p className="text-3xl text-red-600 uppercase font-semibold text-center mb-4">
              Mô hình DragonBall
            </p>
            <ProductsList products={products.current[2] || []} />
          </div>

          <Button className="w-1/4 self-center my-2">
            <Link to="/shop">Xem tất cả</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
