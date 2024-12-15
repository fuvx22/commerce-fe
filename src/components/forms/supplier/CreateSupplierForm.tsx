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
import { useCreateSupplier } from "@/apis/supplierAPI";
import { Textarea } from "@/components/ui/textarea";
import { useShowToast } from "@/utils/toast";
import { Supplier } from "@/types/entity";

type Props = {
  onSubmit: () => void;
};

const formSchema = z.object({
  name: z.string().min(1, "Tên nhà cung cấp không được để trống"),
  supplierContact: z.string().min(1, "Liên hệ không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
});

export type CreateSupplierFormData = z.infer<typeof formSchema>;

const CreateSupplierForm = ({ onSubmit }: Props) => {
  const form = useForm<CreateSupplierFormData>({
    resolver: zodResolver(formSchema),
  });

  const { createSupplier, isLoading } = useCreateSupplier();
  const { showToast } = useShowToast();

  const handleSubmit = async (data: CreateSupplierFormData) => {
    const res = await createSupplier(data as Supplier);

    if (res) {
      showToast(
        "Tạo nhà cung cấp thành công",
        "Nhà cung cấp đã được tạo mới!",
        "success"
      );
      onSubmit();
    } else {
      showToast(
        "Tạo nhà cung cấp thất bại",
        "Đã xảy ra lỗi khi tạo mới nhà cung cấp!",
        "destructive"
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col space-y-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên nhà cung cấp</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Tên nhà cung cấp" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supplierContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thông tin liên hệ</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Thông tin liên hệ của nhà cung cấp"
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
                  type="email"
                  placeholder="Email của nhà cung cấp"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Số điện thoại của nhà cung cấp"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Địa chỉ của nhà cung cấp" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit">Thêm mới</Button>
        )}
      </form>
    </Form>
  );
};

export default CreateSupplierForm;
