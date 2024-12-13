import { useEffect } from "react";
import { useVerifyEmailAPI } from "@/apis/authAPI";
import { useAuth } from "@/auth/authContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useShowToast } from "@/utils/toast";

function VerifyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { sendVerifyEmail, verifyEmail } = useVerifyEmailAPI();
  const { setUser, user, loading, isAuthenticated } = useAuth();
  const { showToast } = useShowToast();

  useEffect(() => {
    const fetch = async () => {
      const email = searchParams.get("email");
      const token = searchParams.get("token");

      if (user?.isVerify) {
        navigate("/profile");
        return;
      }

      if (!isAuthenticated) {
        navigate("/");
        return;
      }

      if (!email || !token) {
        await sendVerifyEmail();
      }
    };

    if (!loading) {
      fetch();
    }
  }, [loading]);

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


  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="h-[70%] flex justify-center">
          <div className="text-center mt-16">
            <h1 className="text-4xl font-bold">Xác thực email</h1>
            <p className="text-lg">
              Chúng tôi đã gửi một thư xác thực tới email của bản. Hãy mở email
              và bấm vào link xác thực để hoàn thực.
            </p>
            <Button className="mt-5"
              onClick={async () => {
                location.reload();
              }}
            >
              Nếu đã xác thực email, bấm vào đây
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default VerifyPage;
