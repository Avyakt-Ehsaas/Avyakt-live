import React, { useState } from "react";
import { Check } from "lucide-react";

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

  const plans = pricingData[activeTab];

  return (
    <>
      <section className="relative w-full overflow-x-hidden py-14 md:py-20">
        {/* Top Fade */}
        <div className="pointer-events-none absolute top-0 left-0 z-[1] h-[160px] w-full bg-gradient-to-b from-white via-white/80 to-transparent" />

        {/* Main Content */}
        <div className="relative z-10 px-1 md:px-6">
          {/* Tabs */}
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

          {/* Desktop Grid */}
          <div className="hidden md:grid relative z-10 mx-auto max-w-6xl grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                activeTab={activeTab}
              />
            ))}
          </div>

          {/* Mobile Swiper */}
          <div className="md:hidden w-[520px] overflow-hidden pl-16">
                     <Swiper
                       modules={[Pagination, Autoplay]}
                       spaceBetween={18}
                       slidesPerView={1.2}
                      //  centeredSlides={true}
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
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

const PricingCard = ({ plan, activeTab }) => {
  return (
    <div
      className={`min-h-[520px] rounded-[34px] px-6 md:px-8 py-6 shadow-[0_18px_35px_rgba(0,0,0,0.10)] bg-white hover:bg-[#c2e0ba] border transition-all duration-300 ${plan.highlighted
          ? "border-greenbase bg-[#F7FCF5]"
          : "border-transparent"
        }`}
    >
      {/* Heading */}
      <h3 className="font-season-medium heading-large text-left font-med text-primary">
        {plan.name}
      </h3>

      <p className="mt-2 font-dm text-gray paragraph-secondary text-left">
        {plan.subtitle}
      </p>

      {/* Price */}
      <div className="mt-4 flex items-end gap-1">
        <span className="font-smbold text-[42px] leading-none font-noto text-primary">
          {plan.price}
        </span>

        <span className="pb-1 uppercase text-gray font-dm paragraph-secondary text-left">
          / {activeTab === "Monthly" ? "Month" : activeTab}
        </span>
      </div>

      {/* Features */}
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

      {/* CTA */}
      <button className="mt-8 w-full rounded-full bg-[#71AC61] px-4 py-4 text-white font-medium font-dm transition-all duration-300 hover:bg-[#4F7944] cursor-pointer">
        Start free 21-days
      </button>

       <style jsx>{`
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
    </div>
  );
};

export default Pricing;