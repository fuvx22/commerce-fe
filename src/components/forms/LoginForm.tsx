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
import LoadingButton from "../LoadingButton";

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
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="w-full">
            {buttonText}
          </Button>
        )}
        <h4 className="text-center">
          Chưa có tài khoản?
          <a href="/register" className="text-blue-500"> Đăng ký ngay</a>
        </h4>
      </form>
    </Form>
  );
};

export default LoginForm;