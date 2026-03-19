import React from "react";
import ProgramBg from "../../assets/images/ProgramBg.png";

const Programs = () => {
  return (
    <div className="relative w-full min-h-[130vh] overflow-hidden z-1">

      {/* Background Image */}
      <img        
      src={ProgramBg}
      alt="Hero"
      className='absolute bottom-0 right-0 w-auto h-auto min-w-full min-h-full object-cover z-0'
      />
      {/* Light Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-transparent"></div>
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-6xl font-season">
          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-medium text-primary leading-snug">
            Programs Designed for Real-World Impact
          </h1>
          {/* Subtext */}
          <p className="mt-2 text-primary font-dm text-lg leading-[24px]">
            Modular, research-informed meditation programs built for schools,
            organizations, individuals, <br /> and senior communities — each grounded
            in neuroscience and measurable outcomes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Programs;