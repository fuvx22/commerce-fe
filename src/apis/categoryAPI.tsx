import axiosInstance from "@/apis/axiosInstance";
import { CreateCategoryFormData } from "@/components/forms/CreateCategoryForm";
import { Category } from "@/types/entity";
import { useState } from "react";

export const useGetCategories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const getCategories = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/api/Categories");
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { getCategories, isLoading, categories };
};

export const useCreateCategory = () => {
  let isSuccessful = false;
  const [isLoading, setIsLoading] = useState(false);
  const createCategory = async (data: CreateCategoryFormData) => {
    try {
      setIsLoading(true);
      data.imageUrl = "unsupport-image-url";
      await axiosInstance.post("/api/Categories", data);
      isSuccessful = true;
    } catch (error) {
      console.error("Error creating category:", error);
    } finally {
      setIsLoading(false);
    }
    return isSuccessful;
  };

  return { createCategory, isLoading };
};

export const useUpdateCategory = () => {
  let isSuccessful = false;
  const [isLoading, setIsLoading] = useState(false);
  const updateCategory = async (data: Category) => {
    try {
      setIsLoading(true);
      await axiosInstance.put(`/api/Categories/${data.id}`, data);
      isSuccessful = true;
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setIsLoading(false);
    }
    return isSuccessful;
  };

  return { updateCategory, isLoading };
}

export const useDeleteCategory = () => {
  let isSuccessful = false;
  const [isLoading, setIsLoading] = useState(false);
  const deleteCategory = async (id: string) => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(`/api/Categories/${id}`);
      isSuccessful = true;
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setIsLoading(false);
    }
    return isSuccessful;
  };

  return { deleteCategory, isLoading };
};


