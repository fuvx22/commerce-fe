import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="border-b-2 p-5 bg-blue-600 flex align-items-center">
      <Link to={"/"} className="text-white text-2xl font-bold tracking-tight">
        Ecommerce của Phúc Pro
      </Link>
      <div className="flex-1 flex justify-end gap-3 text-lg">
      <Link to={"/profile"} className="text-white">
        Profile
      </Link>
      <Link to={"/shop"} className="text-white">
        Shop
      </Link>
      </div>

    </div>
  )
}

export default Header;