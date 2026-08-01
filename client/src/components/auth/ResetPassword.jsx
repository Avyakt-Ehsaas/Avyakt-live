import { useMemo, useState } from "react";
import { Eye, EyeOff, LockKeyhole, CheckCircle2, XCircle } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const passwordRules = useMemo(
    () => ({
      minLength: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    }),
    [password]
  );

  const isPasswordValid = Object.values(passwordRules).every(Boolean);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!token) {
      setError("Reset link is invalid or missing.");
      return;
    }

    if (!password) {
      setError("Please enter a new password.");
      return;
    }

    if (!isPasswordValid) {
      setError("Please complete all password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_URL}/auth/reset-password`, {
        token,
        password,
      });

      setIsSuccess(true);

      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
          "Unable to reset your password. The link may have expired."
      );
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAF6] px-4">
        <section className="w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-xl sm:p-9">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-greenbase/10 text-greenbase">
            <CheckCircle2 size={34} />
          </div>

          <h1 className="mt-5 font-dm text-2xl font-semibold text-primary">
            Password updated
          </h1>

          <p className="mt-2 font-dm text-sm leading-6 text-gray">
            Your password has been changed successfully.
          </p>

          <p className="mt-1 font-dm text-sm text-gray">
            Redirecting you to login...
          </p>

          <Link
            to="/login"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-greenbase px-4 py-3 font-dm text-sm font-medium text-white transition hover:opacity-90"
          >
            Continue to login
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAFAF6] px-4 py-8">
      <section className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-greenbase/10 text-greenbase">
          <LockKeyhole size={23} />
        </div>

        <h1 className="mt-5 font-dm text-2xl font-semibold text-primary">
          Create a new password
        </h1>

        <p className="mt-2 font-dm text-sm leading-6 text-gray">
          Choose a strong password that you have not used before.
        </p>

        {!token && (
          <div className="mt-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-3">
            <XCircle className="mt-0.5 shrink-0 text-red-500" size={18} />

            <p className="font-dm text-sm text-red-600">
              This reset link is invalid or incomplete. Please request a new
              password reset link.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="new-password"
              className="mb-2 block font-dm text-sm font-medium text-primary"
            >
              New password
            </label>

            <div className="relative">
              <input
                id="new-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                placeholder="Enter new password"
                autoComplete="new-password"
                disabled={!token || loading}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-11 font-dm text-sm text-primary outline-none transition placeholder:text-gray-400 focus:border-greenbase focus:ring-2 focus:ring-greenbase/10 disabled:cursor-not-allowed disabled:bg-gray-50"
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray transition hover:text-primary"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="mb-2 block font-dm text-sm font-medium text-primary"
            >
              Confirm password
            </label>

            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  setError("");
                }}
                placeholder="Re-enter new password"
                autoComplete="new-password"
                disabled={!token || loading}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-11 font-dm text-sm text-primary outline-none transition placeholder:text-gray-400 focus:border-greenbase focus:ring-2 focus:ring-greenbase/10 disabled:cursor-not-allowed disabled:bg-gray-50"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((value) => !value)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray transition hover:text-primary"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-[#FAFAF6] p-4">
            <p className="mb-3 font-dm text-xs font-medium text-primary">
              Your password must include:
            </p>

            <div className="grid gap-2">
              <PasswordRule
                valid={passwordRules.minLength}
                label="At least 12 characters"
              />

              <PasswordRule
                valid={passwordRules.uppercase}
                label="One uppercase letter"
              />

              <PasswordRule
                valid={passwordRules.lowercase}
                label="One lowercase letter"
              />

              <PasswordRule
                valid={passwordRules.number}
                label="One number"
              />

              <PasswordRule
                valid={passwordRules.special}
                label="One special character"
              />
            </div>
          </div>

          {error && (
            <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-3">
              <XCircle className="mt-0.5 shrink-0 text-red-500" size={18} />

              <p className="font-dm text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!token || loading}
            className="flex w-full items-center justify-center rounded-xl bg-greenbase px-4 py-3 font-dm text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Updating password..." : "Reset password"}
          </button>

          <Link
            to="/login"
            className="block text-center font-dm text-sm font-medium text-gray transition hover:text-greenbase"
          >
            Back to login
          </Link>
        </form>
      </section>
    </main>
  );
};

const PasswordRule = ({ valid, label }) => {
  return (
    <div
      className={`flex items-center gap-2 font-dm text-xs ${
        valid ? "text-greenbase" : "text-gray"
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
          valid
            ? "border-greenbase bg-greenbase text-white"
            : "border-gray-300"
        }`}
      >
        {valid && <CheckCircle2 size={11} />}
      </span>

      <span>{label}</span>
    </div>
  );
};

export default ResetPassword;