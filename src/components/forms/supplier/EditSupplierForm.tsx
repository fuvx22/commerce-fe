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
import { useUpdateSupplier } from "@/apis/supplierAPI";
import { Textarea } from "@/components/ui/textarea";
import { Supplier } from "@/types/entity";
import { useShowToast } from "@/utils/toast";

type Props = {
  onSubmit: () => void;
  selectedSupplier: Supplier | null;
};

const formSchema = z.object({
  name: z.string().min(1, "Tên nhà cung cấp không được để trống"),
  supplierContact: z.string().min(1, "Liên hệ không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
});

export type EditSupplierFormData = z.infer<typeof formSchema>;

const EditSupplierForm = ({ onSubmit, selectedSupplier }: Props) => {
  const form = useForm<EditSupplierFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...selectedSupplier,
    },
  });

  const { updateSupplier, isLoading } = useUpdateSupplier();
  const { showToast } = useShowToast();

  const handleSubmit = async (data: EditSupplierFormData) => {
    const res = await updateSupplier({
      ...data,
      id: selectedSupplier?.id ?? "",
    } as Supplier);

    if (res) {
      showToast(
        "Cập nhật nhà cung cấp thành công",
        "Nhà cung cấp đã được cập nhật!",
        "success"
      );
      onSubmit();
    } else {
      showToast(
        "Cập nhật nhà cung cấp thất bại",
        "Đã xảy ra lỗi khi cập nhật nhà cung cấp!",
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

export default EditSupplierForm;
