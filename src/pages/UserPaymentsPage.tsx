import { useEffect, useState } from "react";
import { usePaymentAPI } from "@/apis/paymentAPI";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingPanel from "@/components/LoadingPanel";
import { formatPrice } from "@/utils/utils";

const UserPaymentsPage = () => {
  const { getMyPayments, isLoading } = usePaymentAPI();
  const [payments, setPayments] = useState<
    {
      id: string;
      paymentMethod: string;
      amount: number;
      paymentDate: string;
    }[]
  >([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getMyPayments();
      if (res.statusCode === 200) {
        setPayments(res.data);
      }
    };

    fetch();
  }, []);

  return (
    <div className=" px-2">
      <h1 className="text-xl py-2">Đơn hàng của bạn</h1>
      <h2 className="text-gray-600 text-sm pb-2">
        Bấm vào đơn để xem chi tiết của đơn hàng.
      </h2>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((p, idx) => (
                <TableRow key={p.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{p.paymentMethod}</TableCell>
                  <TableCell>{formatPrice(p.amount)}</TableCell>
                  <TableCell>{p.paymentDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default UserPaymentsPage;
