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

const formSchema = z
  .object({
    oldPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    newPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"],
  });

export type changePasswordFormData = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (changePasswordFormData: changePasswordFormData) => void;
  isLoading: boolean;
  title?: string;
  buttonText?: string;
};

const ChangePasswordForm = ({
  onSubmit,
  isLoading,
  title,
  buttonText,
}: Props) => {

  const form = useForm<changePasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-gray-100 rounded-lg p-2 md:p-4 w-full"
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="old-password">
                Nhập mật khẩu hiện tại của bạn
              </FormLabel>
              <FormControl>
                <Input {...field} id="old-password" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="new-password">
                Nhập mật khẩu mới của bạn
              </FormLabel>
              <FormControl>
                <Input {...field} id="new-password" type="password" />
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
            {buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
