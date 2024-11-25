import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "@/types/auth";
import { LoginFormData } from "@/components/forms/LoginForm";
import { useLoginAPI, autoLogin, getUserInfo } from "@/apis/authAPI";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const { loginRequest } = useLoginAPI();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await autoLogin();

      if (res) {
        setUser(res as User);
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (data: LoginFormData): Promise<boolean> => {
    setLoading(true);
    let isSuccessful = false;

    const res = await loginRequest(data);

    if (res && res.Status === 400) {
      setMessage(res.Title);
    }
    if (res && res.statusCode === 200) {
      localStorage.setItem("access-token", res.data.accessToken);
      localStorage.setItem("refresh-token", res.data.refreshToken);
      isSuccessful = true;

      const userData = await getUserInfo();

      setUser(userData as User);
      setMessage(null);
    }
    setLoading(false);
    return isSuccessful;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    message,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
