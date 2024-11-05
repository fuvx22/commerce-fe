import { RegisterFormData } from "@/components/forms/RegisterForm";
import axios from "axios";
import { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const defaultAvatarUrl = import.meta.env.VITE_DEFAULT_AVATAR_URL;

function useRegisterAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<unknown>(null);

  const registerRequest = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const { passwordConfirmation, ...rest } = data; // eslint-disable-line @typescript-eslint/no-unused-vars
      const response = await axios.post("/api/Users/register", {
        ...rest,
        url: defaultAvatarUrl,
      });
      setResponse(response.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, response, registerRequest };
}

export { useRegisterAPI };
