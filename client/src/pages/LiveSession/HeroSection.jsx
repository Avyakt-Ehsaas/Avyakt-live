import React, { useState } from "react";
import liveSessionHero from "../../assets/images/liveSessionHero.png";



const HeroSection = () => {
   
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#C2E0BA33]">
      {/* Background Image */}
   <img
  src={liveSessionHero}
  alt="Meditation"
  className="absolute top-0 right-0 h-full w-[57%] object-cover object-center z-0"
/>
{/* Left Soft White Overlay */} 
<div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,#F7FCF5_0%,#F7FCF5_42%,rgba(247,252,245,0)_100%)]" />
 

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-[580px]">
            <h1 className="px-4 md:px-0 heading-main font-semibold text-primary font-season-med leading-tight text-left">
              In stillness, rediscover your true strengths
            </h1>

            <p className="max-w-5xl px-2 mt-2 text-gray font-dm paragraph-body text-left">
            A live, daily practice grounded in neuroscience - providing a digital sanctuary for your mind, every single night.
            </p>

            <div className="mt-7 flex items-center gap-4">
              <button className="bg-[#71AC61] w-full sm:w-[250px] text-white font-medium font-dm px-4 py-4 rounded-full hover:bg-[#4F7944] transition-all duration-300 cursor-pointer">
                Start free 21-days
              </button>

              <button className="bg-transparent border w-full sm:w-[250px] text-[#71AC61] font-medium font-dm px-4 py-4 cursor-pointer rounded-full hover:bg-[#4F7944] transition-all duration-300 hover:text-white/80">
                How it works
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;