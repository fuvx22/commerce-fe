import { UserFormData } from "@/components/forms/userForm";
import { useState } from "react";
import axiosInstance from "@/apis/axiosInstance";

function useUpdateUserAPI() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<unknown>(null);

  const updateUserRequest = async (data: UserFormData): Promise<boolean> => {
    setIsLoading(true);
    let isSuccessful = false;
    try {
      const response = await axiosInstance.put("/api/Users/update", {
        ...data,
        birthOfDate: data.birthday,
        phone: data.phoneNumber,
      });
      setResponse(response.data);
      isSuccessful = true;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
    return isSuccessful;
  };

  return { isLoading, response, updateUserRequest };
}

function useUserAPI() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllUsers = async (fullName: string = "", email: string = "") => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/api/Users/get-all-users", {
        params: {
          fullName,
          email,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchUserRole = async (userId: string, role: string) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      role === "Admin" ? (role = "Customer") : (role = "Admin");
      const response = await axiosInstance.put(
        `/api/Users/update-role/${userId}`,
        {
          role,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.delete(
        `/api/Users/delete-user/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getAllUsers, switchUserRole, deleteUser };
}

export { useUpdateUserAPI, useUserAPI };
