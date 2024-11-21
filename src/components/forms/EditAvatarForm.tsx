import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
const MAX_FILE_SIZE = 1000 * 1024; // 1MB

type Props = {
  onAvatarChange: (avatarUrl: string | null) => void;
  onSubmit: () => void;
  loading: boolean;
};

const formSchema = z.object({
  image: z.any(),
});

const formSchemaValidator = z.object({
  image: z
    .instanceof(File) // Validate actual File object
    .refine((file) => file.size > 0, { message: "File is required" })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Dung lượng file không được vượt quá 1MB",
    }),
});

const EditAvatarForm = ({ onAvatarChange, onSubmit, loading }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(true);

  const handleAvatarChange = (file: Blob | MediaSource | null) => {
    if (!file) return;
    const validateResult = formSchemaValidator.safeParse({ image: file });

    if (!validateResult.success) {
      form.setError("image", {
        type: "manual",
        message: validateResult.error.errors[0].message,
      });
      setDisabled(true);
    } else {
      form.clearErrors("image");
      setDisabled(false);
    }

    const imgUrl = URL.createObjectURL(file);
    setImageUrl(imgUrl);
    onAvatarChange(imgUrl);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => onSubmit())}>
        <div className="flex-col space-y-2">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="image">Ảnh đại diện</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="image"
                    type="file"
                    onChange={(e) => {
                      handleAvatarChange(
                        e.target.files ? e.target.files[0] : null
                      );
                    }}
                    accept="image/png, image/jpeg, image/webp"
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end"> 
            {loading ? (
              <div>
                <LoadingButton />
              </div>
            ) : (
              <Button disabled={disabled} type="submit">
                Cập nhật
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditAvatarForm;
