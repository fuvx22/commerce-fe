import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/authContext";

type Props = {
  children: React.ReactNode;
  type?: string;
};

export const PrivateRoute = ({ children, type }: Props) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (type === "guest" && isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  if (!type && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
