import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useShowToast } from "@/utils/toast";
import LoadingButton from "@/components/LoadingButton";
import { usePasswordAPI } from "@/apis/authAPI";
import { useEffect } from "react";
import LoadingPanel from "@/components/LoadingPanel";

const formSchema = z
  .object({
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof formSchema>;

const ResetPasswordPage = () => {
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToast } = useShowToast();
  const { isLoading, verifyResetPasswordToken, resetPassword } =
    usePasswordAPI();

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    if (!token || !email) {
      navigate("/400");
      return;
    }
    const fetch = async () => {
      const res = await verifyResetPasswordToken({ email, token });
      if (res.statusCode != 200) {
        navigate("/404");
        return;
      }
    };

    fetch();
  }, []);

  const handleSubmit = async (data: ResetPasswordFormData) => {
    const token = searchParams.get("token") ?? "";
    const email = searchParams.get("email") ?? "";
    const res = await resetPassword({ email, password: data.password, token });

    if (res.statusCode == 200) {
      showToast("Thành công", "Mật khẩu của bạn đã được thay đổi", "success");
      navigate("/login");
    } else {
      showToast(
        "Không thành công",
        "Đã có lỗi xảy ra, vui lòng thử lại sau",
        "destructive"
      );
    }
  };

  return (
    <div className="min-h-[500px] flex p-4 justify-center items-center">
      {isLoading ? (
        <LoadingPanel />
      ) : (
        <Form {...form}>
          <form
            className="bg-gray-100 space-y-4 p-4 rounded-lg w-full md:max-w-[350px]"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <h2 className="text-xl font-semibold">Đặt lại mật khẩu</h2>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">
                    Nhập mật khẩu mới của bạn
                  </FormLabel>
                  <FormControl>
                    <Input {...field} id="password" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="cfpassword">
                    Nhập lại mật khẩu mới của bạn
                  </FormLabel>
                  <FormControl>
                    <Input {...field} id="cfpassword" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading ? (
              <LoadingButton />
            ) : (
              <Button type="submit" className="w-full">
                Gửi
              </Button>
            )}
          </form>
        </Form>
      )}
    </div>
  );
};

export default ResetPasswordPage;
