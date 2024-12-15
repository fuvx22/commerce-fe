import { useState } from "react";
import axiosInstance from "@/apis/axiosInstance";

export const usePaymentAPI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getPayments = async (
    page: number = 1,
    pageSize: number = 10,
    startDate: string,
    endDate: string,
    status: string
  ) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/api/Payment", {
        params: {
          page,
          pageSize,
          startDate,
          endDate,
          status,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error getting payments:", error);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  const addPayment = async (invoiceId: string) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post("/api/Payment", {
        invoiceId,
      });
      return res.data;
    } catch (error) {
      console.error("Error adding payment:", error);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  const getMyPayments = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/api/Payment/user");
      return res.data;
    } catch (error) {
      console.error("Error getting my payments:", error);
      return error;
    } finally {
      setIsLoading(false);
    }
  }

  return { getPayments, addPayment, isLoading, getMyPayments };
};
