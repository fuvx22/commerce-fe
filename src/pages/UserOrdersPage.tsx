import { useInvoiceAPI } from "@/apis/invoiceAPI";
import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingPanel from "@/components/LoadingPanel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/utils";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useShowToast } from "@/utils/toast";

const UserOrdersPage = () => {
  const { showToast } = useShowToast();
  const [invoices, setInvoices] = useState<
    {
      id: string;
      orderDate: string;
      status: string;
      shippingStatus: string;
      totalAmount: number;
      cancelDate?: string;
      shippingDate?: string;
    }[]
  >([]);
  const [isOpened, setIsOpened] = useState(false);
  const [isConfirmOpened, setIsConfirmOpened] = useState(false);
  const { getUserInvoices, getInvoiceDetail, isLoading, cancelMyInvoice } =
    useInvoiceAPI();
  const selectedInvoice = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await getUserInvoices();

      if (res.statusCode === 200) {
        setInvoices(res.data);
      }
    };

    fetch();
  }, []);

  const handleShowDetailInvoice = async (invoiceId: string) => {
    const res = await getInvoiceDetail(invoiceId);

    if (res.statusCode === 200) {
      selectedInvoice.current = res.data;
      setIsOpened(true);
    }
  };

  const handleCancelInvoice = async () => {
    if (selectedInvoice.current) {
      const res = await cancelMyInvoice(selectedInvoice.current.id);

      if (res.statusCode === 200) {
        setIsConfirmOpened(false);
        setIsOpened(false);
        const res = await getUserInvoices();

        if (res.statusCode === 200) {
          setInvoices(res.data);
        }

        showToast("Hủy đơn hàng thành công", "đơn hàng đã được hủy", "success");
      }
    }
  };

  return (
    <div className=" px-2">
      <h1 className="text-xl py-2">Đơn hàng của bạn</h1>
      <h2 className="text-gray-600 text-sm pb-2">
        Bấm vào đơn để xem chi tiết của đơn hàng.
      </h2>
      {isLoading ? (
        <LoadingPanel />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Ngày đặt</TableHead>
              <TableHead>Ngày Hủy/Giao hàng</TableHead>
              <TableHead>Trạng thái thanh toán</TableHead>
              <TableHead>Trạng thái giao hàng</TableHead>
              <TableHead>Tổng giá trị</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow
                key={invoice.id}
                className="cursor-pointer"
                onClick={() => handleShowDetailInvoice(invoice.id)}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{invoice.orderDate}</TableCell>
                <TableCell>
                    {invoice.shippingStatus === "Đã hủy"
                      ? invoice.cancelDate
                      : invoice.shippingDate}
                  </TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>
                  <span
                    className={
                      invoice.shippingStatus === "Đã hủy"
                        ? "bg-red-500 text-white px-3 py-1 rounded-xl"
                        : ""
                    }
                  >
                    {invoice.shippingStatus}
                  </span>
                </TableCell>
                <TableCell>{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={isOpened} onOpenChange={setIsOpened}>
        <DialogContent className="p-4">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
            <DialogDescription>
              Đơn hàng chỉ có thể hủy khi chưa được xác nhận.
            </DialogDescription>
          </DialogHeader>
          <div>
            {selectedInvoice.current && (
              <div className="flex flex-col space-y-1 text-sm">
                <p>Ngày đặt hàng: {selectedInvoice.current.orderDate}</p>
                <p>Trạng thái: {selectedInvoice.current.shippingStatus}</p>
                <p>Thanh toán: {selectedInvoice.current.status}</p>
                {
                  selectedInvoice.current?.shippingDate && (
                    <p>Ngày giao: {selectedInvoice.current?.shippingDate}</p>
                  )
                }
                {
                  selectedInvoice.current?.cancelDate && (
                    <p>Ngày hủy: {selectedInvoice.current?.cancelDate}</p>
                  )
                }
                <Table className="mt-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>STT</TableHead>
                      <TableHead>Sản phẩm</TableHead>
                      <TableHead>SL</TableHead>
                      <TableHead>Giá</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedInvoice.current.invoiceDetil.map(
                      (product, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{idx + 1}</TableCell>
                          <TableCell>{product.productName}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{formatPrice(product.price)}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
                <p className="self-end mt-2 font-semibold">
                  Tổng giá trị:{" "}
                  {formatPrice(selectedInvoice.current.totalAmount)}
                </p>
                <Button
                  variant="destructive"
                  className="self-end"
                  onClick={() => setIsConfirmOpened(true)}
                  disabled={
                    selectedInvoice.current.shippingStatus !== "Chờ xác nhận"
                  }
                >
                  {selectedInvoice.current.shippingStatus !== "Chờ xác nhận"
                    ? "Không thể hủy"
                    : "Hủy đơn hàng"}
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        open={isConfirmOpened}
        onCancel={() => setIsConfirmOpened(false)}
        onConfirm={handleCancelInvoice}
        message="Bạn có chắc chắn muốn hủy đơn hàng này?"
      />
    </div>
  );
};

export default UserOrdersPage;
