import React from "react";
import liveSessionHero from "../../assets/images/liveSessionHero.png";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#C2E0BA33]">
      {/* Background Image */}
      <img
        src={liveSessionHero}
        alt="Meditation"
        className="
          absolute top-0 right-0 z-0
          h-[55%] w-full object-cover object-center
          md:h-full md:w-[57%]
        "
      />

      {/* Desktop Overlay */}
      <div className="hidden md:block absolute inset-0 z-[1] bg-[linear-gradient(90deg,#F7FCF5_0%,#F7FCF5_42%,rgba(247,252,245,0)_100%)]" />

      {/* Mobile Overlay */}
<div className="absolute inset-0 z-[1] md:hidden bg-[linear-gradient(to_top,#F7FCF5_0%,rgba(247,252,245,1)_48%,rgba(247,252,245,0.9)_54%,rgba(247,252,245,0.4)_62%,transparent_78%)]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-end md:items-center">
        <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-6 md:px-12 lg:px-20">
          <div
            className="
              max-w-[580px]
              pb-10 pt-[340px]
              sm:pt-[420px]
              md:py-0
            "
          >
            {/* Heading */}
            <h1
              className="
                text-left
                font-semibold
                heading-main
                text-primary
                font-season-medium
                px-4
              "
            >
              In stillness, rediscover your true strengths
            </h1>

            {/* Paragraph */}
            <p
              className="
                max-w-5xl px-2 mt-2 text-gray font-dm paragraph-body text-left
              "
            >
              A live, daily practice grounded in neuroscience - providing a
              digital sanctuary for your mind, every single night.
            </p>

            {/* Buttons */}
            <div
              className="
                mt-8
                flex flex-col sm:flex-row
                gap-4
                w-full
              "
            >
              <button
                className="
                  bg-[#71AC61]
                  w-full sm:w-[250px]
                  text-white
                  font-medium
                  font-dm
                  px-6 py-4
                  rounded-full
                  hover:bg-[#4F7944]
                  transition-all duration-300
                  cursor-pointerbg-[#71AC61] w-full sm:w-[250px] text-white font-medium font-dm px-4 py-4 rounded-full hover:bg-[#4F7944] transition-all duration-300 cursor-pointer
                "
              >
                Start free 21-days
              </button>

              <button
                className="
                  bg-transparent border w-full sm:w-[250px] text-[#71AC61] font-medium font-dm px-4 py-4 cursor-pointer rounded-full hover:bg-[#4F7944] transition-all duration-300 hover:text-white/80
                "
              >
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