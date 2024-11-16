import { LoginFormData } from "@/components/forms/LoginForm";

export interface User {
  address: string | null;
  birthOfDate: Date | null;
  email: string;
  fullName: string;
  imageUrl: string | null;
  phone: string | null;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginFormData) => Promise<void | string>;
  logout: () => void;
  isAuthenticated: boolean;
  message: string | null;
}
