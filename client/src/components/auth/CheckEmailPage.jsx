import { MailCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import MessagePage from "../ui/MessagePage";


const CheckEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleOpenGmail = () => {
    window.open(
      "https://mail.google.com/mail/u/0/#inbox",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <MessagePage
      icon={MailCheck}
      title="Check your email"
      description="We sent a verification link to your email address. Please verify your account to continue."
      email={email}
      primaryButtonText="Open Gmail"
      onPrimaryClick={handleOpenGmail}
      secondaryButtonText="Back to login"
      onSecondaryClick={() => navigate("/login", { replace: true })}
    />
  );
};

export default CheckEmailPage;