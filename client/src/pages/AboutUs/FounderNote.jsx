import React from "react";
import founderImg from "../../assets/images/FounderNote.png";

export default function FounderNote() {
  return (
    <section className="relative bg-[#F5F2ED] py-[3rem] pt-[8rem] px-4 overflow-hidden">
      
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern grid-fade-top pointer-events-none z-0" />

      {/* Container */}
      <div className="relative z-10 max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-[40px] items-center">
        
        {/* Image */}
        <div className="w-full h-[420px]">
          <img
            src={founderImg}
            alt="Founder"
            className="w-full h-full object-cover rounded-[20px]"
          />
        </div>

        {/* Content Card */}
        <div className="bg-[#C2E0BA] p-[40px] rounded-[20px] h-[420px] flex flex-col justify-center ">
          
          {/* Heading */}
          <h2 className="text-[36px] leading-[40px] text-primary mb-[20px] font-season font-medium ">
            A note from our{" "}
            <span className="text-greenbase">founder</span>
          </h2>

          {/* Text */}
          <p className="text-[18px] leading-[28px] text-primary font-dm mb-[16px]">
            Many people are encouraged to meditate, but the practice often
            remains abstract.
          </p>

          <p className="text-[20px] leading-[40px] text-primary font-dm font-semibold mb-[16px]">
            The mind can be trained like any other skill.
          </p>

          <p className="text-[18px] leading-[30px] font-dm  text-primary mb-[16px]">
            Small, consistent practice gradually changes how we focus, respond
            to stress, and understand our inner experience. Avyakt combines
            meditation with learning and experimentation so people can explore
            how their mind works.
          </p>

        </div>
      </div>
    </section>
  );
}