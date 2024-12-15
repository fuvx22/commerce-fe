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
import { useCreateCategory } from "@/apis/categoryAPI";
import { Textarea } from "@/components/ui/textarea";
import { useShowToast } from "@/utils/toast";


type Props = {
  onSubmit: () => void;
};

const formSchema = z.object({
  name: z.string().min(1, "Tên danh mục không được để trống"),
  categoryAliasName: z.string().min(1, "Tên bí danh không được để trống"),
  description: z.string().min(1, "Mô tả không được để trống"),
  imageUrl: z.string().optional(),
});

export type CreateCategoryFormData = z.infer<typeof formSchema>;

const CreateCategoryForm = ({ onSubmit }: Props) => {
  const form = useForm<CreateCategoryFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      categoryAliasName: "",
      description: "",
    },
  });

  const { isLoading, createCategory } = useCreateCategory();
  const { showToast } = useShowToast();

  const handleSubmit = async (data: CreateCategoryFormData) => {
    const res = await createCategory(data);

    if (res) {
      showToast("Tạo danh mục thành công", "Danh mục đã được tạo mới!", "success");
      onSubmit();
    } else {
      showToast("Tạo danh mục thất bại", "Đã xảy ra lỗi khi tạo mới danh mục!", "destructive");
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
              <FormLabel>Tên danh mục</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Tên danh mục" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryAliasName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên bí danh alias</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Tên bí danh alias" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Mô tả danh mục" />
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

export default CreateCategoryForm;
