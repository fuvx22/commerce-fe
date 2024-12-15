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
import { useUpdateCategory } from "@/apis/categoryAPI";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/types/entity";
import { useShowToast } from "@/utils/toast";

type Props = {
  onSubmit: () => void;
  selectedCategory: Category | null;
};

const formSchema = z.object({
  name: z.string().min(1, "Tên danh mục không được để trống"),
  categoryAliasName: z.string().min(1, "Tên bí danh không được để trống"),
  description: z.string().min(1, "Mô tả không được để trống"),
  imageUrl: z.string().optional(),
});

export type EditCategoryFormData = z.infer<typeof formSchema>;

const EditCategoryForm = ({ onSubmit, selectedCategory }: Props) => {
  const form = useForm<EditCategoryFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...selectedCategory,
    },
  });

  const { isLoading, updateCategory } = useUpdateCategory();
  const { showToast } = useShowToast();

  const handleSubmit = async (data: EditCategoryFormData) => {
    const res = await updateCategory({
      ...data,
      id: selectedCategory?.id ?? "",
    });

    if (res) {
      showToast("Cập nhật danh mục thành công", "Danh mục đã được cập nhật!", "success");
      onSubmit();
    } else {
      showToast("Cập nhật danh mục thất bại", "Đã xảy ra lỗi khi cập nhật danh mục", "destructive");
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
          <Button type="submit">Cập nhật</Button>
        )}
      </form>
    </Form>
  );
};

export default EditCategoryForm;
