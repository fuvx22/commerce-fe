import RegisterForm, {
  RegisterFormData,
} from "@/components/forms/RegisterForm";

import { useRegisterAPI } from "@/apis/authAPI";

const RegisterPage = () => {

  const { isLoading, error, response, registerRequest } = useRegisterAPI();

  return (
    <div>
      <div className="flex justify-center items-center py-4">
        <RegisterForm
          title="Đăng ký tài khoản"
          buttonText="đăng ký"
          isLoading={isLoading}
          onSubmit={(data: RegisterFormData) => registerRequest(data)}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
