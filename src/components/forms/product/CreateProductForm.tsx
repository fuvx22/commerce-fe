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
import { Textarea } from "@/components/ui/textarea";
import { useShowToast } from "@/utils/toats";
import { useCreateProduct } from "@/apis/productAPI";
import { useGetCategories } from "@/apis/categoryAPI";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { useEffect, useState } from "react";

type Props = {
  onSubmit: () => void;
};

const formSchema = z
  .object({
    name: z.string().min(1, "Tên sản phẩm không được để trống"),
    productNameAlias: z.string().min(1, "Tên bí danh không được để trống"),
    categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
    price: z.coerce.number().gte(1, "Không được bỏ trống giá"),
    imageUrl: z.string().optional(),
    imageFile: z
      .instanceof(File, { message: "Hình ảnh là bắt buộc" })
      .optional(),
    productDate: z.string().optional(),
    discount: z.coerce.number().optional(),
    views: z.coerce.number().gte(0, "Khoảng giảm giá không hợp lệ"),
    description: z.string().min(1, "Mô tả không được để trống"),
    supplierId: z.any().optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Hình ảnh hoặc file ảnh là bắt buộc",
    path: ["imageFile"],
  });
export type CreateProductFormData = z.infer<typeof formSchema>;

const CreateProductForm = ({ onSubmit }: Props) => {
  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      productNameAlias: "",
      categoryId: "",
      price: 0,
      imageUrl: "",
      imageFile: undefined,
      productDate: "",
      discount: 0,
      description: "",
      views: 0,
      supplierId: null,
    },
  });

  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const { showToast } = useShowToast();
  const { createProduct, isLoading } = useCreateProduct();
  const { getCategories, categories } = useGetCategories();

  const handleSubmit = async (data: CreateProductFormData) => {
    const res = await createProduct(data);

    if (res) {
      showToast(
        "Tạo sản phẩm thành công",
        "Sản phẩm đã được tạo mới!",
        "success"
      );
      onSubmit();
    } else {
      showToast(
        "Tạo sản phẩm thất bại",
        "Đã xảy ra lỗi khi tạo mới sản phẩm!",
        "destructive"
      );
    }
  };

  useEffect(()=>{
    getCategories();
  },[])

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
              <FormLabel>Tên sản phẩm</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Tên sản phẩm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-1">
          <FormField
            control={form.control}
            name="productNameAlias"
            render={({ field }) => (
              <FormItem className="flex-1">
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
            name="views"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng sản phẩm</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Số lượng" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Danh mục sản phẩm</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-1">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Giá" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giảm giá</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Giảm giá( đơn vị %)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày sản xuất</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                    type="date"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-8">
          {currentImageUrl && (
            <div className="basis-1/5 max-h-[68px] order-2">
              <img
                src={currentImageUrl}
                alt="restaurant img"
                className="rounded-md object-cover w-full h-full"
              />
            </div>
          )}
          <FormField
            control={form.control}
            name="imageFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link ảnh</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    className="bg-white"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      field.onChange(file);
                      if (file) {
                        setCurrentImageUrl(URL.createObjectURL(file));
                      } else {
                        setCurrentImageUrl(null);
                      }
                    }}
                    placeholder="File ảnh"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Mô tả" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="supplierId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhà cung cấp</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nhà cung cấp" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="supplierId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhà cung cấp</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn nhà cung cấp" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit">Thêm mới</Button>
        )}
      </form>
    </Form>
  );
};

export default CreateProductForm;
