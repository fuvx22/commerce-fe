import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ImageUp } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditAvatarForm from "./forms/EditAvatarForm";
import { useState, useRef } from "react";
import { useCloudinaryAPI } from "@/apis/cloudinaryAPI";
import { convertUrlToFile } from "@/utils/utils";
import { useShowToast } from "@/utils/toast";
import { useUpdateUserAPI } from "@/apis/userAPI";
import { useAuth } from "@/auth/authContext";

type Props = {
  avatarUrl: string | null | undefined;
};

const EditAvatarDialog = ({ avatarUrl }: Props) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | null>(
    avatarUrl ?? null
  );
  const [tempAvatarUrl, setTempAvatarUrl] = useState<string | null>(null);
  const { user } = useAuth();
  const { updateUserRequest, isLoading } = useUpdateUserAPI();
  const { isLoading: uploading, uploadImage } = useCloudinaryAPI();
  const { showToast } = useShowToast();

  const handleAvatarChange = (avatarUrl: string | null) => {
    if (!avatarUrl) return;
    setTempAvatarUrl(avatarUrl);
  };

  const handleAvatarSubmit = async () => {
    if (!tempAvatarUrl) return;

    const file = await convertUrlToFile(tempAvatarUrl, "image/jpeg");

    const response = await uploadImage(file);

    if (response.secure_url) {
      await updateUserRequest({
        imageUrl: response.secure_url,
        address: user?.address ?? "",
        birthday: user?.birthOfDate ? user.birthOfDate.toString() : "",
        email: user?.email ?? "",
        fullName: user?.fullName ?? "",
        phoneNumber: user?.phone ?? "",
        role: user?.role ?? "",
      });
      setCurrentAvatarUrl(response.secure_url);
      setTempAvatarUrl(null);
      closeButtonRef.current?.click();
      showToast("Cập nhật ảnh đại diện thành công", "Ảnh đại diện của bạn đã được cập nhật", "success");
    } else {
      showToast(
        "Cập nhật ảnh đại diện thất bại!",
        "Đã có lỗi xảy ra",
        "destructive"
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Avatar className="w-[200px] h-[200px] group rounded-full overflow-hidden relative">
          <AspectRatio ratio={1}>
            <div
              className={`bg-slate-300 h-full w-full opacity-70 hidden group-hover:block absolute top-0 left-0`}
            >
              <button className="w-full h-full flex justify-center items-center">
                <ImageUp className="w-12 h-12 text-white" />
              </button>
            </div>
            <AvatarImage
              src={currentAvatarUrl ?? "https://github.com/shadcn.png"}
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </Avatar>
      </DialogTrigger>

      <DialogContent className=" md:w-[600px]">
        <DialogHeader>
          <DialogTitle>Thay đổi ảnh đại diện</DialogTitle>
          <DialogDescription>
            Chọn ảnh mới cho ảnh đại diện của bạn
          </DialogDescription>
        </DialogHeader>

        <Avatar className="w-[200px] h-[200px] group rounded-full overflow-hidden relative mx-auto">
          <AspectRatio ratio={1}>
            <AvatarImage
              src={tempAvatarUrl ?? ""}
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </Avatar>
        <EditAvatarForm
          onAvatarChange={handleAvatarChange}
          onSubmit={handleAvatarSubmit}
          loading={isLoading || uploading}
        />
      </DialogContent>

      <DialogClose asChild>
        <button ref={closeButtonRef} className="hidden">Close</button>
      </DialogClose>

    </Dialog>
  );
};

export default EditAvatarDialog;
