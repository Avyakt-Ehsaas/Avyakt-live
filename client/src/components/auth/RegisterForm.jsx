import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

const initialForm = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const username = formData.username.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (username.length < 3) {
      toast.error("Username must contain at least 3 characters");
      return;
    }

    if (username.length > 30) {
      toast.error("Username cannot exceed 30 characters");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      toast.error(
        "Username can only contain letters, numbers and underscores"
      );
      return;
    }

    if (password.length < 8) {
      toast.error("Password must contain at least 8 characters");
      return;
    }

    if (password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsSubmitting(true);

    const loadingToast = toast.loading("Creating your account...");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(
        response?.message || "Your account has been created",
        {
          id: loadingToast,
        }
      );
      navigate("/auth/onboarding", {
        replace: true,
        state: {
          userId: response?.data?.data?.user?.id,
          email: response?.data?.data?.user?.email,
        },
      });
    } catch (error) {
        const errorMessage =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
        "Unable to create your account";

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
      {/* Background decorations */}

      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center px-4 py-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
        {/* Left content */}
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
              Your peaceful journey begins here.
            </h1>

            <p className="mt-5 max-w-sm font-dm text-base leading-7 text-gray">
              Create your account to join live meditation sessions, build a
              mindful routine and track your inner growth.
            </p>

            <div className="mt-10 space-y-4">
              <FeatureItem text="Live guided meditation sessions" />
              <FeatureItem text="Personalized wellness journey" />
              <FeatureItem text="Mindful progress tracking" />
            </div>
          </div>
        </motion.section>

        {/* Register form */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto w-full max-w-[460px]"
        >
          {/* Mobile header */}
          <header className="mb-6 text-center lg:text-left">
            <div className="mb-4 flex justify-center lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-greenbase/20 bg-white shadow-sm">
                <LotusIcon />
              </div>
            </div>

            <p className="mb-1.5 font-dm text-[11px] font-semibold uppercase tracking-[0.26em] text-greenbase lg:hidden">
              Avyakt Ehsaas
            </p>

            <h2 className="font-season text-3xl leading-tight text-primary sm:text-4xl">
              Create your account
            </h2>

            <p className="mt-2 font-dm text-sm leading-6 text-gray">
              Begin your journey toward a calmer and clearer mind.
            </p>
          </header>

          <div className="rounded-[30px] border border-white/90 bg-white/85 p-5 shadow-[0_32px_90px_-45px_rgba(38,68,47,0.4)] backdrop-blur-xl sm:p-7">
            <form onSubmit={handleRegister} className="space-y-4">
              <FormField
                label="Username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                autoComplete="username"
                minLength={3}
                maxLength={30}
              />

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
                placeholder="Minimum 12 characters"
                autoComplete="new-password"
                visible={showPassword}
                onToggle={() => setShowPassword((previous) => !previous)}
              />

              <PasswordField
                label="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your password again"
                autoComplete="new-password"
                visible={showConfirmPassword}
                onToggle={() =>
                  setShowConfirmPassword((previous) => !previous)
                }
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-13 w-full items-center justify-center rounded-2xl bg-greenbase px-5 font-dm text-sm font-semibold text-white shadow-[0_14px_30px_-16px_rgba(52,88,62,0.8)] transition duration-200 hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Creating account...
                  </span>
                ) : (
                  "Create account"
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
              className="flex h-13 w-full items-center justify-center gap-3 rounded-2xl border border-[#E1E6DF] bg-white font-dm text-sm font-medium text-primary transition duration-200 hover:border-greenbase/40 hover:bg-[#FBFCF9]"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <p className="mt-5 text-center font-dm text-sm text-gray">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-semibold text-greenbase hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          <p className="mt-4 px-4 text-center font-dm text-[11px] leading-5 text-gray">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy.
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
  minLength,
  maxLength,
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
        minLength={minLength}
        maxLength={maxLength}
        required
        className="h-12 w-full rounded-2xl border border-greenbase bg-white px-4 font-dm text-sm text-primary placeholder:text-gray outline-none transition-all duration-200 hover:border-greenbase/80 focus:outline-none focus:border-greenbase focus:ring-0 focus:shadow-[0_0_0_3px_rgba(113,172,97,0.10)]"
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
          minLength={8}
          required
          className="h-12 w-full rounded-2xl border border-greenbase bg-white px-4 font-dm text-sm text-primary placeholder:text-gray outline-none transition-all duration-200 hover:border-greenbase/80 focus:outline-none focus:border-greenbase focus:ring-0 focus:shadow-[0_0_0_3px_rgba(113,172,97,0.10)]"
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray transition hover:text-greenbase"
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
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-greenbase/10 text-greenbase">
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
    >
      <path d="m3 3 18 18" />
      <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
      <path d="M9.9 5.2A10.4 10.4 0 0 1 12 5c6 0 9.5 7 9.5 7a16.7 16.7 0 0 1-2.1 3" />
      <path d="M6.6 6.6C3.9 8.4 2.5 12 2.5 12s3.5 7 9.5 7a9.7 9.7 0 0 0 4-.9" />
    </svg>
  );
}

function LotusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-greenbase"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20c-4-2-6-5-6-9 3 .5 5 2 6 5" />
      <path d="M12 20c4-2 6-5 6-9-3 .5-5 2-6 5" />
      <path d="M12 16c-2-2-3-5 0-9 3 4 2 7 0 9Z" />
      <path d="M5 19h14" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
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