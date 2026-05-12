import React, { useEffect, useState } from "react";
import ProgramPage from "../../assets/images/ProgramPage.png";

const words = ["Structured", "Trackable", "Built to last"];

const Programs = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#F6FCF5]">
      {/* Background Image */}
      <img
        src={ProgramPage}
        alt="Meditation"
        className="absolute left-[30%] right-0 inset-0 w-[70%] h-full object-cover object-right z-0"
      />

      {/* Left Soft White Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#F7FCF5] via-[#F7FCF5]/95 to-transparent" />

      {/* Extra Center Fade */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#F7FCF5]/90 via-white/35 to-transparent" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-[470px]">
            <h1 className="px-12 md:px-0 heading-main font-semibold text-primary font-season-med leading-tight text-left">
              Meditation that fits <br />
              your life{" "}
              <span
                className={`text-[#71AC61] inline-block transition-all duration-500 ${
                  fade
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
              >
                {words[index]}
              </span>
            </h1>

            <p className="max-w-4xl px-2 mt-2 text-gray font-dm paragraph-body text-left">
              From stress and burnout to focus, sleep, and emotional
              regulation, every session is designed using proven mental
              frameworks, not guesswork.
            </p>

            <div className="mt-7 flex items-center gap-4">
              <button className="bg-[#71AC61] w-full sm:w-[250px] text-white font-medium font-dm px-4 py-4 rounded-full hover:bg-[#4F7944] transition-all duration-300 cursor-pointer">
                Explore Sessions
              </button>

              <button className="bg-transparent border w-full sm:w-[250px] text-[#71AC61] font-medium font-dm px-4 py-4 cursor-pointer rounded-full hover:bg-[#4F7944] transition-all duration-300 hover:text-white/80">
                I have an account
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;