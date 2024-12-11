import { LoginFormData } from "@/components/forms/LoginForm";

export interface User {
  address: string | null;
  birthOfDate: Date | null;
  email: string;
  fullName: string;
  imageUrl: string | null;
  phone: string | null;
  role: string;
  isVerify: boolean;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | unknown) => void;
  loading: boolean;
  login: (data: LoginFormData) => Promise<boolean | void>;
  logout: () => void;
  isAuthenticated: boolean;
  message: string | null;
}
