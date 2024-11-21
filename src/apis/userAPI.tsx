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

export { useUpdateUserAPI };
