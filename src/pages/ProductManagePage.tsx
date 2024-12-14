import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types/entity";
import { PencilLine, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useDeleteProduct, useGetProducts } from "@/apis/productAPI";
import { useGetCategories } from "@/apis/categoryAPI";
import CreateProductForm from "@/components/forms/product/CreateProductForm";
import LoadingPanel from "@/components/LoadingPanel";
import ConfirmDialog from "@/components/ConfirmDialog";
import EditProductForm from "@/components/forms/product/EditProductForm";
import ActionPagination from "@/components/ActionPagination";
import { Input } from "@/components/ui/input";

const CategoryManagePage = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const { getProducts, isLoading, products, productsInfo } = useGetProducts();
  const { getCategories, categories } = useGetCategories();
  const { deleteProduct } = useDeleteProduct();

  useEffect(() => {
    getCategories();
    getProducts(currentPage, 10);
  }, [currentPage]);

  useEffect(() => {
    //delay search to prevent too many requests
    const delaySearch = setTimeout(() => {
      setCurrentPage(1);
      getProducts(1, 10, search);
    }, 300);
    return () => clearTimeout(delaySearch);
  }, [search]);

  const handleEditProduct = (product: Product) => () => {
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

  const handleDeleteProduct = async (product: Product) => {
    await deleteProduct(product.id);
    setDeleteDialogOpen(false);
    await getProducts();
  };

  return (
    <div>
      <h1 className="text-2xl py-4 text-center">Quản lý danh mục sản phẩm</h1>
      <div className="flex justify-between gap-1 mb-1">
        <span className="relative flex items-center md:basis-[300px]">
          <Input
            placeholder="Tìm kiếm sản phẩm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <X
              size={18}
              className="text-gray-400 cursor-pointer absolute right-2"
              onClick={() => setSearch("")}
            />
          )}
        </span>

        <Button
          onClick={() => setCreateDialogOpen(true)}
          variant="outline"
          className="py-2 px-3 rounded border-emerald-600 text-emerald-600 hover:text-white hover:bg-emerald-600"
        >
          <Plus size={18} className="mr-1" />
          Thêm mới
        </Button>
      </div>

      <div className="min-h-[665px]">
        {isLoading ? (
          <LoadingPanel />
        ) : (
          <div className="max-h-screen overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead>Tên Alias</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Hình ảnh</TableHead>
                  <TableHead>Giảm giá</TableHead>
                  <TableHead>Tồn kho</TableHead>
                  {/* <TableHead>Nhà cung cấp</TableHead> */}
                  {/* <TableHead>Thao tác</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="line-clamp-2">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.productNameAlias}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell className="whitespace-nowrap overflow-ellipsis overflow-hidden max-w-[200px]">
                      {product.description}
                    </TableCell>
                    <TableCell>
                      {categories.find(
                        (category) => category.id === product.categoryId
                      )?.name ?? (
                        <span className="text-red-500">Không xác định</span>
                      )}
                    </TableCell>
                    {/* <TableCell>{product.productDate}</TableCell> */}
                    <TableCell>
                      <img
                        className="max-h-[64px] rounded"
                        src={product.imageUrl}
                      />
                    </TableCell>
                    <TableCell>{product.discount}</TableCell>
                    <TableCell>{product.views}</TableCell>
                    <TableCell>{product.supplierId}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          onClick={handleEditProduct(product)}
                          className=" bg-transparent hover:bg-yellow-200 text-white font-bold rounded"
                        >
                          <PencilLine size={18} className="text-yellow-500" />
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedProduct(product);
                            setDeleteDialogOpen(true);
                          }}
                          className=" bg-transparent hover:bg-red-200 text-white font-bold rounded"
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <ActionPagination
        currentPage={currentPage}
        totalPage={productsInfo?.totalPage ?? 0}
        onPageChange={setCurrentPage}
      />
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm mới sản phẩm</DialogTitle>
            <DialogDescription>
              Điền thông tin vào form dưới đây để thêm mới sản phẩm
            </DialogDescription>
          </DialogHeader>
          <CreateProductForm
            onSubmit={() => {
              setCreateDialogOpen(false);
              getProducts();
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật sản phẩm</DialogTitle>
            <DialogDescription>
              Điền thông tin vào form dưới đây để chỉnh sửa sản phẩm
            </DialogDescription>
          </DialogHeader>
          <EditProductForm
            selectedProduct={selectedProduct}
            onSubmit={async () => {
              setEditDialogOpen(false);
              await getProducts();
            }}
          />
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        onConfirm={() =>
          selectedProduct && handleDeleteProduct(selectedProduct)
        }
        onCancel={() => setDeleteDialogOpen(false)}
        open={deleteDialogOpen}
        message="Bạn có chắc chắn muốn xóa sản phẩm này?"
      />
    </div>
  );
};

export default CategoryManagePage;
