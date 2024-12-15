import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Supplier } from "@/types/entity";
import { PencilLine, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import LoadingPanel from "@/components/LoadingPanel";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useGetSuppliers, useDeleteSupplier } from "@/apis/supplierAPI";
import CreateSupplierForm from "@/components/forms/supplier/CreateSupplierForm";
import EditSupplierForm from "@/components/forms/supplier/EditSupplierForm";

const SupplierManagePage = () => {
  const { getSuppliers, isLoading, suppliers } = useGetSuppliers();
  const { deleteSupplier } = useDeleteSupplier();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );

  useEffect(() => {
    getSuppliers();
  }, []);

  const handleEditSupplier = (supplier: Supplier) => () => {
    setSelectedSupplier(supplier);
    setEditDialogOpen(true);
  };

  const handleDeleteSupplier = async (supplier: Supplier) => {
    await deleteSupplier(supplier.id);
    setDeleteDialogOpen(false);
    await getSuppliers();
  };

  return (
    <div>
      <h1 className="text-2xl py-4 text-center">Quản lý nhà cung cấp</h1>
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
                <TableHead>Tên nhà cung cấp</TableHead>
                <TableHead>Thông tin liên hệ</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>SĐT</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier, index) => (
                <TableRow key={supplier.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.supplierContact}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                  <TableCell>{supplier.address}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        onClick={handleEditSupplier(supplier)}
                        className=" bg-transparent hover:bg-yellow-200 text-white font-bold rounded"
                      >
                        <PencilLine size={18} className="text-yellow-500" />
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedSupplier(supplier);
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
            <DialogTitle>Thêm mới nhà cung cấp</DialogTitle>
            <DialogDescription>
              Điền thông tin vào form dưới đây để thêm mới nhà cung cấp.
            </DialogDescription>
          </DialogHeader>
          <CreateSupplierForm
            onSubmit={() => {
              setCreateDialogOpen(false);
              getSuppliers();
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật nhà cung cấp</DialogTitle>
            <DialogDescription>
              Điền thông tin vào form dưới đây để chỉnh sửa nhà cung cấp.
            </DialogDescription>
          </DialogHeader>
          <EditSupplierForm
            selectedSupplier={selectedSupplier}
            onSubmit={async () => {
              setEditDialogOpen(false);
              await getSuppliers();
            }}
          />
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        onConfirm={() =>
          selectedSupplier && handleDeleteSupplier(selectedSupplier)
        }
        onCancel={() => setDeleteDialogOpen(false)}
        open={deleteDialogOpen}
        message="Bạn có chắc chắn muốn xóa nhà cung cấp này này?"
      />
    </div>
  );
};

export default SupplierManagePage;
