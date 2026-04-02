import React from "react";
import TheScienceBottom from "../../assets/images/TheScienceBottom.png"

const stepsIndividual = [
  "Join a free live session",
  "Practice daily with the community",
  "Receive your before & after report",
  "Continue with the 12-month program",
];

const stepsOrg = [
  "30-minute discovery call",
  "Baseline assessment",
  "Weekly live sessions",
  "Before–after impact report",
];

const StepItem = ({ number, text, isLast }) => {
  return (
    <li className="relative flex items-start gap-4">

      {/* Left Timeline */}
      <div className="relative flex flex-col items-center">
        
        {/* Circle */}
        <div className="w-8 h-8 flex items-center justify-center rounded-full border border-greenbase text-greenbase text-sm font-semibold bg-[#C2E0BA33] z-20 ">
          {number}
        </div>

        {/* Vertical Line */}
        {!isLast && (
          <span className="absolute top-8 left-1/2 -translate-x-1/2 w-[2px] h-[calc(100%-8px)] bg-[#71AC61]"></span>
        )}
      </div>

      {/* Text */}
      <p className="text-primary font-dm font-medium text-sm md:text-base">
        {text}
      </p>
    </li>
  );
};

export default function HowItWorks() {
  return (
    <section className="relative bg-white">


    <div className="relative">
            <img src={TheScienceBottom} alt="sciencebotttom" className='h-24 w-full' /> 
              <div className="absolute inset-0 pointer-events-none 
        bg-gradient-to-b from-transparent via-white/40 to-[#FAFAFA]" />
            </div>


      <div className="max-w-6xl mx-auto text-center py-16 px-4 md:px-10">

        {/* Heading */}
        <header>
          <p className="text-greenbase text-medium font-season-medium leading-[30px] tracking-widest text-center uppercase mb-2">
            HOW IT WORKS
          </p>

          <h2 className="text-3xl md:text-5xl font-season-medium text-primary leading-10 md:leading-[50px]">
            Here is exactly <br />
            <span className="text-greenbase">
              what happens next.
            </span>
          </h2>

          <p className="my-4 text-primary font-medium font-dm max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Two tracks, one for individuals building a personal practice, one
            for institutions bringing it to a group. Both end with a measured
            outcome.
          </p>
        </header>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Individual */}
          <article className="bg-[#C2E0BA33] rounded-2xl p-6 text-left">
            <span className="inline-block bg-[#C2E0BA33] font-dm text-greenbase text-medium px-4 py-2 rounded-full mb-4">
              For Individual
            </span>

            <h3 className="font-semibold text-primary mb-6 font-dm">
              Your first 21 days, and beyond
            </h3>

            <ul className="space-y-6">
              {stepsIndividual.map((step, index) => (
                <StepItem
    key={index}
    number={index + 1}
    text={step}
    isLast={index === stepsIndividual.length - 1}
  />
              ))}
            </ul>
          </article>

          {/* Organization */}
          <article className="bg-[#C2E0BA33] rounded-2xl p-6 text-left">
           <span className="inline-block bg-[#C2E0BA33] font-dm text-greenbase text-medium px-4 py-2 rounded-full mb-4">
              For Schools, Organisations & Senior Communities
            </span>

            <h3 className="font-semibold text-primary mb-6 font-dm">
              From first conversation to impact report
            </h3>

            <ul className="space-y-6">
              {stepsOrg.map((step, index) => (
                <StepItem key={index} number={index + 1} text={step}
                isLast={index === stepsOrg.length - 1} />
              ))}
            </ul>
          </article>

        </div>
      </div>
    </section>
  );
}