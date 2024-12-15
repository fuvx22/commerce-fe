import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";
import Error from "@/components/Error";
import { useAuth } from "@/auth/authContext";
import { useEffect, useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "invalid email" }),
  password: z.string().min(6, "password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (loginFormData: LoginFormData) => void;
  isLoading: boolean;
  title?: string;
  buttonText?: string;
};

const LoginForm = ({ onSubmit, isLoading, title, buttonText }: Props) => {
  const { message } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(message);
  }, [message]);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-gray-50 rounded-lg p-2 md:p-8 w-full md:max-w-[400px]"
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="email của bạn" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="password của bạn"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Error message={error} />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="w-full">
            {buttonText}
          </Button>
        )}
        <div className="space-y-1 text-sm">
          <h4 className="text-center">
            Chưa có tài khoản?
            <a href="/register" className="text-blue-500">
              {" "}
              Đăng ký ngay
            </a>
          </h4>
          <h4 className="text-center">
            Quên mật khẩu?
            <a href="/submit-mail" className="text-blue-500">
              {" "}
              Khôi phục mật khẩu
            </a>
          </h4>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
