import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/types/auth";
import { useAuth } from "@/auth/authContext";
import { Link } from "react-router-dom";

const UserDropDownMenu: React.FC<{ user: User | null }> = ({ user }) => {
  const { logout } = useAuth();

  return (
    <DropdownMenu>
      <span className="text-base font-semibold">{user?.fullName}</span>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8 cursor-pointer border">
          <AvatarImage
            className="object-cover"
            src={user?.imageUrl ?? "https://github.com/shadcn.png"}
            alt="@shadcn"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link to={"/profile"}>Tài khoản của tôi</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={"/my-orders"}>Đơn hàng của tôi</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={"/my-payments"}>Lịch sử giao dịch</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button onClick={() => logout()} variant="destructive">
            Đăng xuất
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDownMenu;
