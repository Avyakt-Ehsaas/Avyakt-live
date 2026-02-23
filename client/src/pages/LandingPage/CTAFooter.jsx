import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import bgImg from "../../assets/images/BGFooterImage.png";

const CTAFooter = () => {
  return (
    <section className="relative w-full h-screen text-white overflow-hidden">
      
      {/* Background Image */}
      <div
        className="absolute -bottom-[480px] inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      />
<div
  className="absolute inset-0"
  style={{
    background:
      "linear-gradient(180deg, rgba(246, 249, 244, 0.1) 0%, rgba(226, 249, 218, 0.12) 0%, transparent 90%)",
  }}
/>
      <div
  className="absolute inset-0"
  style={{
    background: "linear-gradient(to top, rgba(216, 245, 209, 0.1) 0%, rgba(218, 244, 218, 0.6) 18%, transparent 70%)",
  }}
/>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 text-center">
        
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-medium mb-4 tracking-wide">
          Mindfulness for every stage of life.
        </h1>

        {/* Subtext */}
        <p className="max-w-xl text-gray-200 mb-8 text-sm md:text-base leading-relaxed">
          Sign up to receive simple and effective meditation, yoga, and other wellness tips from experts with decades of experience.
        </p>

        {/* Form Row 1 */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl">
          <input
            type="text"
            placeholder="First Name"
            className="px-5 py-3 rounded-full bg-white/90 text-black w-full outline-none"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="px-5 py-3 rounded-full bg-white/90 text-black w-full outline-none"
          />
        </div>

        {/* Form Row 2 */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-3 rounded-full bg-white/90 text-black w-full outline-none"
          />
          <button className="bg-[#6DBE7B] hover:bg-[#5cad6a] transition px-8 py-3 rounded-full font-medium whitespace-nowrap">
            Sign up
          </button>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 w-full flex flex-col items-center">
          
  <div className="flex justify-evenly">
              {/* Nav */}
          <div className="flex justify-center text-[#191919] font-semibold gap-8 text-xs md:text-sm mb-6 flex-wrap tracking-wide">
            <a href="#" className="hover:text-green-300">HOME</a>
            <a href="#" className="hover:text-green-300">THE SCIENCE</a>
            <a href="#" className="hover:text-green-300">PROGRAMS</a>
            <a href="#" className="hover:text-green-300">ABOUT</a>
            <a href="#" className="hover:text-green-300">CONTACT</a>
            <a href="#" className="hover:text-green-300">BLOG</a>
          </div>

          {/* Logo */}
          {/* <div className="text-green-300 text-xl mb-4">🧘</div> */}

          {/* Social Icons */}
          <div className="flex gap-5 mb-3 text-lg text-[#191919]">
            <FaFacebookF className="cursor-pointer hover:text-green-300" />
            <FaTwitter className="cursor-pointer hover:text-green-300" />
            <FaInstagram className="cursor-pointer hover:text-green-300" />
            <FaLinkedinIn className="cursor-pointer hover:text-green-300" />
          </div>
  </div>

          {/* Copyright */}
          <p className="text-[11px] text-[#191919] font-mediumtracking-wide">
            Avyakt©2026. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTAFooter;