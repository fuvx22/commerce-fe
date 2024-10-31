import LoginForm, { LoginFormData } from "@/components/forms/LoginForm";
import { useAuth } from "@/auth/authContext";

const LoginPage = () => {
    const { login, loading } = useAuth();
    return (
        <div>
            <div className="flex justify-center items-center py-4">
              <LoginForm isLoading={loading} title="Đăng nhập" buttonText="Đăng nhập" onSubmit={(data : LoginFormData) => login(data)} />
            </div>
        </div>
    );
}

export default LoginPage;