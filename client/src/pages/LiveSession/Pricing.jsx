import React, { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const pricingData = {
  Monthly: [
    {
      name: "Seeker",
      subtitle: "Build the foundation of your habit",
      price: "₹299",
      features: [
        "Basic well-being log",
        "Streak & session tracking",
        "Foundations & Body & Sleep libraries",
        "Daily live sessions at 9:30 PM IST",
      ],
    },
    {
      name: "Practitioner",
      subtitle: "Build the foundation of your habit",
      price: "₹499",
      highlighted: true,
      features: [
        "Daily live sessions at 9:30 PM IST",
        "All 5 libraries + SOS access",
        "Full profile & skill-area tracking",
        "Monthly well-being report",
        "Session recordings (48-hr access)",
      ],
    },
    {
      name: "Deep Dive",
      subtitle: "Go all the way",
      price: "₹899",
      features: [
        "Everything in Practitioner",
        "Monthly 1:1 with the instructor",
        "Personalized practice roadmap",
        "Early access to new topic modules",
        "Priority for workshops & intensives",
      ],
    },
  ],

  "6 Months": [
    {
      name: "Seeker",
      subtitle: "6-month habit building plan",
      price: "₹1,499",
      features: [
        "Everything in Monthly Seeker",
        "Save ₹295 compared to monthly",
        "Long-term streak tracking",
        "Quarterly progress snapshot",
      ],
    },
    {
      name: "Practitioner",
      subtitle: "Consistent practice with deeper access",
      price: "₹2,499",
      highlighted: true,
      features: [
        "Everything in Monthly Practitioner",
        "Save ₹495 compared to monthly",
        "All 5 libraries + SOS access",
        "Monthly well-being reports",
        "Session recordings access",
      ],
    },
    {
      name: "Deep Dive",
      subtitle: "Structured deep transformation",
      price: "₹4,499",
      features: [
        "Everything in Monthly Deep Dive",
        "Save ₹895 compared to monthly",
        "Monthly 1:1 instructor support",
        "Personalized roadmap",
        "Priority workshop access",
      ],
    },
  ],

  Annual: [
    {
      name: "Seeker",
      subtitle: "One full year of guided foundation",
      price: "₹2,999",
      features: [
        "Everything in Seeker",
        "Save ₹589 compared to monthly",
        "Annual progress review",
        "Habit-building roadmap",
      ],
    },
    {
      name: "Practitioner",
      subtitle: "Best for serious daily practice",
      price: "₹4,999",
      highlighted: true,
      features: [
        "Everything in Practitioner",
        "Save ₹989 compared to monthly",
        "Full profile & skill tracking",
        "Monthly reports for 12 months",
        "Priority access to new libraries",
      ],
    },
    {
      name: "Deep Dive",
      subtitle: "Complete yearly transformation plan",
      price: "₹8,999",
      features: [
        "Everything in Deep Dive",
        "Save ₹1,789 compared to monthly",
        "12 monthly 1:1 sessions",
        "Personalized yearly roadmap",
        "Priority workshops & intensives",
      ],
    },
  ],
};

const Pricing = () => {
  const [activeTab, setActiveTab] = useState("Monthly");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [payload, setPayload] = useState({});
  
    useEffect(() => {
      const token = localStorage.getItem("token");
  
      if (token) {
        try {
          const decoded = JSON.parse(
            atob(token.split(".")[1])
          );
  
          setPayload(decoded);
  
          console.log("User Payload:", decoded);
        } catch (error) {
          console.log("Invalid token");
        }
      }
    }, []);

    console.log(payload)

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  whatsapp: "",
});

useEffect(() => {
  if (payload?.sub) {
    setFormData((prev) => ({
      ...prev,
      name: payload?.name || "",
      email: payload?.sub || "",
    }));
  }
}, [payload]);

  const plans = pricingData[activeTab];

  const openModal = (plan) => {
    setSelectedPlan({
      ...plan,
      billingCycle: activeTab,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);

    setFormData({
      name: "",
      email: "",
      whatsapp: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = (e) => {
    e.preventDefault();

    const paymentData = {
      ...formData,
      planName: selectedPlan?.name,
      price: selectedPlan?.price,
      billingCycle: selectedPlan?.billingCycle,
    };

    console.log("Payment Data:", paymentData);

    /*
      Later you can replace this with:
      1. Razorpay integration
      2. Backend API call
      3. React Router navigation

      Example:
      navigate("/payment", { state: paymentData });
    */

    localStorage.setItem("paymentData", JSON.stringify(paymentData));

    navigate("/payment");
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isModalOpen]);

  return (
    <>
      <section
        id="pricing-section"
        className="relative w-full overflow-x-hidden py-14"
      >
        <div className="relative z-10 px-1 md:px-6">
          <div className="mb-10 flex items-center justify-center gap-6 md:gap-10">
            {Object.keys(pricingData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-4 transition-all duration-300 ${activeTab === tab ? "text-greenbase" : "text-primary"
                  } font-dm font-smbold paragraph-secondary`}
              >
                {tab}

                {activeTab === tab && (
                  <span className="absolute bottom-0 left-1/2 h-[3px] w-[60px] md:w-[70px] -translate-x-1/2 rounded-full bg-greenbase-primary" />
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:grid relative z-10 mx-auto max-w-6xl grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                activeTab={activeTab}
                onStart={() => openModal(plan)}
              />
            ))}
          </div>

          <div className="md:hidden w-full overflow-hidden px-4">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={18}
              slidesPerView={1.08}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="who-swiper !pb-12"
            >
              {plans.map((plan) => (
                <SwiperSlide key={plan.name}>
                  <PricingCard
                    plan={plan}
                    activeTab={activeTab}
                    onStart={() => openModal(plan)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 !z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 max-h-screen"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-[480px] rounded-[32px] bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200 hover:text-black"
            >
              <X size={20} />
            </button>

            <div className="pr-2">
              <p className="font-dm font-medium text-[#71AC61]">
                {selectedPlan?.name} Plan • {selectedPlan?.billingCycle}
              </p>

              <h2 className="font-season-medium text-3xl md:text-4xl text-primary">
                Start your 21-day journey
              </h2>

              <p className="mt-2 text-left font-dm text-gray paragraph-secondary">
                Enter your details and continue to the payment page.
              </p>
            </div>

            <form onSubmit={handlePayment} className="mt-4 space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-full border border-gray-200 px-5 py-4 font-dm text-primary outline-none transition focus:border-[#71AC61]"
                />
              </div>

              <div>

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-full border border-gray-200 px-5 py-4 font-dm text-primary outline-none transition focus:border-[#71AC61]"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="whatsapp"
                  required
                  placeholder="Enter WhatsApp number"
                  value={formData.whatsapp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    if (value.length <= 10) {
                      setFormData((prev) => ({
                        ...prev,
                        whatsapp: value,
                      }));
                    }
                  }}
                  pattern="[0-9]{10}"
                  maxLength={10}
                  inputMode="numeric"
                  className="w-full rounded-full border border-gray-200 px-5 py-4 font-dm text-primary outline-none transition focus:border-[#71AC61]"
                />
              </div>

              <div className="rounded-2xl bg-[#F7FCF5] px-4 py-2">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-dm text-sm text-gray">
                    Selected Plan
                  </span>
                  <span className="font-dm font-semibold text-primary">
                    {selectedPlan?.name}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="font-dm text-sm text-gray">Price</span>
                  <span className="font-dm font-semibold text-primary">
                    {selectedPlan?.price} /{" "}
                    {selectedPlan?.billingCycle === "Monthly"
                      ? "Month"
                      : selectedPlan?.billingCycle}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#71AC61] px-5 py-4 font-dm font-medium text-white transition-all duration-300 hover:bg-[#4F7944]"
              >
                Go to Payment Page
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .who-swiper {
          padding-bottom: 42px !important;
        }

        .who-swiper .swiper-pagination {
          bottom: 0px !important;
        }

        .who-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #c9dec4;
          opacity: 1;
          margin: 0 4px !important;
        }

        .who-swiper .swiper-pagination-bullet-active {
          background: #6bad5f;
        }
      `}</style>
    </>
  );
};

const PricingCard = ({ plan, activeTab, onStart }) => {
  return (
    <div
      className={`min-h-[520px] rounded-[34px] px-6 md:px-8 py-6 shadow-[0_18px_35px_rgba(0,0,0,0.10)] bg-white hover:bg-[#c2e0ba] border transition-all duration-300 ${plan.highlighted
        ? "border-greenbase bg-[#F7FCF5]"
        : "border-transparent"
        }`}
    >
      <h3 className="font-season-medium heading-large text-left font-med text-primary">
        {plan.name}
      </h3>

      <p className="mt-2 font-dm text-gray paragraph-secondary text-left">
        {plan.subtitle}
      </p>

      <div className="mt-4 flex items-end gap-1">
        <span className="font-smbold text-[42px] leading-none font-noto text-primary">
          {plan.price}
        </span>

        <span className="pb-1 uppercase text-gray font-dm paragraph-secondary text-left">
          / {activeTab === "Monthly" ? "Month" : activeTab}
        </span>
      </div>

      <ul className="mt-6 space-y-4">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-gray font-dm paragraph-secondary text-left"
          >
            <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6fad5f] text-white">
              <Check size={12} strokeWidth={3} />
            </span>

            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onStart}
        className="mt-8 w-full rounded-full bg-[#71AC61] px-4 py-4 text-white font-medium font-dm transition-all duration-300 hover:bg-[#4F7944] cursor-pointer"
      >
        Start free 21-days
      </button>
    </div>
  );
};

export default Pricing;