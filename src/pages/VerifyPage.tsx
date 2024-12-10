import { useEffect } from "react";
import { useVerifyEmailAPI } from "@/apis/authAPI";
import { useAuth } from "@/auth/authContext";
import { useNavigate, useSearchParams } from "react-router-dom";

function VerifyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { sendVerifyEmail, verifyEmail } = useVerifyEmailAPI();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!searchParams.get("token")) {
      sendVerifyEmail();
    }
  }, [isAuthenticated, navigate, searchParams, sendVerifyEmail]);

  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (!email || !token) {
      return;
    }

    verifyEmail(token, email);
    console.log("verify email");
  }, [searchParams]);

  return (
    <div className="h-[70%] flex justify-center">
      <div className="text-center mt-16">
        <h1 className="text-4xl font-bold">Xác thực email</h1>
        <p className="text-lg">
          Chúng tôi đã gửi một thư xác thực tới email của bản. Hãy mở email và
          bấm vào link xác thực để hoàn thực.
        </p>
      </div>
    </div>
  );
}

export default VerifyPage;
