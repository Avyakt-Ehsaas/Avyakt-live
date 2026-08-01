import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    setIsSubmitting(true);

    const loadingToast = toast.loading("Signing you in...");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const responseData = response.data;

      const accessToken =
        responseData?.accessToken ||
        responseData?.token ||
        responseData?.data?.accessToken ||
        responseData?.data?.token;

      const user =
        responseData?.user ||
        responseData?.data?.user ||
        responseData?.data;

      if (accessToken) {
        localStorage.setItem("token", accessToken);
      }

      if (user?.email) {
        localStorage.setItem("email", user.email);
      } else {
        localStorage.setItem("email", email);
      }

      if (user?.id) {
        localStorage.setItem("userId", user.id);
      }

      if (user?.username) {
        localStorage.setItem("username", user.username);
      }

      localStorage.setItem("hasCompletedOnboarding", "true");

      toast.success(
        responseData?.message || "Welcome back",
        {
          id: loadingToast,
        }
      );

      navigate("/live-sessions");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
        "Login failed. Please check your credentials.";

      toast.error(errorMessage, {
        id: loadingToast,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/oauth/google`;
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F8F7F2]">
      {/* Soft background glow */}
    
      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center px-4 py-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
        {/* Left section */}
        <motion.section
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="hidden lg:block"
        >
          <div className="max-w-md">
            <p className="mb-3 font-dm text-xs font-semibold uppercase tracking-[0.28em] text-greenbase">
              Avyakt Ehsaas
            </p>

            <h1 className="font-season text-5xl leading-[1.08] text-primary">
              Return to your calm space.
            </h1>

            <p className="mt-5 max-w-sm font-dm text-base leading-7 text-gray">
              Continue your meditation journey, join live sessions and stay
              connected with your mindful routine.
            </p>

            <div className="mt-10 space-y-4">
              <FeatureItem text="Join live guided meditation sessions" />
              <FeatureItem text="Continue your personal wellness journey" />
              <FeatureItem text="Track your mindful progress" />
            </div>
          </div>
        </motion.section>

        {/* Login section */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto w-full max-w-[460px]"
        >
          <header className="mb-6 text-center lg:text-left">
            <p className="mb-1.5 font-dm text-[11px] font-semibold uppercase tracking-[0.26em] text-greenbase lg:hidden">
              Avyakt Ehsaas
            </p>

            <h2 className="font-season text-3xl leading-tight text-primary sm:text-4xl">
              Welcome back
            </h2>

            <p className="mt-2 font-dm text-sm leading-6 text-gray">
              Continue your peaceful journey toward a calmer mind.
            </p>
          </header>

          <div className="rounded-[30px] border border-white/90 bg-white/85 p-5 shadow-[0_32px_90px_-45px_rgba(38,68,47,0.4)] backdrop-blur-xl sm:p-7">
            <form onSubmit={handleLogin} className="space-y-4">
              <FormField
                label="Email address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
              />

              <PasswordField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                visible={showPassword}
                onToggle={() =>
                  setShowPassword((previous) => !previous)
                }
              />

              <div className="flex justify-end">
                <Link
                  to="/auth/forgot-password"
                  className="font-dm text-xs font-medium text-gray transition hover:text-greenbase"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center rounded-2xl bg-greenbase px-5 font-dm text-sm font-semibold text-white shadow-[0_14px_30px_-16px_rgba(52,88,62,0.8)] transition duration-200 hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Signing in...
                  </span>
                ) : (
                  "Continue"
                )}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#E7EAE4]" />

              <span className="font-dm text-xs text-gray">
                or continue with
              </span>

              <div className="h-px flex-1 bg-[#E7EAE4]" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-[#E1E6DF] bg-white font-dm text-sm font-medium text-primary transition duration-200 hover:border-greenbase/40 hover:bg-[#FBFCF9]"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <p className="mt-5 text-center font-dm text-sm text-gray">
              Don&apos;t have an account?{" "}
              <Link
                to="/auth/register"
                className="font-semibold text-greenbase transition hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>

          <p className="mt-4 px-4 text-center font-dm text-[11px] leading-5 text-gray">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.section>
      </div>
    </main>
  );
}

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-dm text-xs font-medium text-primary">
        {label}
      </span>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className="h-12 w-full rounded-2xl border border-[#E3E7E2] bg-white px-4 font-dm text-sm text-primary outline-none transition-all duration-200 placeholder:text-gray/60 hover:border-greenbase/40 focus:border-greenbase focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:shadow-[0_0_0_3px_rgba(113,172,97,0.08)]"
      />
    </label>
  );
}

function PasswordField({
  label,
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  visible,
  onToggle,
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-dm text-xs font-medium text-primary">
        {label}
      </span>

      <div className="relative">
        <input
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="h-12 w-full rounded-2xl border border-[#E3E7E2] bg-white px-4 pr-12 font-dm text-sm text-primary outline-none transition-all duration-200 placeholder:text-gray/60 hover:border-greenbase/40 focus:border-greenbase focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:shadow-[0_0_0_3px_rgba(113,172,97,0.08)]"
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray transition hover:text-greenbase focus:outline-none"
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </label>
  );
}

function FeatureItem({ text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-greenbase/10 text-greenbase">
        <CheckIcon />
      </span>

      <span className="font-dm text-sm text-primary">{text}</span>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3 3 18 18" />
      <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
      <path d="M9.9 5.2A10.4 10.4 0 0 1 12 5c6 0 9.5 7 9.5 7a16.7 16.7 0 0 1-2.1 3" />
      <path d="M6.6 6.6C3.9 8.4 2.5 12 2.5 12s3.5 7 9.5 7a9.7 9.7 0 0 0 4-.9" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.35 12.2c0-.74-.07-1.45-.19-2.14H12v4.05h5.24a4.48 4.48 0 0 1-1.94 2.94v2.63h3.14c1.84-1.69 2.91-4.19 2.91-7.48Z"
      />
      <path
        fill="#34A853"
        d="M12 21.7c2.62 0 4.83-.87 6.44-2.36l-3.14-2.63c-.87.58-1.98.93-3.3.93-2.53 0-4.68-1.71-5.45-4.01H3.31v2.71A9.73 9.73 0 0 0 12 21.7Z"
      />
      <path
        fill="#FBBC05"
        d="M6.55 13.63A5.86 5.86 0 0 1 6.24 12c0-.57.11-1.12.31-1.63V7.66H3.31A9.72 9.72 0 0 0 2.27 12c0 1.57.38 3.06 1.04 4.34l3.24-2.71Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.36c1.43 0 2.71.49 3.72 1.45l2.79-2.79A9.37 9.37 0 0 0 12 2.3a9.73 9.73 0 0 0-8.69 5.36l3.24 2.71c.77-2.3 2.92-4.01 5.45-4.01Z"
      />
    </svg>
  );
}