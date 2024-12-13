import { useEffect, useRef, useState } from "react";
import { useInvoiceAPI, getShippingStatusList } from "@/apis/invoiceAPI";
import { usePaymentAPI } from "@/apis/paymentAPI";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Invoice } from "@/types/entity";
import ActionPagination from "@/components/ActionPagination";
import LoadingPanel from "@/components/LoadingPanel";
import DatePicker from "@/components/DatePicker";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { formatPrice } from "@/utils/utils";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useShowToast } from "@/utils/toast";

const InvoiceManagePage = () => {
  const { showToast } = useShowToast();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [statusShipping, setStatusShipping] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const [isConfirmOpened, setIsConfirmOpened] = useState(false);
  const { isLoading, getInvoices, getInvoiceDetail, updateShippingStatus } =
    useInvoiceAPI();
  const { addPayment } = usePaymentAPI();
  const totalPage = useRef();
  const selectedInvoice = useRef(null);
  const selectedStatusId = useRef<string>("");
  const statusList = useRef<
    {
      id: string;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getInvoices(
        1,
        10,
        startDate ? format(startDate, "yyyy-MM-dd") : "",
        endDate ? format(endDate, "yyyy-MM-dd") : "",
        statusShipping
      );

      setInvoices(
        res.data.map((invoice) => {
          return {
            ...invoice,
            customerName: invoice.customeName,
          };
        })
      );

      setPage(1);

      totalPage.current = res.totalPage;
    };

    fetch();
  }, [startDate, endDate, statusShipping]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getShippingStatusList();
      statusList.current = res;
    };
    fetch();
  }, []);

  const handleChangePage = async (page: number) => {
    setPage(page);
    const res = await getInvoices(
      page,
      10,
      startDate ? format(startDate, "yyyy-MM-dd") : "",
      endDate ? format(endDate, "yyyy-MM-dd") : "",
      statusShipping
    );

    setInvoices(
      res.data.map((invoice) => {
        return {
          ...invoice,
          customerName: invoice.customeName,
        };
      })
    );
  };

  const handleViewInvoice = (invoiceId: string) => async () => {
    const res = await getInvoiceDetail(invoiceId);

    if (res.statusCode === 200) {
      selectedInvoice.current = res.data;
      setIsOpened(true);
    }
  };

  const handleSelectStatus = async (statusId: string) => {
    selectedStatusId.current = statusId;
    setIsConfirmOpened(true);
  };

  const handleConfirmUpdateStatus = async () => {
    if (!selectedInvoice.current || !selectedStatusId.current) {
      return;
    }

    const statusId = selectedStatusId.current;

    await updateShippingStatus(selectedInvoice.current.id, statusId);

    showToast(
      "Cập nhật trạng thái đơn hàng thành công",
      "Trạng thái đã được cập nhật",
      "success"
    );

    setInvoices((prev) => {
      const idx = prev.findIndex(
        (invoice) => invoice.id === selectedInvoice.current.id
      );
      prev[idx].shippingStatus = statusList.current.find(
        (status) => status.id === statusId
      ).name;
      return prev;
    });

    setIsOpened(false);
  };

  const handlePayment = (invoiceId: string) => async () => {
    const res = await addPayment(invoiceId);

    if (res.statusCode === 200) {
      showToast(
        "Thanh toán thành công",
        "Đơn hàng đã được thanh toán",
        "success"
      );

      setInvoices((prev) => {
        const idx = prev.findIndex((invoice) => invoice.id === invoiceId);
        prev[idx].status = "Đơn hàng đã thanh toán";
        return prev;
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl py-4 text-center">Quản lý đơn hàng</h1>

      <div className="flex flex-col md:flex-row py-2 gap-2 justify-between">
        <div className="flex gap-1 items-center">
          <p>Ngày bắt đầu:</p>
          <DatePicker date={startDate} setDate={setStartDate} />
          <p>Ngày kết thúc:</p>
          <DatePicker date={endDate} setDate={setEndDate} />
        </div>

        <div>
          <Select
            onValueChange={(value) => {
              if (value === "all") {
                setStatusShipping("");
              } else {
                setStatusShipping(value);
              }
            }}
          >
            <SelectTrigger className="min-w-[200px]">
              <SelectValue placeholder="Chọn trạng thái đơn hàng" />
            </SelectTrigger>
            <SelectContent>
              {statusList.current.map((status) => (
                <SelectItem key={status.id} value={status.name}>
                  {status.name}
                </SelectItem>
              ))}
              <SelectItem value="all">Tất cả</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="min-h-[568px]">
        {isLoading ? (
          <LoadingPanel />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Date</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Shipping Status</TableHead>
                <TableHead>Shipping/Cancel Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.orderDate}</TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell>{invoice.totalAmount}</TableCell>
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
                  <TableCell>
                    {invoice.shippingStatus === "Đã hủy"
                      ? invoice.cancelDate
                      : invoice.shippingDate}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={handleViewInvoice(invoice.id)}
                      variant="outline"
                      size={"sm"}
                      className="mr-1"
                    >
                      Xem
                    </Button>

                    {invoice.shippingStatus === "Đã giao hàng" &&
                      invoice.status === "Chờ thanh toán" && (
                        <Button
                          onClick={handlePayment(invoice.id)}
                          variant="outline"
                          size={"sm"}
                        >
                          Thanh toán
                        </Button>
                      )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <ActionPagination
        currentPage={page}
        onPageChange={handleChangePage}
        totalPage={10}
      />

      <Dialog open={isOpened} onOpenChange={setIsOpened}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
            <DialogDescription>
              Đơn hàng chỉ có thể hủy khi ở trạng thái chờ xác nhận.
            </DialogDescription>
          </DialogHeader>
          <div>
            {selectedInvoice?.current && (
              <div className="flex flex-col space-y-1 text-sm">
                <p>Ngày đặt hàng: {selectedInvoice.current.orderDate}</p>
                <p>Trạng thái: {selectedInvoice.current.shippingStatus}</p>
                <p>Thanh toán: {selectedInvoice.current.status}</p>
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
              </div>
            )}
          </div>
          <DialogFooter>
            <Select
              onValueChange={(value) => {
                handleSelectStatus(value);
              }}
              disabled={selectedInvoice?.current?.status != "Chờ thanh toán"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Cập nhật đơn hàng tại đây" />
              </SelectTrigger>
              <SelectContent>
                {statusList.current.map((status) => (
                  <SelectItem
                    className="cursor-pointer"
                    key={status.id}
                    value={status.id}
                    disabled={
                      selectedInvoice?.current?.shippingStatus ===
                        status.name ||
                      (selectedInvoice?.current?.shippingStatus !==
                        "Chờ xác nhận" &&
                        status.name === "Đã hủy")
                    }
                  >
                    {status.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={isConfirmOpened}
        onCancel={() => setIsConfirmOpened(false)}
        onConfirm={handleConfirmUpdateStatus}
      />
    </div>
  );
};

export default InvoiceManagePage;
