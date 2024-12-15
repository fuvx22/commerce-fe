import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingPanel from "@/components/LoadingPanel";
import { useUserAPI } from "@/apis/userAPI";
import { User } from "@/types/auth";
import { format } from "date-fns";
import { CircleCheck, CircleX, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useShowToast } from "@/utils/toast";

const DEFAULT_AVATAR = import.meta.env.VITE_DEFAULT_AVATAR_URL;

const UserManagePage = () => {
  const { showToast } = useShowToast();
  const { getAllUsers, isLoading, deleteUser, switchUserRole } = useUserAPI();
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const idToDelete = useRef<string>("");

  const fetch = async () => {
    const res = await getAllUsers(fullName, email);

    if (res.statusCode === 200) {
      setUsers(res.data);
    }
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetch();
    }, 400);
    return () => clearTimeout(delaySearch);
  }, [email, fullName]);

  const openDeleteConfirmDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteUser = async (id: string) => {
    if (id) {
      deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
    showToast("Xóa người dùng thành công", "Người dùng đã được xóa!", "success");
  };

  return (
    <div className=" px-2">
      <h1 className="text-xl py-2">Quản lý tài khoản</h1>
      <h2 className="text-gray-600 text-sm pb-2">
        Quản lý tài khoản người dùng tại đây, có thể xem thông tin, xóa hoặc cấp
        quyền cho người dùng.
      </h2>

      <div className="flex gap-2 md:w-1/2">
        <span className="relative flex items-center md:basis-[300px]">
          <Input
            placeholder="Tìm kiếm theo email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email && (
            <X
              size={18}
              className="text-gray-400 cursor-pointer absolute right-2"
              onClick={() => setEmail("")}
            />
          )}
        </span>
        <span className="relative flex items-center md:basis-[300px]">
          <Input
            placeholder="Tìm kiếm theo tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {fullName && (
            <X
              size={18}
              className="text-gray-400 cursor-pointer absolute right-2"
              onClick={() => setFullName("")}
            />
          )}
        </span>
      </div>

      <div className="min-h-[568px]">
        {isLoading ? (
          <LoadingPanel />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Hình ảnh</TableHead>
                <TableHead>SĐT</TableHead>
                <TableHead>Ngày sinh</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Xác thực</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <img
                      src={user.imageUrl ?? DEFAULT_AVATAR}
                      alt="avatar"
                      className="w-10 h-10 rounded object-cover"
                    />
                  </TableCell>
                  <TableCell>
                    {user.phone ? user.phone : "Chưa cập nhật"}
                  </TableCell>
                  <TableCell>
                    {user.birthOfDate
                      ? format(user.birthOfDate, "dd-MM-yyyy")
                      : "Chưa cập nhật"}
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger>
                          {user.isVerify ? (
                            <CircleCheck size={24} className="text-green-500" />
                          ) : (
                            <CircleX size={24} className="text-red-500" />
                          )}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {user.isVerify ? "Đã xác thực" : "Chưa xác thực"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <button
                        className="text-blue-500 border border-1 rounded p-1 hover:bg-blue-500 hover:text-white w-[145px]"
                        onClick={async () => {
                          if (user.id) {
                            switchUserRole(user.id, user.role);
                            setUsers((prev) =>
                              prev.map((u) => {
                                if (u.id === user.id) {
                                  return {
                                    ...u,
                                    role: u.role === "Admin" ? "User" : "Admin",
                                  };
                                }
                                return u;
                              })
                            );
                          }
                        }}
                      >
                        {user.role === "Admin"
                          ? "Chuyển thành User"
                          : "Chuyển thành Admin"}
                      </button>
                      <button
                        className="text-red-500 border border-1 rounded p-1 hover:bg-red-500 hover:text-white"
                        onClick={() => {
                          if (user.id) {
                            idToDelete.current = user.id;
                            openDeleteConfirmDialog();
                          }
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <ConfirmDialog
          onCancel={() => setIsDeleteDialogOpen(false)}
          onConfirm={() => {
            handleDeleteUser(idToDelete.current);
            setIsDeleteDialogOpen(false);
          }}
          open={isDeleteDialogOpen}
          message="Bạn có chắc chắn muốn xóa người dùng này?"
        />
      </div>
    </div>
  );
};

export default UserManagePage;
