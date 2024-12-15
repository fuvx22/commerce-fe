import { useEffect, useRef, useState } from "react";
import { usePaymentAPI } from "@/apis/paymentAPI";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Payment } from "@/types/entity";
import ActionPagination from "@/components/ActionPagination";
import LoadingPanel from "@/components/LoadingPanel";
import DatePicker from "@/components/DatePicker";
import { format } from "date-fns";
import { formatPrice } from "@/utils/utils";

const PaymentManagePage = () => {
  const { getPayments, isLoading } = usePaymentAPI();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const totalPage = useRef<number>(0);

  useEffect(() => {
    const fetch = async () => {
      const res = await getPayments(
        1,
        10,
        startDate ? format(startDate, "yyyy-MM-dd") : "",
        endDate ? format(endDate, "yyyy-MM-dd") : "",
        ""
      );

      if(res.statusCode) {
        setPayments(res.data.data);
        setPage(1);
        totalPage.current = res.data.totalPage;
      }


    };

    fetch();
  }, [startDate, endDate]);

  const handleChangePage = async (page: number) => {
    setPage(page);
    const res = await getPayments(
      page,
      10,
      startDate ? format(startDate, "yyyy-MM-dd") : "",
      endDate ? format(endDate, "yyyy-MM-dd") : "",
      ""
    );
    if(res.statusCode) {
      setPayments(res.data.data);
    }
  };

  return (
    <div>
      <h1 className="text-2xl py-4 text-center">Danh sách các giao dịch thanh toán</h1>

      <div className="flex flex-col md:flex-row py-2 gap-2 justify-between">
        <div className="flex gap-1 items-center">
          <p>Ngày bắt đầu:</p>
          <DatePicker date={startDate} setDate={setStartDate} />
          <p>Ngày kết thúc:</p>
          <DatePicker date={endDate} setDate={setEndDate} />
        </div>
      </div>

      <div className="min-h-[568px]">
        {isLoading ? (
          <LoadingPanel />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>Phương thức thanh toán</TableHead>
                <TableHead>Tổng giá trị</TableHead>
                <TableHead>Ngày thanh toán</TableHead>
                <TableHead>Khách hàng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((p, idx) => (
                <TableRow key={p.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{p.paymentMethod}</TableCell>
                  <TableCell>{formatPrice(p.amount)}</TableCell>
                  <TableCell>{p.paymentDate}</TableCell>
                  <TableCell>{p.customerName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <ActionPagination
        currentPage={page}
        onPageChange={handleChangePage}
        totalPage={totalPage.current}
      />
    </div>
  );
};

export default PaymentManagePage;
