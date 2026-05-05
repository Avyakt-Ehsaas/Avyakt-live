import "../AboutUs/gridPattern.css";

const Build = () => {
  const steps = [
    {
      number: "1",
      title: "Tell us what's going on",
      desc: "Pick your context, breakup, work stress, sleep issues, or just starting out. Takes 60 seconds.",
    },
    {
      number: "2",
      title: "We match you a session",
      desc: "Your first session is chosen for you. No browsing, no decision fatigue. Just press play.",
    },
    {
      number: "3",
      title: "Rate how you feel after",
      desc: "One tap. We use it to refine what we suggest next — and to show you your own progress over time.",
    },
    {
      number: "4",
      title: "Come back tomorrow",
      desc: "Your streak starts. Your library grows. Sessions get deeper as your practice does.",
    },
  ];

  return (
    <section className="relative pt-20 sm:pt-32 pb-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center relative">

        {/* Heading */}
      <p className="text-greenbase font-dm text-medium text-[14px] md:text-[20px] tracking-widest uppercase mb-6 md:mb-0 "> THE PROCESS </p>

        <h1 className="px-12 md:px-0 heading-main font-semibold text-primary font-season-med"> From first visit to lasting practice </h1>

        {/* Timeline */}
        <div className="relative mt-16">

          {/* Line */}
          <div className="hidden md:block absolute top-5 left-[10%] right-0 w-4xl border-t-2 border-dashed border-[#71AC6166]"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="text-center px-4">

                {/* Circle */}
                <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full border border-[#71AC61] text-[#71AC61] font-semibold bg-white">
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="mt-4 font-semibold text-primary font-dm paragraph-body font-med">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-2 paragraph-secondary font-dm text-[#706E6E]">
                  {step.desc}
                </p>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Build;