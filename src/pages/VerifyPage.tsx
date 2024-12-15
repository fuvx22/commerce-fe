import { useEffect } from "react";
import { useVerifyEmailAPI } from "@/apis/authAPI";
import { useAuth } from "@/auth/authContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoadingPanel from "@/components/LoadingPanel";

function VerifyPage() {
  const navigate = useNavigate();
  const { sendVerifyEmail, isLoading } = useVerifyEmailAPI();
  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      if (user?.isVerify) {
        navigate("/profile");
        return;
      }

      if (!isAuthenticated) {
        navigate("/");
        return;
      }

      await sendVerifyEmail();
    };

    if (!loading) {
      fetch();
    }
  }, [loading]);

  if (isLoading) {
    return <LoadingPanel />;
  }

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
            <Button
              className="mt-5"
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
