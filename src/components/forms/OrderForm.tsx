import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/auth/authContext";

const formSchema = z.object({
  address: z.string().min(1, "Vui lòng nhập địa chỉ"),
  paymentMethod: z.enum(["0", "1", ""]),
  note: z.string().optional(),
});

export type OrderFormData = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (data: OrderFormData) => void;
  formRef: unknown;
};

const OrderForm = ({ onSubmit, formRef }: Props) => {
  const { user } = useAuth();

  const form = useForm<OrderFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: user?.address || "",
      paymentMethod: "0",
      note: "",
    },
  });

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-gray-50 rounded-lg p-2 md:p-2 w-full md:max-w-[400px]"
      >
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="address">Địa chỉ</FormLabel>
              <FormControl>
                <Input {...field} id="address" />
              </FormControl>
              <FormDescription>
                Kiểm tra lại địa chỉ trước khi xác nhận đặt hàng đơn hàng
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phương thức thanh toán</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl className="bg-white">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phương thức thanh toán" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Thanh toán khi nhận hàng</SelectItem>
                  <SelectItem value="1">Thanh toán bằng VNPay</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="note">Ghi chú</FormLabel>
              <FormControl className="bg-white">
                <Textarea {...field} id="note" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default OrderForm;
