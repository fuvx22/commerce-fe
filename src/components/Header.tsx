import { Link } from "react-router-dom";
import MainNav from "@/components/MainNav";
import MobileNav from "@/components/MobileNav";

const Header = () => {
  return (
    <div className="border-b-2 p-6 bg-white flex items-center justify-between">
      <Link to={"/"} className="text-2xl font-bold tracking-tight">
        Ecommerce của Phúc Pro
      </Link>
      <div className="hidden md:block">
        <MainNav />
      </div>

      <div className="block md:hidden">
        <MobileNav/>
      </div>
    </div>
  );
};

export default Header;
