import { useAuth } from "@/auth/authContext";
import { Button } from "@/components/ui/button";
import UserForm, { UserFormData } from "@/components/forms/userForm";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ImageUp } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUpdateUserAPI } from "@/apis/userAPI";
import { useToast } from "@/hooks/use-toast"


const UserProfilePage = () => {
  const { toast } = useToast();
  const { logout, loading, user } = useAuth();
  const { isLoading, updateUserRequest } = useUpdateUserAPI();

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (data: UserFormData) => {
    await updateUserRequest(data);
    toast({
      title: "Cập nhật thông tin thành công",
      description: "Thông tin cá nhân đã được cập nhật",
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:max-w-screen-xl gap-5 mx-auto py-2">
      <div className="md:basis-1/4 flex flex-col gap-4 items-center">
        <Avatar className="w-[200px] h-[200px] group rounded-full overflow-hidden relative">
          <AspectRatio ratio={1}>
            <div
              className={`bg-slate-300 h-full w-full opacity-70 hidden group-hover:block absolute top-0 left-0`}
            >
              <button
                className="w-full h-full flex justify-center items-center"
                onClick={() => console.log("change avatar")}
              >
                <ImageUp className="w-12 h-12 text-white" />
              </button>
            </div>
            <AvatarImage
              src={user?.imageUrl ?? "https://github.com/shadcn.png"}
              className="w-full h-full"
            />
          </AspectRatio>
        </Avatar>
        <div>
          <Button className="bg-red-500" onClick={logout}>
            Đăng xuất
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <UserForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          title="Thông tin cá nhân"
          buttonText="Cập nhật"
        />
      </div>
    </div>
  );
};

export default UserProfilePage;
