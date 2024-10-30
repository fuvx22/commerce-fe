import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/authContext";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";

const MobileNav = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={26} className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {isAuthenticated ? `Hello, ${user?.name}` : "Hello, Guest"}
          </SheetTitle>
        </SheetHeader>
        {isAuthenticated ? (
          <div className="flex flex-col gap-3">
            <SheetClose asChild>
              <Link to="/shop" className="flex bg-white font-bold items-center">
                Shop
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to="/cart" className="flex bg-white font-bold items-center">
                Cart
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                to="/account"
                className="flex bg-white font-bold items-center"
              >
                Tài khoản của tôi
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                to="/billing"
                className="flex bg-white font-bold items-center"
              >
                Đơn hàng của tôi
              </Link>
            </SheetClose>

            <div className="border-t border-gray-200" />
            <Button
              onClick={() => logout()}
              className="flex items-center px-3 font-bold bg-red-500 hover:bg-red-700"
            >
              Log Out
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <Button>
              <SheetClose asChild>
                <Link className="w-full" to="/login">
                  Login
                </Link>
              </SheetClose>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
