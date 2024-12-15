import { useEffect } from "react";
import { useVerifyEmailAPI } from "@/apis/authAPI";
import { useAuth } from "@/auth/authContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useShowToast } from "@/utils/toast";
import LoadingPanel from "@/components/LoadingPanel";

function ProcessVerifyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail, isLoading } = useVerifyEmailAPI();
  const { setUser} = useAuth();
  const { showToast } = useShowToast();


  useEffect(() => {
    const fetch = async () => {
      const email = searchParams.get("email");
      const token = searchParams.get("token");

      if (!email || !token) {
        return;
      }

      const res = await verifyEmail(token, email);

      if (res.statusCode === 200) {
        setUser((prev) => prev && { ...prev, isVerify: true });
        navigate("/profile");
        showToast("Thành công", "Email của bạn đã được xác thực", "success");
      } else {
        navigate("/404");
      }
    };
    fetch();
  }, []);

  if (isLoading) {
    return <LoadingPanel />;
  }

  return (
    <></>
  );
}

export default ProcessVerifyPage;
