import React from "react";
import ProgramLowerBg from "../../assets/images/ProgramLowerBg.png";
import ProgramIcon1 from "../../assets/images/ProgramIcon1.png";
import ProgramIcon2 from "../../assets/images/ProgramIcon2.png";
import ProgramIcon3 from "../../assets/images/ProgramIcon3.png";

const AvyaktSystem = () => {
  const steps = [
    {
      icon: ProgramIcon1,
      title: "Assess",
      desc: "Complete a quick, science-based assessment to personalize your journey.",
    },
    {
      icon: ProgramIcon2,
      title: "Practice",
      desc: "Engage in daily guided sessions tailored specifically for your needs.",
    },
    {
      icon: ProgramIcon3,
      title: "Progress",
      desc: "Track your progress toward focus and emotional balance.",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#F8F9F8]">

      {/* Top Background */}
     <div> 
        <img src={ProgramLowerBg} alt="programbg" className='h-24 w-full' /> 
        </div>

      


      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">

        {/* Heading */}
        <h1 className="font-season-medium text-3xl md:text-5xl text-primary">
          The <span className="text-greenbase">Avyakt</span> System
        </h1>

        <p className="mt-4 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          A proven three-step methodology designed to transform your mental well-being from the inside out.
        </p>

        {/* Steps */}
        <div className="relative mt-16">

  {/* Dashed Center Line */}
  <div className="hidden md:block absolute top-[40px] left-[16.66%] right-[16.66%] border-t-2 border-dashed border-[#71ac61]/20 z-0"></div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

    {steps.map((step, index) => (
      <div key={index} className="flex flex-col items-center text-center">

        {/* Circle */}
        <div className="relative z-10 w-20 h-20 rounded-full bg-[#EAF4E6] flex items-center justify-center mb-6">
          <img
            src={step.icon}
            alt={step.title}
            className="w-10 h-10 object-contain"
          />
        </div>

        <h3 className="text-xl md:text-2xl font-season font-semibold text-primary">
          {step.title}
        </h3>

        <p className="mt-3 font-dm text-primary text-sm md:text-base max-w-xs">
          {step.desc}
        </p>

      </div>
    ))}

  </div>
</div>

        {/* Button */}
        <button className="mt-16 font-dm bg-greenbase-primary text-white px-8 py-4 rounded-full hover:scale-105 transition-all duration-300">
          Schedule a Demo
        </button>

      </div>
    </div>
  );
};

export default AvyaktSystem;