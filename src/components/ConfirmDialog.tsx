import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
  open: boolean;
  message?: string;
};

const ConfirmDialog = ({
  onConfirm,
  onCancel,
  open,
  message = "Bạn có chắc chắn muốn thực hiện hành động này?",
}: Props) => {
  const handleConfirm = () => {
    onConfirm();
    onCancel();
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{message}</DialogTitle>
          <DialogDescription>
            Hành động này không thể hoàn tác, nó có thể ảnh hưởng đến dữ liệu
            của hệ thống
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-1">
          <Button onClick={onCancel} variant="outline">
            Hủy
          </Button>
          <Button onClick={handleConfirm} variant="destructive">
            Xác nhận
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
