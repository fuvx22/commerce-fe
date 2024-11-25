import LoginForm, { LoginFormData } from "@/components/forms/LoginForm";
import { useAuth } from "@/auth/authContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const handleLogin = async (data: LoginFormData) => {
    const isSuccessful = await login(data);
    if (isSuccessful) {
      navigate("/profile");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center py-4">
        <LoginForm
          isLoading={loading}
          title="Đăng nhập"
          buttonText="Đăng nhập"
          onSubmit={handleLogin}
        />
      </div>
    </div>
  );
};

export default LoginPage;
