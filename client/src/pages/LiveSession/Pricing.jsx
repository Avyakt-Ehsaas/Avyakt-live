import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const pricingPlans = [
  {
    id: 1,
    title: "Monthly",
    description:
      "A flexible starting point for building a peaceful and consistent meditation routine.",
    price: "₹199",
    duration: "Month",
    durationLabel: "Monthly",
    highlighted: false,
    badge: null,
    features: [
      "24 guided meditation sessions",
      "Daily mindfulness practices",
      "Progress and habit tracking",
      "Meditation community access",
      "Email support",
    ],
  },
  {
    id: 2,
    title: "Quarterly",
    description:
      "The ideal plan for developing lasting habits and experiencing deeper personal transformation.",
    price: "₹449",
    duration: "3 Months",
    durationLabel: "Quarterly",
    highlighted: true,
    badge: null,
    features: [
      "Everything included in Monthly",
      "Advanced meditation library",
      "Sleep and stress programs",
      "Personal growth dashboard",
      "Priority support",
    ],
  },
  {
    id: 3,
    title: "Half Yearly",
    description:
      "A long-term journey designed to support complete lifestyle transformation and inner stability.",
    price: "₹999",
    duration: "6 Months",
    durationLabel: "Half Yearly",
    highlighted: false,
    badge: "Best Value",
    features: [
      "Everything included in Quarterly",
      "Exclusive premium courses",
      "Live meditation sessions",
      "Habit-building programs",
      "Early access to new content",
    ],
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));

      setFormData((prev) => ({
        ...prev,
        name: decoded?.name || "",
        email: decoded?.sub || decoded?.email || "",
      }));
    } catch (error) {
      console.error("Unable to decode user token:", error);
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWhatsappChange = (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 10);

    setFormData((prev) => ({
      ...prev,
      whatsapp: value,
    }));
  };

  const handlePayment = (event) => {
    event.preventDefault();

    if (!selectedPlan) return;

    const paymentData = {
      ...formData,
      planId: selectedPlan.id,
      planName: selectedPlan.title,
      price: selectedPlan.price,
      billingCycle: selectedPlan.durationLabel,
      duration: selectedPlan.duration,
    };

    localStorage.setItem("paymentData", JSON.stringify(paymentData));

    closeModal();
    navigate("/payment");
  };

  return (
    <>
      <section
        id="pricing-section"
        className="relative w-full overflow-hidden bg-[#FBFCF8] py-20 md:py-28"
      >
        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-44 top-10 h-[420px] w-[420px] rounded-full bg-[#DDEED7]/60 blur-[120px]" />

        <div className="pointer-events-none absolute -right-44 bottom-0 h-[450px] w-[450px] rounded-full bg-[#E8F2E4]/80 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-[1240px] px-5 md:px-8">
          {/* Heading */}
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="font-season-medium text-primary heading-main">
              A plan for every stage
              <span className="block text-[#71AC61]">
                of your transformation.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-[650px] font-dm text-[15px] leading-7 text-[#747A73] md:text-[17px]">
              Begin with a flexible monthly plan or commit to a deeper journey
              with our quarterly and half-yearly experiences.
            </p>
          </div>

          {/* Desktop cards */}
          <div className="mt-16 hidden grid-cols-3 items-stretch gap-7 md:grid lg:gap-8">
            {pricingPlans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                onStart={() => navigate("/auth/login")}
              />
            ))}
          </div>

          {/* Mobile slider */}
          <div className="mt-12 w-full md:hidden">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={18}
              slidesPerView={1.06}
              centeredSlides
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              loop
              className="pricing-swiper !pb-14"
            >
              {pricingPlans.map((plan) => (
                <SwiperSlide key={plan.id} className="h-auto">
                  <PricingCard
                    plan={plan}
                    onStart={() => navigate("/auth/login")}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Trust note */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-dm text-[12px] text-[#7D847B] md:text-[13px]">
            <span>✓ Secure payment</span>
            <span>✓ 24-day guided beginning</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Payment modal */}
      {isModalOpen && selectedPlan && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#162017]/60 px-4 py-8 backdrop-blur-md"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-[500px] overflow-hidden rounded-[32px] border border-white/40 bg-white p-6 shadow-[0_35px_100px_rgba(24,47,24,0.28)] md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#DDEFD7] blur-[70px]" />

            <button
              type="button"
              onClick={closeModal}
              aria-label="Close payment form"
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F5EF] text-[#687066] transition hover:bg-[#E4ECE1] hover:text-[#202A21]"
            >
              <X size={19} />
            </button>

            <div className="relative z-10 pr-10">
              <p className="font-dm text-[12px] font-medium uppercase tracking-[0.18em] text-[#71AC61]">
                {selectedPlan.durationLabel} Plan
              </p>

              <h2 className="mt-2 font-season-medium text-[32px] leading-tight text-[#202A21] md:text-[40px]">
                Begin your journey
              </h2>

              <p className="mt-3 font-dm text-[14px] leading-6 text-[#747A73]">
                Enter your details and continue securely to the payment page.
              </p>
            </div>

            <div className="relative z-10 mt-6 rounded-[22px] border border-[#DCE8D7] bg-[#F8FBF6] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-dm text-[12px] uppercase tracking-[0.15em] text-[#8A9188]">
                    Selected plan
                  </p>

                  <h3 className="mt-1 font-season-medium text-[23px] text-[#202A21]">
                    {selectedPlan.title}
                  </h3>
                </div>

                <div className="text-right">
                  <p className="font-dm text-[24px] font-semibold text-[#202A21]">
                    {selectedPlan.price}
                  </p>

                  <p className="font-dm text-[12px] text-[#7A8278]">
                    / {selectedPlan.duration}
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handlePayment}
              className="relative z-10 mt-6 space-y-4"
            >
              <div>
                <label
                  htmlFor="pricing-name"
                  className="mb-2 block font-dm text-[12px] font-medium text-[#525A51]"
                >
                  Full name
                </label>

                <input
                  id="pricing-name"
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-full border border-[#DEE5DC] bg-white px-5 py-4 font-dm text-[14px] text-[#202A21] outline-none transition placeholder:text-[#A1A7A0] focus:border-[#71AC61] focus:ring-4 focus:ring-[#71AC61]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="pricing-email"
                  className="mb-2 block font-dm text-[12px] font-medium text-[#525A51]"
                >
                  Email address
                </label>

                <input
                  id="pricing-email"
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-full border border-[#DEE5DC] bg-white px-5 py-4 font-dm text-[14px] text-[#202A21] outline-none transition placeholder:text-[#A1A7A0] focus:border-[#71AC61] focus:ring-4 focus:ring-[#71AC61]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="pricing-whatsapp"
                  className="mb-2 block font-dm text-[12px] font-medium text-[#525A51]"
                >
                  WhatsApp number
                </label>

                <input
                  id="pricing-whatsapp"
                  type="tel"
                  name="whatsapp"
                  required
                  placeholder="Enter 10-digit number"
                  value={formData.whatsapp}
                  onChange={handleWhatsappChange}
                  pattern="[0-9]{10}"
                  maxLength={10}
                  inputMode="numeric"
                  className="w-full rounded-full border border-[#DEE5DC] bg-white px-5 py-4 font-dm text-[14px] text-[#202A21] outline-none transition placeholder:text-[#A1A7A0] focus:border-[#71AC61] focus:ring-4 focus:ring-[#71AC61]/10"
                />
              </div>

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#71AC61] px-5 py-4 font-dm text-[15px] font-medium text-white shadow-[0_14px_35px_rgba(113,172,97,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5F9751] hover:shadow-[0_18px_40px_rgba(113,172,97,0.4)]"
              >
                Continue to Payment
              </button>

              <p className="text-center font-dm text-[11px] leading-5 text-[#929891]">
                By continuing, you agree to the subscription terms and privacy
                policy.
              </p>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .pricing-swiper {
          overflow: visible;
        }

        .pricing-swiper .swiper-slide {
          height: auto;
        }

        .pricing-swiper .swiper-pagination {
          bottom: 2px !important;
        }

        .pricing-swiper .swiper-pagination-bullet {
          width: 9px;
          height: 9px;
          background: #c8d9c2;
          opacity: 1;
          margin: 0 5px !important;
          transition: all 0.3s ease;
        }

        .pricing-swiper .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 999px;
          background: #71ac61;
        }
      `}</style>
    </>
  );
};

const PricingCard = ({ plan, onStart }) => {
  return (
    <article
      className={`group relative flex min-h-[570px] h-full flex-col overflow-hidden rounded-[32px] border px-6 py-8 transition-all duration-500 md:px-7 lg:px-8 ${
        plan.highlighted
          ? "border-[#9BC88C] bg-[#F5FAF2] shadow-[0_30px_80px_rgba(80,125,67,0.16)] md:-translate-y-4"
          : "border-[#E3E9E0] bg-white shadow-[0_20px_60px_rgba(38,58,34,0.07)] hover:-translate-y-2 hover:border-[#BFD9B6] hover:shadow-[0_28px_75px_rgba(38,58,34,0.12)]"
      }`}
    >
      {/* Decorative glow */}
      <div
        className={`pointer-events-none absolute -right-24 -top-24 h-60 w-60 rounded-full blur-[80px] transition-opacity duration-500 ${
          plan.highlighted
            ? "bg-[#BFE1B2]/70"
            : "bg-[#DAECD4]/0 group-hover:bg-[#DAECD4]/60"
        }`}
      />

      {/* Badge */}
      {plan.badge && (
        <div className="absolute right-5 top-5 z-10">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-dm text-[10px] font-medium uppercase tracking-[0.16em] ${
              plan.highlighted
                ? "bg-[#71AC61] text-white"
                : "border border-[#C7DCC0] bg-white text-[#639553]"
            }`}
          >
            {plan.highlighted && <Sparkles size={12} />}
            {plan.badge}
          </span>
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col">
        <p className="font-dm text-[11px] uppercase tracking-[0.2em] text-[#80A576]">
          {plan.durationLabel} membership
        </p>

        <h3 className="mt-2 font-season-medium text-[34px] leading-tight text-[#202A21]">
          {plan.title}
        </h3>

        <p className="mt-2 min-h-[72px] font-dm text-[14px] leading-6 text-[#747B72]">
          {plan.description}
        </p>

        <div className="mt-2 flex items-end gap-2">
          <span className="font-noto text-[42px] font-semibold leading-none text-[#202A21] lg:text-[48px]">
            {plan.price}
          </span>

          <span className="pb-1.5 font-dm text-[12px] uppercase tracking-[0.08em] text-[#7C837B]">
            / {plan.duration}
          </span>
        </div>

        <div className="my-7 h-px bg-gradient-to-r from-[#D4E2CF] via-[#D4E2CF] to-transparent" />

        <ul className="space-y-4">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 font-dm text-[13px] leading-6 text-[#5E665D] lg:text-[14px]"
            >
              <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E7F2E3] text-[#659E55]">
                <Check size={12} strokeWidth={3} />
              </span>

              <span>{feature}</span>
            </li>
          ))}
        </ul>

      </div>
    </article>
  );
};

export default Pricing;