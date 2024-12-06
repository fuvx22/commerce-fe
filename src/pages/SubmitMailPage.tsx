import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useShowToast } from "@/utils/toast";
import LoadingButton from "@/components/LoadingButton";
import { usePasswordAPI } from "@/apis/authAPI";

const formSchema = z.object({
  email: z.string().email({ message: "Vui lòng nhập email " }),
});

export type SubmitMailFormData = z.infer<typeof formSchema>;

const SubmitMailPage = () => {
  const form = useForm<SubmitMailFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { showToast } = useShowToast();
  const { isLoading, sendResetPasswordEmail } = usePasswordAPI();

  const handleSubmit = async (data: SubmitMailFormData) => {
    try {
      await sendResetPasswordEmail(data);
      showToast("Thành công", "Vui lòng kiểm tra email để đặt lại mật khẩu", "success");
    } catch (error) {
      console.error(error);
      showToast(
        "Không thành công",
        "Đã có lỗi xảy ra, vui lòng thử lại sau",
        "destructive"
      );
    }
  };

  return (
    <div className="min-h-[500px] flex p-4 justify-center items-center">
      <Form {...form}>
        <form
          className="bg-gray-100 space-y-4 p-4 rounded-lg flex flex-col items-center"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input {...field} id="email" type="email" />
                </FormControl>
                <FormDescription>
                  Nhập email của bạn để khôi phục mật khẩu.
                </FormDescription>
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
    </div>
  );
};

export default SubmitMailPage;
