import { LoginFormData } from "@/components/forms/LoginForm";

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data : LoginFormData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}