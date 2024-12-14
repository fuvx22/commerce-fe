import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/authContext";
import LoadingPanel from "@/components/LoadingPanel";

type Props = {
  children: React.ReactNode;
  type?: string;
};

export const PrivateRoute = ({ children, type }: Props) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <LoadingPanel />;
  }

  if (type === "guest" && isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  if (type === "admin" && user?.role !== "Admin") {
    return <Navigate to="/" />;
  }

  if (!type && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!type && isAuthenticated && user?.role !== "Admin" && !user?.isVerify) {
    return <Navigate to="/require-verify-email" />;
  }

  return <>{children}</>;
};
