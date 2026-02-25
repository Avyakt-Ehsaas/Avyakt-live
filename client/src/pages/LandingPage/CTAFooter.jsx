import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import LowerCTA from '../../assets/images/LowerCTA.png'
import DarkLogo from "../../assets/images/LogoDark.svg";
import avyaktFooter from '../../assets/images/avyaktFooterWatermark.svg';

const CTAFooter = () => {
  return (
    <section className="relative w-full min-h-screen h-[940px] text-white overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute -bottom-[240px] inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${LowerCTA})`,
        }}
      /> 
       {/* <div
        className="absolute inset-0 top-[-280px]"
        style={{
          background: "linear-gradient(to bottom, rgba(235, 244, 232, 0.1) 0%, rgba(244, 249, 244, 2) 5%, transparent 80%)",
        }}
      /> */}
      <div
        className="absolute inset-0 bottom-[-200px]"
        style={{
          background: "linear-gradient(to top, rgba(235, 244, 232, 0.1) 0%, rgba(244, 249, 244, 2) 25%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 text-center">

        {/* Heading */}
        <h1 className="font-season-medium text-4xl md:text-5xl -mt-48 font-medium mb-4 tracking-wide">
          Mindfulness for every stage of life.
        </h1>

        {/* Subtext */}
        <p className="max-w-3xl font-dm text-gray-200 mb-8 text-sm md:text-sm leading-relaxed">
          Sign up to receive simple and effective meditation, yoga, and other wellness tips from experts with decades of experience. Occasionally, we’ll let you know about our upcoming retreats, too.
        </p>

        <div className="flex flex-col md:flex-row">
          <div className="">
            {/* Form Row 1 */}
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl">
              <input
                type="text"
                placeholder="First Name"
                className="px-5 py-3 rounded-full bg-white/90 text-primary w-full outline-none"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="px-5 py-3 rounded-full bg-white/90 text-primary w-full outline-none"
              />
            </div>

            {/* Form Row 2 */}
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-3 rounded-full bg-white/90 text-primary w-full outline-none"
              />
            </div>
         <div className="h-20 flex items-center justify-center mt-4 ml-3">
           <button className="bg-[#71AC61] font-dm hover:bg-[#5cad6a] transition px-8 py-3 rounded-full font-medium whitespace-nowrap">
            Sign up
          </button>
         </div>
          </div>
 </div>
        {/* Footer */}
        <div className="absolute bottom-4 w-full flex flex-col items-center">

          <div className="flex justify-center gap-16 mb-4 w-16">
            <img src={DarkLogo} alt="Dark logo " className="text-sm" />
          </div>

          <div className="flex justify-center gap-16">
            {/* Nav */}
            <div className="flex justify-center text-[#191919] font-season-medium font-semibold gap-8 md:gap-16 text-xs md:text-sm mb-6 flex-wrap tracking-wide">
              <a href="#" className="hover:text-green-300">HOME</a>
              <a href="#" className="hover:text-green-300">THE SCIENCE</a>
              <a href="#" className="hover:text-green-300">PROGRAMS</a>
              <a href="#" className="hover:text-green-300">ABOUT</a>
              <a href="#" className="hover:text-green-300">CONTACT</a>
              <a href="#" className="hover:text-green-300">BLOG</a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 mb-3 text-lg text-[#191919]">
              <FaFacebookF className="cursor-pointer hover:text-green-300" />
              <FaTwitter className="cursor-pointer hover:text-green-300" />
              <FaInstagram className="cursor-pointer hover:text-green-300" />
              <FaLinkedinIn className="cursor-pointer hover:text-green-300" />
            </div>
          </div>

          {/* Copyright */}
          <p className="text-[14px] font-dm  text-[#191919] font-medium tracking-wide">
            Avyakt©2026. All rights reserved.
          </p>
        </div>
         <div>
          <img src={avyaktFooter} alt="Avyakt Footer Logo" className="w-full -z-15 absolute bottom-0 left-1/2 transform -translate-x-1/2" />
         </div>
      </div>
     
    </section>
  );
};

export default CTAFooter;
