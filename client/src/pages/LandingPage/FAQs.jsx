import React, { useState } from "react";

const faqData = [
  {
    question: "Do I need any prior meditation experience?",
    answer:
      "No, you don’t need any prior experience. Our sessions are designed for beginners as well as advanced practitioners.",
  },
  {
    question:
      "What is the difference between meditation sessions and silence sessions?",
    answer:
      "Meditation sessions are guided, while silence sessions allow you to practice independently in a calm environment.",
  },
  {
    question: "How is this different from a meditation app?",
    answer:
      "Unlike apps, we provide a real-world, immersive experience with guided and silent sessions in a structured environment.",
  },
  {
    question:
      "Is the science actually peer-reviewed, or is this wellness marketing?",
    answer:
      "Our approach is backed by scientific research and mindfulness studies, not just wellness trends.",
  },
];

function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <header className="mb-10">
          <p className="text-greenbase font-season text-center font-medium tracking-wide">
            FAQ
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold text-primary font-season-medium  mt-2">
            Questions we get most often.
          </h2>
          <p className="text-primary font-dm text-center mt-2 text-lg">
            Direct answers. No fluff.
          </p>
        </header>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <article
              key={index}
              className="bg-[#C2E0BA33] rounded-xl px-5 py-4 text-left cursor-pointer transition"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center font-dm">
                <h3 className="text-primary text-sm md:text-lg font-medium leading-[40px]">
                  {item.question}
                </h3>
                <span className="text-primary font-medium text-lg font-dm">
                  {activeIndex === index ? "−" : "›"}
                </span>
              </div>

              {activeIndex === index && (
                <p className="mt-3 text-medium text-primary font-dm leading-relaxed">
                  {item.answer}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;