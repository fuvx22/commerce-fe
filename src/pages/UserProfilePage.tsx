import { useAuth } from "@/auth/authContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import UserForm from "@/components/forms/userForm";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const UserProfilePage = () => {
  const { logout, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row md:max-w-screen-xl gap-5 mx-auto py-2">
      <div className="md:basis-1/4 flex flex-col gap-4 items-center">
        <Avatar className="w-[200px] h-[200px]">
          <AspectRatio ratio={1}>
            <AvatarImage src="https://github.com/shadcn.png" className="w-full h-full" />
          </AspectRatio>
        </Avatar>
        <div>
          <Button className="bg-red-500" onClick={logout}>Đăng xuất</Button>
        </div>
      </div>
      <div className="flex-1">
        <UserForm
          onSubmit={() => {}}
          isLoading={loading}
          title="Thông tin cá nhân"
          buttonText="Cập nhật" 
        />
      </div>
    </div>
  );
};

export default UserProfilePage;
