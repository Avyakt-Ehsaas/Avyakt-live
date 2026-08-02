import {
  CheckCircle2,
  CircleAlert,
  XCircle,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MessagePage from "./MessagePage.jsx"

const RedirectPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  const pages = {
    verified: {
      icon: CheckCircle2,
      title: "Email verified successfully",
      description:
        "Your email address has been verified. You can now log in to your account.",
      iconClassName: "bg-greenbase/10 text-greenbase",
      primaryButtonText: "Continue to login",
    },

    expired: {
      icon: CircleAlert,
      title: "Verification link expired",
      description:
        "Your verification link has expired. Please request a new verification email.",
      iconClassName: "bg-yellow-100 text-yellow-600",
      primaryButtonText: "Back to login",
    },

    invalid: {
      icon: XCircle,
      title: "Verification failed",
      description:
        "The verification link is invalid or has already been used.",
      iconClassName: "bg-red-100 text-red-500",
      primaryButtonText: "Back to login",
    },
  };

  const page = pages[type] || pages.invalid;

  return (
    <MessagePage
      icon={page.icon}
      title={page.title}
      description={page.description}
      iconClassName={page.iconClassName}
      primaryButtonText={page.primaryButtonText}
      onPrimaryClick={() => navigate("/auth/login", { replace: true })}
    />
  );
};

export default RedirectPage;