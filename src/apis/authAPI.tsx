import { RegisterFormData } from "@/components/forms/RegisterForm";
import axios from "axios";
import { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const defaultAvatarUrl = import.meta.env.VITE_DEFAULT_AVATAR_URL;

function useRegisterAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<unknown>(null);

  const registerRequest = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const { passwordConfirmation, ...rest } = data; // eslint-disable-line @typescript-eslint/no-unused-vars
      // new commit
      const response = await axios.post(`${BACKEND_URL}/api/Users/register`, {
        ...rest,
        url: defaultAvatarUrl,
      });
      setResponse(response.data);
    } catch (error) {
      setResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, response, registerRequest };
}

export { useRegisterAPI };
