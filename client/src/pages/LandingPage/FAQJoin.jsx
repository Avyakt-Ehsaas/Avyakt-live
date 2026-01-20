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
    // if clicking the same open question → close it
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      // close previous & open current
      setOpenIndex(index);
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Frequently Asked <span className="text-orange-600">Questions</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* FAQ */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-lg bg-orange-50"
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center p-4 font-semibold text-left"
                >
                  {faq.q}
                  <FaChevronDown
                    className={`transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-4 pb-4 text-gray-700">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Join Steps */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">How To Join</h3>
            <ul className="space-y-3">
              {joinSteps.map((step, index) => (
                <li key={index} className="flex items-center gap-3">
                  <FaCheckCircle className="text-orange-500" />
                  {step}
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
