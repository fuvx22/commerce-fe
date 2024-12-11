import ProductsList from "@/components/ProductsList";
import { useEffect, useState } from "react";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ArrowDownAZ } from "lucide-react";
import { useGetCategories } from "@/apis/categoryAPI";
import { useGetProducts } from "@/apis/productAPI";
import ActionPagination from "@/components/ActionPagination";
import { Link, useParams } from "react-router-dom";
import LoadingPanel from "@/components/LoadingPanel";

const ProductsPage = () => {
  const { search: searchValue } = useParams();

  const [search, setSearch] = useState<string>(searchValue || "");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [category, setCategory] = useState<string>("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const {
    getProductsByCategory,
    getProducts,
    isLoading,
    products,
    productsInfo,
  } = useGetProducts();

  const { categories, getCategories } = useGetCategories();

  useEffect(() => {
    const fetch = async () => {
      await getCategories();
      setCurrentPage(1);
      if (category !== "all" && category !== "") {
        await getProductsByCategory(category, 1, 12, searchValue, sort);
      } else {
        await getProducts(1, 12, searchValue, sort);
      }
    };

    if (searchValue) {
      setSearch(searchValue);
    }

    fetch();
  }, [searchValue, category, sort]);

  const handleChangePage = async (page: number) => {
    setCurrentPage(page);
    if (category !== "all" && category !== "") {
      await getProductsByCategory(category, page, 12, search, sort);
    } else {
      await getProducts(page, 12, search, sort);
    }
  };

  return (
    <div className="p-2 max-w-screen-xl mx-auto flex flex-col space-y-2">
      <div className="controller flex justify-between gap-2">
        <Select
          value={category}
          onValueChange={(value) => setCategory(value as string)}
        >
          <SelectTrigger className="md:w-[240px]">
            <SelectValue placeholder="Danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={sort}
          onValueChange={(value) => setSort(value as "asc" | "desc")}
        >
          <SelectTrigger className="md:w-[240px]">
            <SelectValue placeholder="Sắp xếp theo" />
            <ArrowDownAZ size={24} className="ml-auto" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="3">Bán chạy</SelectItem> */}
            {/* <SelectItem value="1">Giá từ thấp đến cao</SelectItem>
            <SelectItem value="2">Giá từ cao đến thấp</SelectItem> */}
            <SelectItem value="asc">Giá từ thấp đến cao</SelectItem>
            <SelectItem value="desc">Giá từ cao đến thấp</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {!!search && (
        <div>
          <span className="text-lg font-semibold my-1">
            Kết quả tìm kiếm cho: "{search}"
          </span>
          <button>
            <Link
              to={`/shop`}
              onClick={() => setSearch("")}
              className="text-blue-600 underline text-sm ml-2"
            >
              xóa tìm kiếm{" "}
            </Link>
          </button>
        </div>
      )}
      <div className="min-h-[560px]">
        {isLoading ? <LoadingPanel /> : <ProductsList products={products} />}
      </div>

      <ActionPagination
        currentPage={currentPage}
        onPageChange={handleChangePage}
        totalPage={productsInfo?.totalPage || 1}
      />
    </div>
  );
};

export default ProductsPage;
