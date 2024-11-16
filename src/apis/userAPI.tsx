import { UserFormData } from "@/components/forms/userForm";
import { useState } from "react";
import axiosInstance from "@/apis/axiosInstance";

function useUpdateUserAPI() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<unknown>(null);

  const updateUserRequest = async (data: UserFormData) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put("/api/Users/update", {
        ...data,
        birthOfDate: data.birthday,
        phone: data.phoneNumber,
      });
      setResponse(response.data);
    } catch (error) {
      setResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, response, updateUserRequest };
}

export { useUpdateUserAPI };