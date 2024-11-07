import { LoginFormData } from "@/components/forms/LoginForm";

export interface User {
    address: string | null;
    birthday: unknown | null;
    email: string;
    fullName: string;
    imageUser: string | null;
    phoneNumber: string | null;
    role: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data : LoginFormData) => Promise<void | string>;
  logout: () => void;
  isAuthenticated: boolean;
  message: string | null;
}