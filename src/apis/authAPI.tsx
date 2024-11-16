import { LoginFormData } from "@/components/forms/LoginForm";
import { RegisterFormData } from "@/components/forms/RegisterForm";
import { User } from "@/types/auth";
import axios from "axios";
import { useState } from "react";
import { refreshToken } from "@/apis/axiosInstance";


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

function useLoginAPI() {
  const loginRequest = async (data: LoginFormData) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/Users/login`, data);
      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  };

  return { loginRequest };
}

const getUserInfo = async (): Promise<User | null> => {
  const token = localStorage.getItem("access-token");

  if (!token) {
    throw new Error("Token not found");
  }

  try {
    const res = await axios.get(`${BACKEND_URL}/api/Users/user-info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    throw new Error("Token expired");
  }
};

const autoLogin = async () => {
  const token = localStorage.getItem("access-token");
  const refreshTokenValue = localStorage.getItem("refresh-token");

  if (!token || !refreshTokenValue) {
    return null;
  }
  try {
    const res = await getUserInfo();
    return res;
  } catch (error) {
    try {
      console.error("trigger refresh token");
      await refreshToken();
      return await getUserInfo();
    } catch (error) {
      console.error("refesh token error:", error);
      return null;
    }
  }
};

export { useRegisterAPI, useLoginAPI, autoLogin, getUserInfo };
