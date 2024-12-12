import { useAuth } from "@/auth/authContext";
import { Button } from "@/components/ui/button";
import UserForm, { UserFormData } from "@/components/forms/userForm";
import { useUpdateUserAPI } from "@/apis/userAPI";
import EditAvatarDialog from "@/components/EditAvatarDialog";
import { useShowToast } from "@/utils/toast";
import LoadingPanel from "@/components/LoadingPanel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ChangePasswordForm, {
  changePasswordFormData,
} from "@/components/forms/ChangePasswordForm";
import { useState } from "react";
import { usePasswordAPI } from "@/apis/authAPI";

const UserProfilePage = () => {
  const { showToast } = useShowToast();
  const { logout, loading, user, setUser } = useAuth();
  const { isLoading, updateUserRequest } = useUpdateUserAPI();
  const { changePassword, isLoading: isChangePasswordLoading } =
    usePasswordAPI();
  const [openChangePassword, setOpenChangePassword] = useState(false);

  if (loading) {
    return <LoadingPanel />;
  }

  const handleSubmit = async (data: UserFormData) => {
    const isSuccessful = await updateUserRequest(data);

    setUser((prev) => ({ ...prev, ...data }));

    if (isSuccessful) {
      showToast(
        "Cập nhật thông tin thành công",
        "Thông tin của bạn đã được cập nhật",
        "success"
      );
    }
  };

  const handlePasswordChange = async (data: changePasswordFormData) => {
    const res = await changePassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
    if (res.statusCode === 200) {
      showToast("Thành công", "Mật khẩu của bạn đã được thay đổi", "success");
      setOpenChangePassword(false);
      return;
    } else {
      showToast("Thất bại", res.Title as string, "destructive");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:max-w-screen-xl gap-5 mx-auto py-2">
      <div className="md:basis-1/4 flex flex-col gap-4 items-center">
        <EditAvatarDialog avatarUrl={user?.imageUrl} />
        <div className="flex flex-col gap-2">
          <Button
            className="bg-blue-700"
            onClick={() => setOpenChangePassword(true)}
          >
            Đổi mật khẩu
          </Button>
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
      <Dialog open={openChangePassword} onOpenChange={setOpenChangePassword}>
        <DialogContent>
          <ChangePasswordForm
            isLoading={isChangePasswordLoading}
            title="Đổi mật khẩu"
            buttonText="Đổi mật khẩu"
            onSubmit={handlePasswordChange}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfilePage;
