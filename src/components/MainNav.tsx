import { Link } from "react-router-dom";
import { useAuth } from "@/auth/authContext";
import UserDropDownMenu from "@/components/UserDropDownMenu";
import { ShoppingCart } from "lucide-react";
import AdminMenuDropdown from "@/components/AdminMenuDropdown";
import SearchSection from "@/components/SearchSection";

const MainNav = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="flex gap-3 items-center">
      <Link to={"/shop"}>Shop</Link>
      <Link to={"/cart"}>
        <ShoppingCart />
      </Link>
      <SearchSection />
      <span className="text-slate-400">|</span>
      {isAuthenticated && user?.role === "Admin" && (
        <>
          <AdminMenuDropdown />
          <span className="text-slate-400">|</span>
        </>
      )}

      {isAuthenticated ? (
        <UserDropDownMenu user={user} />
      ) : (
        <>
          <Link to={"/login"}>Login</Link>
          <span className="text-slate-400">|</span>
          <Link to={"/register"}>Register</Link>
        </>
      )}
    </div>
  );
};

export default MainNav;
