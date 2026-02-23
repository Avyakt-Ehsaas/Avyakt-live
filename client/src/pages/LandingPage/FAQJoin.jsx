import React, { useState } from "react";
import { FaChevronDown, FaCheckCircle } from "react-icons/fa";

const faqs = [
  {
    q: "Is this suitable for beginners?",
    a: "Yes. The programme begins with foundational practices and builds gradually. No prior experience is required."
  },
  {
    q: "Do I need special equipment?",
    a: "No; only a quiet space and comfortable seating. Headphones are optional."
  },
  {
    q: "What if I miss a session?",
    a: "Recordings remain available for seven days so you can catch up at your convenience."
  },
  {
    q: "Is this programme tied to a religion or spiritual organisation?",
    a: "No. The practices are secular and grounded in universal principles of awareness, compassion and self-discovery."
  },
  {
    q: "When does billing start?",
    a: "Billing begins only after the 21-day free trial. You can cancel at any time."
  }
];

const joinSteps = [
  "Register your account",
  "Choose your plan",
  "Receive Zoom & guidance link",
  "Start your journey today"
];

const FAQJoin = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-green-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-[#71AC61] to-green-400 bg-clip-text text-transparent">
            Questions
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">

          {/* FAQ */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-green-100 rounded-xl bg-green-50/60 backdrop-blur-md shadow-sm hover:shadow-md transition"
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center p-4 font-semibold text-left text-gray-800"
                >
                  {faq.q}
                  <FaChevronDown
                    className={`transition-transform duration-300 text-green-600 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Join Steps */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">
              How To Join
            </h3>

            <ul className="space-y-4">
              {joinSteps.map((step, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 bg-white border border-green-100 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition"
                >
                  <FaCheckCircle className="text-green-500 text-lg" />
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQJoin;