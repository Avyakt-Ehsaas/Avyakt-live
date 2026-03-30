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

        
        <div className="absolute inset-0 max-w-2xl md:max-w-full flex items-center justify-center z-50">


          <div className="text-white font-season-medium text-center md:mt-[1rem] ">

      <ul className="flex justify-center font-dm text-white mb-4 gap-4">
              <li>Backed by Google For Startups</li>
              <span className="w-2 h-2 rounded-full bg-greenbase mt-2 ml-2"></span>
              <li>
              IIT Mandi Catalyst</li>
              <span className="w-2 h-2 rounded-full bg-greenbase mt-2 ml-2"></span>
              <li>500+ Live Sessions Delivered</li>
          </ul>

            <h1 className="mb-3 mx-8 md:mx-18 md:mx-0 md:text-5xl 3xl:text-6xl text-5xl leading-[50px]">
             Meditation that fits your life, 
              <br />
              <span className="text-greenbase-light">structured, trackable, built to last.</span>
            </h1>

           <div className="text-center max-w-3xl pl-24 px-12">
             <p className="text-[18px] leading-[28px] md:leading-relaxed md:text-lg mb-4 md:font-medium font-dm text-center">
            Build a real meditation habit with daily live sessions, science-backed programs, and progress you can actually see, for individuals, schools, organizations, and senior communities.
            </p>
           </div>


           <div className="flex gap-4 justify-center">
             <button
              onClick={handleClick}
              className="bg-greenbasebg w-[200px] mb-2 text-white font-semibold font-dm mt-4 px-4 py-3 rounded-full hover:scale-105 transition-transform duration-300 mb-8 md:mb-2 cursor-pointer"
            >
              Get Started
            </button>

             <button
              onClick={handleClick}
              className="bg-transparent w-[200px] border border-greenbase-light  mb-2 text-greenbase-light font-semibold font-dm mt-4 px-4 py-3 rounded-full hover:scale-105 transition-transform duration-300 mb-8 md:mb-2 cursor-pointer"
            >
              Explore Programs
            </button>
           </div>

            {/* <div className="md:flex md:justify-center ">
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
              </p>s
            </div> */}

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