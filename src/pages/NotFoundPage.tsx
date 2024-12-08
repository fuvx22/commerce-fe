import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
    {/* bg-[url('https://res.cloudinary.com/mern-odering-app-3457/image/upload/c_fill,w_150,h_200,ar_3:4/v1732896103/otcsngz5qxavlaxqt8om.jpg')] */}
      <div
        className="
    bg-gray-100
    bg-repeat 
    bg-center
    opacity-50
    h-screen md:h-[732px] mt-2 rounded-2xl
    relative
    "
      ></div>
      <div
        className="flex flex-col items-center justify-center 
      absolute  z-10 text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      "
      >
        <h1 className="text-9xl font-bold">404</h1>
        <h2 className="text-3xl font-semibold">Trang không tồn tại</h2>
        <Link to="/" className="hover:underline text-blue-700">
          Quay lại trang chủ
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
