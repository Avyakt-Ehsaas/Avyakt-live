import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import API from "../../../utils/api";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modal = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 420, damping: 34 },
  },
  exit: { opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.18 } },
};

const successAnim = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 340, damping: 24, delay: 0.05 },
  },
};

const FIELD_RULES = {
  firstName: {
    required: "First name is required",
    minLength: { value: 2, message: "At least 2 characters" },
    maxLength: { value: 50, message: "Max 50 characters" },
    pattern: { value: /^[A-Za-z\s'-]+$/, message: "Only letters allowed" },
  },
  lastName: {
    required: "Last name is required",
    minLength: { value: 2, message: "At least 2 characters" },
    maxLength: { value: 50, message: "Max 50 characters" },
    pattern: { value: /^[A-Za-z\s'-]+$/, message: "Only letters allowed" },
  },
  phone: {
    required: "Phone number is required",
    pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit mobile number" },
  },
  email: {
    required: "Email address is required",
    pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" },
  },
  age: {
    required: "Age is required",
    min: { value: 5, message: "Age must be at least 5" },
    max: { value: 100, message: "Age must be 100 or below" },
  },
};

function validate(fields) {
  const errors = {};

  for (const [name, rules] of Object.entries(FIELD_RULES)) {
    const value = fields[name];

    if (rules.required && (!value || String(value).trim() === "")) {
      errors[name] = rules.required;
      continue;
    }

    if (rules.minLength && String(value).trim().length < rules.minLength.value) {
      errors[name] = rules.minLength.message;
      continue;
    }

    if (rules.maxLength && String(value).trim().length > rules.maxLength.value) {
      errors[name] = rules.maxLength.message;
      continue;
    }

    if (rules.pattern && !rules.pattern.value.test(String(value).trim())) {
      errors[name] = rules.pattern.message;
      continue;
    }

    if (name === "age") {
      const num = Number(value);
      if (rules.min && num < rules.min.value) { errors[name] = rules.min.message; continue; }
      if (rules.max && num > rules.max.value) { errors[name] = rules.max.message; continue; }
    }
  }

  return errors;
}

const initialForm = { firstName: "", lastName: "", phone: "", email: "", age: "" };

const QRLeadModal = () => {
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (searchParams.get("qr") === "1") {
      setOpen(true);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const fieldErrors = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(form);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.keys(initialForm).reduce((a, k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched);

    const fieldErrors = validate(form);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setSubmitting(true);
    setServerError("");

    try {
      await API.post("/qr-leads", {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        age: Number(form.age),
      });
      setSuccess(true);
    } catch (err) {
      setServerError(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputClass = (name) =>
    `w-full border rounded-2xl px-4 py-3 text-sm font-dm text-[#191919] placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
      errors[name] && touched[name]
        ? "border-red-400 focus:ring-red-200 bg-red-50"
        : "border-[#d1d5db] focus:ring-[#71AC61]/40 focus:border-[#71AC61]"
    }`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdrop}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={!success ? handleClose : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            variants={modal}
          >
            {/* Decorative blobs */}
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-[#71AC61]/15 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-emerald-200/20 blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {success ? (
                /* ── SUCCESS STATE ── */
                <motion.div
                  key="success"
                  className="relative flex flex-col items-center justify-center px-8 py-12 text-center"
                  initial="hidden"
                  animate="visible"
                  variants={successAnim}
                >
                  {/* Animated rings */}
                  <div className="relative mb-6">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#71AC61]/20"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#71AC61]/15"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1.7, opacity: 0 }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                    />
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    >
                      <CheckCircle2
                        className="w-20 h-20 text-[#71AC61] relative z-10"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                  </div>

                  <motion.h2
                    className="text-2xl font-season font-semibold text-[#191919] mb-3"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    Thank you!
                  </motion.h2>

                  <motion.p
                    className="text-sm font-dm text-gray-500 leading-relaxed max-w-xs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    Thank you for the information you provided. We'll share the updates and
                    joining link on your mail.
                  </motion.p>

                  {/* Floating sparkles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-[#71AC61]"
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: (Math.cos((i * 60 * Math.PI) / 180) * 70),
                        y: (Math.sin((i * 60 * Math.PI) / 180) * 70),
                      }}
                      transition={{ duration: 0.8, delay: 0.1 + i * 0.05, ease: "easeOut" }}
                    />
                  ))}

                  <motion.button
                    onClick={handleClose}
                    className="mt-8 px-8 py-3 rounded-full bg-[#71AC61] text-white text-sm font-dm font-medium hover:bg-[#4F7944] transition-colors duration-200"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              ) : (
                /* ── FORM STATE ── */
                <motion.div
                  key="form"
                  className="relative px-7 py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.18 }}
                >
                  {/* Close button */}
                  <button
                    onClick={handleClose}
                    className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all duration-200"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Header */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#71AC61]/30 bg-[#71AC61]/8 px-3 py-1 text-xs font-dm font-semibold text-[#4F7944] mb-3">
                      <Sparkles className="w-3.5 h-3.5" />
                      Live Meditation Journey
                    </div>
                    <h2 className="text-xl font-season font-semibold text-[#191919] leading-snug">
                      Join the <span className="text-[#71AC61]">Avyakt</span> Community
                    </h2>
                    <p className="text-xs font-dm text-gray-400 mt-1">
                      Fill in your details — we'll send your joining link by email.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* First + Last name row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-dm font-medium text-gray-600 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Arjun"
                          className={inputClass("firstName")}
                        />
                        {errors.firstName && touched.firstName && (
                          <p className="text-red-500 text-[11px] mt-1 font-dm">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-dm font-medium text-gray-600 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Sharma"
                          className={inputClass("lastName")}
                        />
                        {errors.lastName && touched.lastName && (
                          <p className="text-red-500 text-[11px] mt-1 font-dm">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-dm font-medium text-gray-600 mb-1">
                        Mobile Number
                      </label>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1 border border-[#d1d5db] rounded-2xl px-3 py-3 text-sm font-dm text-gray-600 bg-gray-50 select-none">
                          🇮🇳 +91
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="9876543210"
                          maxLength={10}
                          className={`flex-1 ${inputClass("phone")}`}
                        />
                      </div>
                      {errors.phone && touched.phone && (
                        <p className="text-red-500 text-[11px] mt-1 font-dm">{errors.phone}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-dm font-medium text-gray-600 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="arjun@example.com"
                        className={inputClass("email")}
                      />
                      {errors.email && touched.email && (
                        <p className="text-red-500 text-[11px] mt-1 font-dm">{errors.email}</p>
                      )}
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-xs font-dm font-medium text-gray-600 mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="25"
                        min={5}
                        max={100}
                        className={inputClass("age")}
                      />
                      {errors.age && touched.age && (
                        <p className="text-red-500 text-[11px] mt-1 font-dm">{errors.age}</p>
                      )}
                    </div>

                    {/* Server error */}
                    {serverError && (
                      <p className="text-red-500 text-xs font-dm text-center bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                        {serverError}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 bg-[#71AC61] hover:bg-[#4F7944] disabled:bg-gray-300 transition-colors duration-200 text-white py-3.5 rounded-full text-sm font-dm font-semibold mt-1 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        "Register Now"
                      )}
                    </button>
                  </form>

                  {/* Trust line */}
                  <p className="text-center text-[11px] font-dm text-gray-400 mt-5">
                    Trusted by 5,000+ people on their wellness journey
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QRLeadModal;
