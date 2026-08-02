import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hashParams = new URLSearchParams(
      window.location.hash.substring(1)
    );

    const tokenFromUrl = hashParams.get("token");
    const existingToken = localStorage.getItem("accessToken");

    // First execution me URL wala token milega.
    // StrictMode ke second execution me stored token use hoga.
    const token = tokenFromUrl || existingToken;

    if (!token) {
      navigate("/login?error=oauth_failed", { replace: true });
      return;
    }

    localStorage.setItem("accessToken", token);

    // Hash tabhi remove karo jab URL se token mila ho
    if (tokenFromUrl) {
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );
    }

    navigate("/live-sessions", { replace: true });
  }, [navigate]);

  return <div>Signing you in...</div>;
};

export default OAuthCallback;