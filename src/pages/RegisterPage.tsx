import RegisterForm, {
  RegisterFormData,
} from "@/components/forms/RegisterForm";

const RegisterPage = () => {
  return (
    <div>
      <div className="flex justify-center items-center py-4">
        <RegisterForm
          title="Đăng ký tài khoản"
          buttonText="đăng ký"
          isLoading={false}
          onSubmit={(data: RegisterFormData) => console.log("data:", data)}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
