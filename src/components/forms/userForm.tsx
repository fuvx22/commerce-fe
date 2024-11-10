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
import { useAuth } from "@/auth/authContext";

const formSchema = z.object({
  address: z.string().nullable(),
  birthday: z.string().nullable(),
  email: z.string().email(),
  fullName: z.string(),
  imageUser: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  role: z.string(),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (userData: UserFormData) => void;
  isLoading: boolean;
  title?: string;
  buttonText?: string;
};

const UserForm = ({ onSubmit, isLoading, title, buttonText }: Props) => {
  const { loading, user } = useAuth();


  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: user?.address,
      birthday: user?.birthday
        ? user.birthday.toISOString().split("T")[0]
        : null,
      email: user?.email,
      fullName: user?.fullName,
      imageUser: user?.imageUser,
      phoneNumber: user?.phoneNumber,
      role: user?.role,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-gray-50 rounded-lg p-2 md:p-8 w-full"
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Địa chỉ</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="địa chỉ"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ngày sinh</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="sinh nhật"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="họ và tên"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="imageUser"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ảnh đại diện</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="ảnh đại diện"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="số điện thoại"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vai trò</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="vai trò"
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
      </form>
    </Form>
  );
};

export default UserForm;
