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
    <div className="relative h-screen w-full bg-white overflow-hidden">
      <div className="relative w-full h-screen overflow-hidden z-10">
        <img
          src={HeroLanding}
          alt="Hero"
          className="absolute bottom-0 md:-bottom-0 lg:-bottom-0 xl:-bottom-10 md:right-0 bg-[#191919] w-auto h-auto min-w-full min-h-full object-cover -z-10 pointer-events-none"
        />

          <div className="absolute bottom-0 left-0 w-full h-[80px] bg-gradient-to-t from-white to-transparent" />


        <div className="absolute inset-0 max-w-2xl md:max-w-full flex items-center justify-center z-50">


          <div className="text-white font-season-medium text-center md:mt-[1rem] ">

            <div className="px-12 md:px-0">
              <h1 className="heading-main font-season-regular">
              Meditation that fits your life,
              <br />
              <span className="text-greenbase-light">structured, trackable, built to last.</span>
            </h1>

            </div>

            <div className="text-center max-w-4xl mx-auto px-24 mt-4">
              <p className="paragraph-body font-dm text-center ">
                Build a real meditation habit with daily live sessions, science-backed programs, and progress you can actually see, for individuals, schools, organizations, and senior communities.
              </p>
            </div>


            <div className="flex flex-col sm:flex-row gap-4 justify-center px-8 mt-6">
              <button
                className="bg-[#71AC61]  w-full sm:w-[250px] text-white font-medium font-dm px-4 py-4 rounded-full hover:bg-[#4F7944] transition-all duration-300 cursor-pointer"
              >
                Get Started
              </button>

              <button
                className="bg-transparent border w-full sm:w-[250px] text-greenbase-light font-medium font-dm px-4 py-4 cursor-pointer rounded-full hover:bg-[#4F7944] transition-all duration-300"
              >
                Explore Programs
              </button>
            </div>
            <div className="mt-8 paragraph-secondary text-center font-dm text-white">
              <ul className="flex flex-col sm:flex-row justify-center  mb-4 gap-4">
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