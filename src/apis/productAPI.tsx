import axiosInstance from "@/apis/axiosInstance";
import { CreateProductFormData } from "@/components/forms/product/CreateProductForm";
import { Product } from "@/types/entity";
import { useState } from "react";
import { useCloudinaryAPI } from "./cloudinaryAPI";

export const useGetProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsInfo, setProductsInfo] = useState<{ page: number; totalPage: number } | undefined>(undefined);
  const getProducts = async (
    page: number = 1,
    limit: number = 12,
    search: string = "",
    sort: string = ""
  ) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/api/Products", {
        params: {
          page,
          limit,
          search,
          sort,
        },
      });
      setProducts(res.data.data.data);
      setProductsInfo({
        page: res.data.data.page,
        totalPage: res.data.data.totalPage
      })
    } catch (error) {
      console.error("Error fetching Products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProductsByCategory = async (
    categoryId: string,
    page: number = 1,
    limit: number = 12,
    search: string = "",
    sort: string = ""
  ) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/api/Products/by-category/${categoryId}`, {
        params: {
          page,
          limit,
          search,
          sort,
        },
      });
      setProducts(res.data.data.data);
      setProductsInfo({
        page: res.data.data.page,
        totalPage: res.data.data.totalPage
      })
      return res.data.data
    } catch (error) {
      console.error("Error fetching Products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { getProducts, getProductsByCategory, isLoading, products, productsInfo };
};

export const useCreateProduct = () => {
  let isSuccessful = false;
  const [isLoading, setIsLoading] = useState(false);
  const { uploadImage } = useCloudinaryAPI();
  const createProduct = async (data: CreateProductFormData) => {
    try {
      setIsLoading(true);
      const imageUrl = await uploadImage(data.imageFile!);
      data.imageUrl = imageUrl.secure_url;
      await axiosInstance.post("/api/Products", data);
      isSuccessful = true;
    } catch (error) {
      console.error("Error creating Product:", error);
    } finally {
      setIsLoading(false);
    }
    return isSuccessful;
  };

  return { createProduct, isLoading };
};

export const useUpdateProduct = () => {
  let isSuccessful = false;
  const [isLoading, setIsLoading] = useState(false);
  const { uploadImage } = useCloudinaryAPI();
  const updateProduct = async (data: Product) => {
    try {
      setIsLoading(true);
      
      if(data.imageFile) {
        const imageUrl = await uploadImage(data.imageFile!);
        data.imageUrl = imageUrl.secure_url;
      }

      await axiosInstance.put(`/api/Products/${data.id}`, data);
      isSuccessful = true;
    } catch (error) {
      console.error("Error updating Product:", error);
    } finally {
      setIsLoading(false);
    }
    return isSuccessful;
  };

  return { updateProduct, isLoading };
};

export const useDeleteProduct = () => {
  let isSuccessful = false;
  const [isLoading, setIsLoading] = useState(false);
  const deleteProduct = async (id: string) => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(`/api/Products/${id}`);
      isSuccessful = true;
    } catch (error) {
      console.error("Error deleting Product:", error);
    } finally {
      setIsLoading(false);
    }
    return isSuccessful;
  };

  return { deleteProduct, isLoading };
};
