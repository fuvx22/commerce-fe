import { Link } from "react-router-dom";
import { useAuth } from "@/auth/authContext";
import UserDropDownMenu from "@/components/UserDropDownMenu";


const MainNav = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="flex gap-3 text-lg items-center">
      <Link to={"/shop"}>
        Shop
      </Link>
      <Link to={"/cart"}>
        Cart
      </Link>
      <span className="text-slate-700">|</span>
      {isAuthenticated ? (
        <UserDropDownMenu  user={user} />
      ) : (
        <Link to={"/login"}>
          Login
        </Link>
      )}
    </div>
  );
};

export default MainNav;
