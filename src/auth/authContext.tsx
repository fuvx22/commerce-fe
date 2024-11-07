import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "@/types/auth";
import { LoginFormData } from "@/components/forms/LoginForm";
import { useLoginAPI, autoLogin } from "@/apis/authAPI";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const { loginRequest } = useLoginAPI();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await autoLogin();

      if (res) {
        setUser(res.data as User);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (data: LoginFormData) => {
    setLoading(true);

    const res = await loginRequest(data);

    if (res && res.statusCode === 200) {
      localStorage.setItem("access-token", res.data.accessToken);
      localStorage.setItem("refresh-token", res.data.refreshToken);
      setUser(res.data.user as User);
      setIsAuthenticated(true);
    }

    if (res && res.Status === 400) {
      setMessage(res.Title);
    }
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
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
