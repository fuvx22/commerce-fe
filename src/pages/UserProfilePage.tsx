import { useAuth } from "@/auth/authContext";
import { Button } from "@/components/ui/button";
import UserForm, { UserFormData } from "@/components/forms/userForm";
import { useUpdateUserAPI } from "@/apis/userAPI";
import EditAvatarDialog from "@/components/EditAvatarDialog";
import { useShowToast } from "@/utils/toats";
import LoadingPanel from "@/components/LoadingPanel";

const UserProfilePage = () => {
  const { showToast } = useShowToast();
  const { logout, loading, user } = useAuth();
  const { isLoading, updateUserRequest } = useUpdateUserAPI();

  if (loading) {
    return <LoadingPanel />;
  }

  const handleSubmit = async (data: UserFormData) => {
    const isSuccessful = await updateUserRequest(data);

    if (isSuccessful) {
      showToast("Cập nhật thông tin thành công","Thông tin của bạn đã được cập nhật", "success");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:max-w-screen-xl gap-5 mx-auto py-2">
      <div className="md:basis-1/4 flex flex-col gap-4 items-center">
        <EditAvatarDialog avatarUrl={user?.imageUrl} />
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
