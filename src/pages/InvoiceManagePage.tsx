import { useEffect, useRef, useState } from "react";
import { useInvoiceAPI } from "@/apis/invoiceAPI";
import { getShippingStatusList } from "@/apis/invoiceAPI";
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

const InvoiceManagePage = () => {
  const { isLoading, getInvoices } = useInvoiceAPI();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [statusShipping, setStatusShipping] = useState("");
  const totalPage = useRef();
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

  console.log("shipping status:", statusShipping);

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
                  <TableCell>{invoice.shippingStatus}</TableCell>
                  <TableCell>
                    <Button variant="outline">View</Button>
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
    </div>
  );
};

export default InvoiceManagePage;
