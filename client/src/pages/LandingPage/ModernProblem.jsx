import React from "react";
import Earth from "../../assets/images/earth.png";

const ModernProblem = () => {
  return (
    <section className="w-full min-h-screen bg-white overflow-hidden flex items-center">
      
      <div className="max-w-[1400px] mx-auto w-full px-12 grid grid-cols-2 items-center">
        
        {/* LEFT SIDE - Globe */}
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={Earth}
            alt="Earth"
            className="absolute bottom-[-150px] left-[-150px] 
                       w-[950px] max-w-none object-contain"
          />
        </div>

        {/* RIGHT SIDE - Content */}
        <div className="pl-16">
          <h1 className="text-[72px] leading-[1.05] font-semibold text-[#0F172A]">
            Modern life <br />
            overwhelms <br />
            <span className="text-[#16A34A]">every mind.</span>
          </h1>

          <p className="mt-8 text-lg text-gray-600 leading-relaxed max-w-xl">
            From early childhood to adulthood, constant stimulation,
            pressure, and emotional overload are affecting focus,
            wellbeing, and inner calm.
          </p>

          <button className="mt-10 px-8 py-4 bg-[#16A34A] 
                             text-white rounded-full 
                             text-base font-medium 
                             hover:scale-105 
                             transition-all duration-300">
            See what we mean
          </button>
        </div>

      </div>
    </section>
  );
};

export default ModernProblem;
