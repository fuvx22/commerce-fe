import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "@/types/entity";
import { PencilLine, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetCategories } from "@/apis/categoryAPI";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CreateCategoryForm from "@/components/forms/CreateCategoryForm";
import LoadingPanel from "@/components/LoadingPanel";
import EditCategoryForm from "@/components/forms/EditCategoryForm";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useDeleteCategory } from "@/apis/categoryAPI";

const CategoryManagePage = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const { getCategories, isLoading, categories } = useGetCategories();
  const { deleteCategory } = useDeleteCategory();
  useEffect(() => {
    getCategories();
  }, []);

  const handleEditCategory = (category: Category) => () => {
    setSelectedCategory(category);
    setEditDialogOpen(true);
  };

  const handleDeleteCategory = async (category: Category) => {
    await deleteCategory(category.id);
    setDeleteDialogOpen(false);
    await getCategories();
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

      {isLoading ? (
        <LoadingPanel />
      ) : (
        <div className="max-h-screen overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>Tên danh mục</TableHead>
                <TableHead>Tên Alias</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.categoryAliasName}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        onClick={handleEditCategory(category)}
                        className=" bg-transparent hover:bg-yellow-200 text-white font-bold rounded"
                      >
                        <PencilLine size={18} className="text-yellow-500" />
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedCategory(category);
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
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm mới danh mục</DialogTitle>
            <DialogDescription>
              Điền thông tin vào form dưới đây để thêm mới danh mục
            </DialogDescription>
          </DialogHeader>
          <CreateCategoryForm
            onSubmit={() => {
              setCreateDialogOpen(false);
              getCategories();
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
          <EditCategoryForm
            selectedCategory={selectedCategory}
            onSubmit={async () => {
              setEditDialogOpen(false);
              await getCategories();
            }}
          />
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        onConfirm={() =>
          selectedCategory && handleDeleteCategory(selectedCategory)
        }
        onCancel={() => setDeleteDialogOpen(false)}
        open={deleteDialogOpen}
        message="Bạn có chắc chắn muốn xóa danh mục này?"
      />
    </div>
  );
};

export default CategoryManagePage;
