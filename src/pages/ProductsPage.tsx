import ProductsList from "@/components/ProductsList";
import { Product } from "@/types/entity";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ArrowDownAZ } from 'lucide-react';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    // Fetch products
    // mock data products for testing
    const products = [
      {
        _id: "1",
        name: "Product 1",
        price: 100,
        description: "Description 1",
        category: "Category 1",
        image: "https://cavathanquoc.com/wp-content/uploads/2024/06/Ao-thun-tron-cotton-mau-xanh-than.jpg",
        discount: 10,
        stock: 10,
      },
      {
        _id: "2",
        name: "Product 2",
        price: 200,
        description: "Description 2",
        category: "Category 2",
        image: "https://cavathanquoc.com/wp-content/uploads/2024/06/Ao-thun-tron-cotton-mau-xanh-than.jpg",
        discount: 20,
        stock: 20,
      },
      {
        _id: "3",
        name: "Product 3",
        price: 200,
        description: "Description 2",
        category: "Category 2",
        image: "https://cavathanquoc.com/wp-content/uploads/2024/06/Ao-thun-tron-cotton-mau-xanh-than.jpg",
        discount: 20,
        stock: 20,
      },
      {
        _id: "4",
        name: "Product 4",
        price: 200,
        description: "Description 2",
        category: "Category 2",
        image: "https://cavathanquoc.com/wp-content/uploads/2024/06/Ao-thun-tron-cotton-mau-xanh-than.jpg",
        discount: 20,
        stock: 20,
      },
      {
        _id: "5",
        name: "Product 5",
        price: 200,
        description: "Description 2",
        category: "Category 2",
        image: "https://cavathanquoc.com/wp-content/uploads/2024/06/Ao-thun-tron-cotton-mau-xanh-than.jpg",
        discount: 20,
        stock: 20,
      },
      {
        _id: "6",
        name: "Áo khoác nỉ màu đen thời trang",
        price: 599000,
        description: "Description 2",
        category: "Category 2",
        image: "https://cavathanquoc.com/wp-content/uploads/2024/06/Ao-thun-tron-cotton-mau-xanh-than.jpg",
        discount: 20,
        stock: 20,
      },
    ];
    setProducts(products);
  }, [currentPage, search, category]);

  return (
    <div className="p-2 max-w-screen-xl mx-auto flex flex-col space-y-2">
      <div className="controller flex justify-between gap-2">
        <Select>
          <SelectTrigger className="md:w-[240px]">
            <SelectValue placeholder="Danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Danh mục 1</SelectItem>
            <SelectItem value="2">Danh mục 2</SelectItem>
            <SelectItem value="3">Danh mục 3</SelectItem>
          </SelectContent>
        </Select>
          <Select>
            <SelectTrigger className="md:w-[240px]">
              <SelectValue placeholder="Sắp xếp theo" />
              <ArrowDownAZ size={24} className="ml-auto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Bán chạy</SelectItem>
              <SelectItem value="1">Giá từ thấp đến cao</SelectItem>
              <SelectItem value="2">Giá từ cao đến thấp</SelectItem>
            </SelectContent>
          </Select>
      </div>

      <ProductsList products={products} />

      <Pagination className="mt-2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductsPage;
