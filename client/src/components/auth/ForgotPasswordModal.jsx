import { useState } from "react";
import { CheckCircle2, Mail, X } from "lucide-react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

const ForgotPasswordModal = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleClose = () => {
    setStep(1);
    setEmail("");
    setSubmittedEmail("");
    setError("");
    setLoading(false);
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_URL}/auth/forgot-password`, {
        email: normalizedEmail,
      });

      setSubmittedEmail(normalizedEmail);
      setStep(2);
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
          "Unable to send the reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      setError("");

      await axios.post(`${API_URL}/auth/forgot-password`, {
        email: submittedEmail,
      });
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
          "Unable to resend the email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onMouseDown={handleClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-5 top-5 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          aria-label="Close forgot password modal"
        >
          <X size={18} />
        </button>

        {/* Step indicators */}

        <div className="mb-7 flex items-center gap-2">
          <div
            className={`h-1.5 flex-1 rounded-full ${
              step >= 1 ? "bg-greenbase" : "bg-gray-200"
            }`}
          />

          <div
            className={`h-1.5 flex-1 rounded-full ${
              step >= 2 ? "bg-greenbase" : "bg-gray-200"
            }`}
          />
        </div>

        {step === 1 && (
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-greenbase/10 text-greenbase">
              <Mail size={23} />
            </div>

            <h2 className="font-dm text-2xl font-semibold text-primary">
              Forgot your password?
            </h2>

            <p className="mt-2 font-dm text-sm leading-6 text-gray">
              Enter your registered email address and we’ll send you a secure
              password reset link.
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
              <label
                htmlFor="forgot-email"
                className="mb-2 block font-dm text-sm font-medium text-primary"
              >
                Email address
              </label>

              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 font-dm text-sm text-primary outline-none transition placeholder:text-gray-400 focus:border-greenbase focus:ring-2 focus:ring-greenbase/10"
              />

              {error && (
                <p className="mt-2 font-dm text-xs text-red-500">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-greenbase px-4 py-3 font-dm text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending link..." : "Send reset link"}
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="mt-3 w-full rounded-xl px-4 py-3 font-dm text-sm font-medium text-gray transition hover:bg-gray-50 hover:text-primary"
              >
                Back to login
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-greenbase/10 text-greenbase">
              <CheckCircle2 size={32} />
            </div>

            <h2 className="mt-5 font-dm text-2xl font-semibold text-primary">
              Check your email
            </h2>

            <p className="mt-2 font-dm text-sm leading-6 text-gray">
              If an account exists for
            </p>

            <p className="mt-1 break-all font-dm text-sm font-semibold text-primary">
              {submittedEmail}
            </p>

            <p className="mt-2 font-dm text-sm leading-6 text-gray">
              we’ve sent a password reset link. The link will expire in one
              hour.
            </p>

            {error && (
              <p className="mt-4 font-dm text-xs text-red-500">{error}</p>
            )}

            <button
              type="button"
              onClick={handleClose}
              className="mt-6 w-full rounded-xl bg-greenbase px-4 py-3 font-dm text-sm font-medium text-white transition hover:opacity-90"
            >
              Back to login
            </button>

            <button
              type="button"
              onClick={handleResend}
              disabled={loading}
              className="mt-3 font-dm text-sm font-medium text-greenbase transition hover:underline disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Resending..." : "Didn’t receive it? Resend"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;