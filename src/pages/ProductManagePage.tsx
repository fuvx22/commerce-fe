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
import { PencilLine, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useDeleteProduct, useGetProducts } from "@/apis/productAPI";
import CreateProductForm from "@/components/forms/product/CreateProductForm";
import LoadingPanel from "@/components/LoadingPanel";
import ConfirmDialog from "@/components/ConfirmDialog";
import EditProductForm from "@/components/forms/product/EditProductForm";
import ActionPagination from "@/components/ActionPagination";

const CategoryManagePage = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { getProducts, isLoading, products, productsInfo } = useGetProducts();
  const { deleteProduct } = useDeleteProduct();
  useEffect(() => {
    getProducts(currentPage, 1);
  }, [currentPage]);

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
      <div className="flex justify-end">
        <Button
          onClick={() => setCreateDialogOpen(true)}
          variant="outline"
          className="py-2 px-3 rounded border-emerald-600 text-emerald-600 hover:text-white hover:bg-emerald-600"
        >
          <Plus size={18} className="mr-1" />
          Thêm mới
        </Button>
      </div>

      <div className="min-h-[300px]">
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
                  <TableHead>Ngày sản xuất</TableHead>
                  <TableHead>Hình ảnh</TableHead>
                  <TableHead>Giảm giá</TableHead>
                  <TableHead>Tồn kho</TableHead>
                  <TableHead>Nhà cung cấp</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.productNameAlias}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.categoryId}</TableCell>
                    <TableCell>{product.productDate}</TableCell>
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
            <DialogTitle>Thêm mới danh mục</DialogTitle>
            <DialogDescription>
              Điền thông tin vào form dưới đây để thêm mới danh mục
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
            <DialogTitle>Cập nhật danh mục</DialogTitle>
            <DialogDescription>
              Điền thông tin vào form dưới đây để chỉnh sửa danh mục
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
