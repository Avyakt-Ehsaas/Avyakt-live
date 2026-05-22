import React,{useState,useEffect} from 'react'
import { Check } from "lucide-react";

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
    <section className="relative w-full overflow-hidden px-6 py-8">

      <div className="relative z-10 mb-8 flex justify-center gap-10 text-sm font-semibold">
        {Object.keys(pricingData).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-5 transition ${
              activeTab === tab ? "text-greenbase" : "text-primary"
            } font-dm font-smbold paragraph-secondary `}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-1/2 h-[3px] w-[70px] -translate-x-1/2 bg-greenbase-primary" />
            )}
          </button>
        ))}
      </div>

      <div className="relative max-h-[480px] z-10 mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 ">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`min-h-[400px] rounded-[34px] px-8 py-8 shadow-[0_18px_35px_rgba(0,0,0,0.16)] bg-white border ${plan.highlighted ? "border-greenbase" : "border-transparent"} hover:bg-[#C2E0BA] hover:text-white transition-colors duration-300 cursor-pointer`}
          >
            <h3 className="font-season-medium heading-large text-left font-med text-primary">
              {plan.name}
            </h3>

            <p className="mt-2 font-dm text-gray paragraph-secondary text-left">{plan.subtitle}</p>

            <div className="mt-1 flex items-end gap-1">
              <span className="font-smbold text-[40px] font-noto text-primary">
                {plan.price}
              </span>
              <span className="pb-4 uppercase text-gray font-dm paragraph-secondary text-left">
                / {activeTab === "Monthly" ? "Month" : activeTab}
              </span>
            </div>

            <ul className="mt-3 space-y-3">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-gray font-dm paragraph-secondary text-left"
                >
                  <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#6fad5f] text-white">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

          <button className="mt-4 bg-[#71AC61] w-full sm:w-[250px] text-white font-medium font-dm px-3   py-3 rounded-full hover:bg-[#4F7944] transition-all duration-300 cursor-pointer">
                Start free 21-days
              </button>
          </div>
        ))}
      </div>
    </section>



    </>
  )
}

export default Pricing

