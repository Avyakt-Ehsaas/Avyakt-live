import React from "react";
import HeroImage from "../../assets/images/HeroImage.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LandingSidebar from "./LandingSidebar/LandingSidebar";
import HeroLanding from '../../assets/images/HeroLanding.png'

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
    <div className="relative h-[140vh]  sm:h-screen w-full bg-white overflow-hidden">
      <div className="relative w-full h-[140vh]  sm:h-screen overflow-hidden z-10">
        <img
          src={HeroLanding}
          alt="Hero"
          className="absolute bottom-0 md:-bottom-0 lg:-bottom-0 xl:-bottom-10 md:right-0 bg-[#191919] w-auto h-[140vh]  sm:h-auto min-w-full min-h-full object-[left_2%] -z-10 pointer-events-none"
        />

          <div className="absolute bottom-0 left-0 w-full h-[80px] bg-gradient-to-t from-white to-transparent" />


        <div className="absolute inset-0 max-w-2xl md:max-w-full flex items-center justify-center z-50 pointer-events-none">


          <div className="text-white font-season-medium text-center md:mt-[1rem] pointer-events-auto">



            <h1 className="mb-3 mx-8 md:mx-18 md:mx-0 md:text-5xl 3xl:text-6xl text-4xl leading-tight">
              Meditation that fits your life,
              <br />
              <span className="text-greenbase-light">structured, trackable, built to last.</span>
            </h1>

            <div className="text-center max-w-3xl mx-auto px-18">
              <p className="text-[16px ] leading-[24px]  md:leading-[28px] md:leading-relaxed md:text-lg mb-4 md:font-medium font-dm text-center">
                Build a real meditation habit with daily live sessions, science-backed programs, and progress you can actually see, for individuals, schools, organizations, and senior communities.
              </p>
            </div>


            <div className="flex flex-col sm:flex-row gap-4 justify-center px-8 mt-6">
              <button
              onClick={handleClick}
                className="bg-greenbasebg  w-full sm:w-[200px] text-white font-semibold font-dm px-4 py-4 rounded-full cursor-pointer"
              >
                Get Started
              </button>

              <button
                className="bg-transparent border w-full sm:w-[200px] text-greenbase-light font-semibold font-dm px-4 py-4 rounded-full"
              >
                Explore Programs
              </button>
            </div>
            <div className="mt-8">
              <ul className="flex flex-col sm:flex-row justify-center font-dm text-white mb-4 gap-4">
                <li>Backed by Google For Startups</li>
                <span className="hidden sm:flex w-2 h-2 rounded-full bg-greenbase mt-2 ml-2 sm:visible"></span>
                <li>
                  IIT Mandi Catalyst</li>
                <span className="hidden sm:flex w-2 h-2 rounded-full bg-greenbase mt-2 ml-2 sm:visible"></span>
                <li>500+ Live Sessions Delivered</li>
              </ul>
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