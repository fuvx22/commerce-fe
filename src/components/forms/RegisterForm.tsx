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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingButton from "@/components/LoadingButton";
import { useEffect, useState } from "react";
import Message from "@/components/Message";
import Error from "@/components/Error";

const formSchema = z
  .object({
    firstname: z.string().min(1, "first name is required"),
    lastname: z.string().min(1, "last name is required"),
    email: z.string().email({ message: "invalid email" }),
    password: z.string().min(6, "password must be at least 6 characters"),
    passwordConfirmation: z
      .string()
      .min(6, "password must be at least 6 characters"),
    gender: z.string().min(1, "must select gender"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "passwords do not match",
    path: ["passwordConfirmation"],
  });

export type RegisterFormData = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (RegisterFormData: RegisterFormData) => void;
  isLoading: boolean;
  title?: string;
  buttonText?: string;
  response?: any; 
};


const RegisterForm = ({ onSubmit, isLoading, title, buttonText, response }: Props) => {

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (response && response.statusCode === 200) {
      setMessage("Đăng ký thành công");
      setError(null);
    } else 
    if (response && response.status === 400) {
      setError("Email đã tồn tại!");
      setMessage(null);
    }
  }
  , [response]);


  const form = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-gray-50 rounded-lg p-2 md:p-8 w-full md:max-w-[400px]"
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="flex gap-1">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Họ</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="họ của bạn"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="tên của bạn" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="mật khẩu của bạn"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="xác nhận mật khẩu của bạn"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Giới tính</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="bg-white">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Message message={message} />
        <Error message={error} />

        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="w-full">
            {buttonText}
          </Button>
        )}
        <h4 className="text-center">
          Đã có tài khoản?
          <a href="/login" className="text-blue-500">
            {" "}
            Đăng nhập ngay
          </a>
        </h4>
      </form>
    </Form>
  );
};

export default RegisterForm;
