import axiosInstance from "@/apis/axiosInstance";
import { CartItems } from "@/types/entity";
import { useState } from "react";

export const useCheckoutInvoice = () => {
  const [isLoading, setIsLoading] = useState(false);

  const checkoutInvoice = async (cartItems: CartItems) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post(`/api/Invoice/checkout`, {
        cartItems,
      });
      return res.data.data;
    } catch (error) {
      console.error("Error checking out invoice:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { checkoutInvoice, isLoading };
};

export const getInvoiceStatusList = async () => {
  try {
    const res = await axiosInstance.get(`/api/Invoice/status`);
    return res.data.data;
  } catch (error) {
    console.error("Error getting invoice status list:", error);
    return [];
  }
};

export const useOrderInvoice = () => {
  const [isLoading, setIsLoading] = useState(false);

  const orderInvoice = async (
    orderData : {
      address: string;
      paymentMethod: number;
      note: string;
      totalAmount: number;
      cartItems: CartItems;
    }

  ) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post(`/api/Invoice/order`, orderData);
      return res.data;
    } catch (error) {
      console.error("Error ordering invoice:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { orderInvoice, isLoading };
}

export const useInvoiceAPI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getInvoices = async (
    page: number = 1,
    limit: number = 12,
    startDate: string = "",
    endDate: string = "",
    statusShipping: string = "",
  ) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/api/Invoice`, {
        params: {
          page,
          limit,
          startDate,
          endDate,
          statusShipping,
        },
      });
      return res.data.data;
    } catch (error) {
      console.error("Error getting invoices:", error);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return { getInvoices, isLoading };
}


