import axiosInstance from "@/apis/axiosInstance";
import { Supplier } from "@/types/entity";
import { useState } from "react";

const useGetSuppliers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const getSuppliers = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/api/Supplier");
      setSuppliers(res.data.data);
    } catch (error) {
      console.error("Error fetching Suppliers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSupplierById = async (id: string) : Promise<Supplier | undefined> => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/api/Supplier/${id}`);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching Supplier by id:", error);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };
  return { getSuppliers, getSupplierById, isLoading, suppliers };
};

const useCreateSupplier = () => {
  let isSuccessful = false;
  const [isLoading, setIsLoading] = useState(false);
  const createSupplier = async (data: Supplier) => {
    try {
      setIsLoading(true);
      data.logo = "unsupport-image-url";
      await axiosInstance.post("/api/Supplier", data);
      isSuccessful = true;
    } catch (error) {
      console.error("Error creating Supplier:", error);
    } finally {
      setIsLoading(false);
    }
    return isSuccessful;
  };

  return { createSupplier, isLoading };
};

const useUpdateSupplier = () => {
  let isSuccessful = false;
  const [isLoading, setIsLoading] = useState(false);
  const updateSupplier = async (data: Supplier) => {
    try {
      setIsLoading(true);
      await axiosInstance.put(`/api/Supplier/${data.id}`, data);
      isSuccessful = true;
    } catch (error) {
      console.error("Error updating Supplier:", error);
    } finally {
      setIsLoading(false);
    }
    return isSuccessful;
  };

  return { updateSupplier, isLoading };
};

const useDeleteSupplier = () => {
  let isSuccessful = false;
  const [isLoading, setIsLoading] = useState(false);
  const deleteSupplier = async (id: string) => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(`/api/Supplier/${id}`);
      isSuccessful = true;
    } catch (error) {
      console.error("Error deleting Supplier:", error);
    } finally {
      setIsLoading(false);
    }
    return isSuccessful;
  };

  return { deleteSupplier, isLoading };
};

export {
  useCreateSupplier,
  useUpdateSupplier,
  useDeleteSupplier,
  useGetSuppliers,
};
