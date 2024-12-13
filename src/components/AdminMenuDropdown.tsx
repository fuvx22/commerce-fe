import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const AdminMenuDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">Quản trị</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem>
          <Link to={"/category-management"}>Quản lý danh mục</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={"/product-management"}>Quản lý sản phẩm</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={"/invoice-management"}>Quản lý đơn hàng</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={"/payment-management"}>DS giao dịch thanh toán</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminMenuDropdown;
