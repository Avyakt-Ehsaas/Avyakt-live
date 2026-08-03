import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

const GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const EXPERIENCES = [
  { value: "never", label: "Never tried it", desc: "Complete beginner" },
  { value: "beginner", label: "Beginner", desc: "A few sessions here and there" },
  { value: "intermediate", label: "Intermediate", desc: "Regular practice, some months" },
  { value: "advanced", label: "Advanced", desc: "Consistent practice for years" },
];

const initialStep1 = { age: "", gender: "", profession: "", city: "", state: "" };

export default function OnboardingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
  const email = location.state?.email;

  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState(initialStep1);
  const [step2, setStep2] = useState({ meditation_experience: "" });
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [reasonInput, setReasonInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!userId) navigate("/auth/register", { replace: true });
  }, [userId, navigate]);

  if (!userId) return null;

  const handleStep1Change = (e) => {
    const { name, value } = e.target;
    setStep1((prev) => ({ ...prev, [name]: value }));
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    const age = parseInt(step1.age, 10);
    if (!age || age < 13 || age > 120) {
      toast.error("Please enter a valid age (13–120)");
      return;
    }
    if (!step1.gender) {
      toast.error("Please select your gender");
      return;
    }
    setStep(2);
  };

  const addReason = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = reasonInput.trim().replace(/,$/, "");
      if (trimmed && !selectedReasons.includes(trimmed)) {
        setSelectedReasons((prev) => [...prev, trimmed]);
      }
      setReasonInput("");
    }
  };

  const removeReason = (reason) => {
    setSelectedReasons((prev) => prev.filter((r) => r !== reason));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!step2.meditation_experience) {
      toast.error("Please select your meditation experience level");
      return;
    }
    const pendingReason = reasonInput.trim();
    const allReasons = pendingReason
      ? [...selectedReasons, pendingReason]
      : selectedReasons;
    const meditationReason = allReasons.join(", ");
    if (!meditationReason) {
      toast.error("Please tell us what brings you to meditation");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Saving your profile...");

    try {
      await axios.post(
        `${API_BASE_URL}/onboarding`,
        {
          user_id: userId,
          age: parseInt(step1.age, 10),
          gender: step1.gender,
          profession: step1.profession,
          city: step1.city,
          state: step1.state,
          meditation_experience: step2.meditation_experience,
          meditation_reason: meditationReason,
        },
        { withCredentials: true }
      );

      toast.success("Profile saved!", { id: loadingToast });
      navigate("/auth/check-email", { replace: true, state: { email } });
    } catch (error) {
      const msg =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Could not save profile. Please try again.";
      toast.error(msg, { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F8F7F2]">
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
              Help us personalise your journey.
            </h1>
            <p className="mt-5 max-w-sm font-dm text-base leading-7 text-gray">
              A few details help us tailor your meditation experience so every
              session feels made just for you.
            </p>
            <div className="mt-10 space-y-4">
              <FeatureItem text="Personalised session recommendations" />
              <FeatureItem text="Progress tracking suited to your level" />
              <FeatureItem text="Community matched to your goals" />
            </div>
          </div>
        </motion.section>

        {/* Form card */}
        <div className="mx-auto w-full max-w-[480px]">
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
              {step === 1 ? "About you" : "Your meditation journey"}
            </h2>
            <p className="mt-2 font-dm text-sm leading-6 text-gray">
              {step === 1
                ? "Tell us a little about yourself."
                : "Share your experience with meditation."}
            </p>
          </header>

          {/* Step indicator */}
          <div className="mb-5 flex items-center gap-2">
            <StepDot active={step >= 1} done={step > 1} label="1" />
            <div className={`h-px flex-1 transition-colors duration-300 ${step > 1 ? "bg-greenbase" : "bg-[#E7EAE4]"}`} />
            <StepDot active={step >= 2} done={false} label="2" />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                <form
                  onSubmit={handleStep1Submit}
                  className="rounded-[30px] border border-white/90 bg-white/85 p-5 shadow-[0_32px_90px_-45px_rgba(38,68,47,0.4)] backdrop-blur-xl sm:p-7 space-y-4"
                >
                  {/* Age */}
                  <FormField
                    label="Age"
                    name="age"
                    type="number"
                    value={step1.age}
                    onChange={handleStep1Change}
                    placeholder="e.g. 28"
                    min={13}
                    max={120}
                    required
                  />

                  {/* Gender */}
                  <div>
                    <span className="mb-2 block font-dm text-xs font-medium text-primary">
                      Gender
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {GENDERS.map((g) => (
                        <button
                          key={g.value}
                          type="button"
                          onClick={() => setStep1((prev) => ({ ...prev, gender: g.value }))}
                          className={`rounded-full border px-3.5 py-1.5 font-dm text-xs transition-all duration-150 ${
                            step1.gender === g.value
                              ? "border-greenbase bg-greenbase text-white"
                              : "border-[#E1E6DF] bg-white text-primary hover:border-greenbase/50"
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Profession */}
                  <FormField
                    label="Profession"
                    name="profession"
                    type="text"
                    value={step1.profession}
                    onChange={handleStep1Change}
                    placeholder="e.g. Software engineer, Teacher…"
                    required
                  />

                  {/* City + State */}
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      label="City"
                      name="city"
                      type="text"
                      value={step1.city}
                      onChange={handleStep1Change}
                      placeholder="Your city"
                      required
                    />
                    <FormField
                      label="State"
                      name="state"
                      type="text"
                      value={step1.state}
                      onChange={handleStep1Change}
                      placeholder="Your state"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex h-13 w-full items-center justify-center rounded-2xl bg-greenbasebg px-5 font-dm text-sm font-semibold text-white shadow-[0_14px_30px_-16px_rgba(52,88,62,0.8)] transition duration-200 hover:-translate-y-0.5 hover:opacity-95"
                  >
                    Continue
                  </button>

                </form>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                <form
                  onSubmit={handleSubmit}
                  className="rounded-[30px] border border-white/90 bg-white/85 p-5 shadow-[0_32px_90px_-45px_rgba(38,68,47,0.4)] backdrop-blur-xl sm:p-7 space-y-5"
                >
                  {/* Meditation experience */}
                  <div>
                    <span className="mb-2 block font-dm text-xs font-medium text-primary">
                      Your experience with meditation
                    </span>
                    <div className="space-y-2">
                      {EXPERIENCES.map((exp) => (
                        <button
                          key={exp.value}
                          type="button"
                          onClick={() =>
                            setStep2((prev) => ({ ...prev, meditation_experience: exp.value }))
                          }
                          className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all duration-150 ${
                            step2.meditation_experience === exp.value
                              ? "border-greenbase bg-greenbase/5 shadow-[0_0_0_2px_rgba(113,172,97,0.18)]"
                              : "border-[#E1E6DF] bg-white hover:border-greenbase/40"
                          }`}
                        >
                          <div>
                            <p className="font-dm text-sm font-medium text-primary">{exp.label}</p>
                            <p className="font-dm text-xs text-gray">{exp.desc}</p>
                          </div>
                          <div
                            className={`h-4 w-4 flex-shrink-0 rounded-full border-2 transition-all ${
                              step2.meditation_experience === exp.value
                                ? "border-greenbase bg-greenbase"
                                : "border-[#C8CFC3]"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* What brings you to meditation */}
                  <div>
                    <span className="mb-2 block font-dm text-xs font-medium text-primary">
                      What brings you to meditation?
                    </span>

                    {/* Selected reason chips */}
                    {selectedReasons.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {selectedReasons.map((reason) => (
                          <span
                            key={reason}
                            className="flex items-center gap-1.5 rounded-full border border-greenbase bg-greenbase/10 px-3 py-1.5 font-dm text-xs text-greenbase"
                          >
                            {reason}
                            <button
                              type="button"
                              onClick={() => removeReason(reason)}
                              className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-greenbase/20 text-greenbase hover:bg-red-100 hover:text-red-500 transition-colors"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Text input */}
                    <input
                      type="text"
                      value={reasonInput}
                      onChange={(e) => setReasonInput(e.target.value)}
                      onKeyDown={addReason}
                      placeholder="Type a reason and press Enter…"
                      className="w-full rounded-2xl border border-greenbase bg-white px-4 py-3 font-dm text-sm text-primary placeholder:text-gray outline-none transition-all duration-200 hover:border-greenbase/80 focus:border-greenbase focus:shadow-[0_0_0_3px_rgba(113,172,97,0.10)]"
                    />
                    <p className="mt-1.5 font-dm text-xs text-gray">
                      Press Enter to add each reason. Add as many as you like.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex h-13 items-center justify-center rounded-2xl border border-[#E1E6DF] bg-white px-5 font-dm text-sm font-medium text-primary transition duration-200 hover:border-greenbase/40"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex h-13 flex-1 items-center justify-center rounded-2xl bg-greenbasebg px-5 font-dm text-sm font-semibold text-white shadow-[0_14px_30px_-16px_rgba(52,88,62,0.8)] transition duration-200 hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Saving…
                        </span>
                      ) : (
                        "Complete setup"
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

function StepDot({ active, done, label }) {
  return (
    <div
      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full font-dm text-xs font-semibold transition-all duration-300 ${
        active
          ? "bg-greenbase text-white"
          : "border border-[#C8CFC3] bg-white text-gray"
      }`}
    >
      {done ? (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m5 12 4 4L19 6" />
        </svg>
      ) : (
        label
      )}
    </div>
  );
}

function FormField({ label, name, type, value, onChange, placeholder, min, max, required }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-dm text-xs font-medium text-primary">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        required={required}
        className="h-12 w-full rounded-2xl border border-greenbase bg-white px-4 font-dm text-sm text-primary placeholder:text-gray outline-none transition-all duration-200 hover:border-greenbase/80 focus:outline-none focus:border-greenbase focus:ring-0 focus:shadow-[0_0_0_3px_rgba(113,172,97,0.10)]"
      />
    </label>
  );
}

function FeatureItem({ text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-greenbase/10 text-greenbase">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m5 12 4 4L19 6" />
        </svg>
      </span>
      <span className="font-dm text-sm text-primary">{text}</span>
    </div>
  );
}

function LotusIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-greenbase" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20c-4-2-6-5-6-9 3 .5 5 2 6 5" />
      <path d="M12 20c4-2 6-5 6-9-3 .5-5 2-6 5" />
      <path d="M12 16c-2-2-3-5 0-9 3 4 2 7 0 9Z" />
      <path d="M5 19h14" />
    </svg>
  );
}
