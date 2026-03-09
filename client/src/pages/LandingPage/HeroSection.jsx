import React from "react";
import HeroImage from "../../assets/images/HeroImage.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LandingSidebar from "./LandingSidebar/LandingSidebar";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    try {
      navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="relative h-screen w-full bg-white overflow-hidden">
      <div className="relative w-full h-screen overflow-hidden z-10">
        <img
          src={HeroImage}
          alt="Hero"
          className="absolute bottom-0 md:-bottom-0 lg:-bottom-0 xl:-bottom-10 md:right-0 bg-[#191919] w-auto h-auto min-w-full min-h-full object-cover -z-10 pointer-events-none"
        />

        <div className="absolute inset-0  max-w-2xl md:max-w-full flex items-center justify-center z-50">

          <div className="text-white font-season-medium text-center md:mt-[1rem]">
            <h1 className="mb-3 mx-8 md:mx-18 md:mx-0 md:text-5xl 3xl:text-6xl text-5xl">
              Discover Your{" "}
              <span className="text-greenbase-light">
                Avyakt Potential
              </span>
              <br />
              Through{" "}
              <span className="text-greenbase-light">Meditation</span>
            </h1>

           <div className="text-center max-w-3xl px-10 md:px-16">
             <p className="text-[18px] leading-[28px] md:leading-relaxed md:text-lg mb-4 md:font-medium font-dm">
              Whether you want to stay focused, feel calmer, or simply feel better we help you build a healthier relationship with your mind.
            </p>
           </div>

            <p className="text-greenbase-light text-[1.1rem] font-medium font-dm">
              Join the 21-Day Live Meditation Journey
            </p>

            <button
              onClick={handleClick}
              className="bg-greenbasebg mb-2 text-white font-semibold font-dm mt-4 px-4 py-3 rounded-full hover:scale-105 transition-transform duration-300 mb-8 md:mb-2 cursor-pointer"
            >
              Start Your Journey
            </button>

            <div className="md:flex md:justify-center ">
              <div className="flex justify-center items-center">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={`https://randomuser.me/api/portraits/${i % 2 ? "women" : "men"}/${i}.jpg`}
                    alt={`user${i}`}
                    className="w-8 h-8 rounded-full"
                    style={{ marginLeft: i > 0 ? "-5px" : "0" }}
                  />
                ))}
              </div>

              <p className="ml-2 mt-2 font-medium font-dm">
                Trusted by 500+ users on their wellness journey
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Down Arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 cursor-pointer">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-white/40 backdrop-blur-sm animate-bounce hover:scale-110 transition">
            <span className="text-white text-lg leading-none">↓</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;