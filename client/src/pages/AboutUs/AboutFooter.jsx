import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import DarkLogo from '../../assets/Logo.png'
import avyaktFooter from '../../assets/avyakt.png';
import FullCTA from '../../assets/images/FullCTA.png'
import founderImg from "../../assets/images/FounderNote.png";

const AboutFooter = () => {
    return (
        <>

            <section
                className="relative z-10 w-full min-h-screen flex flex-col gap-50 items bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${FullCTA})` }}
            >
                {/* Overlay */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 15%, rgba(255,255,255,0.6) 35%, rgba(255,255,255,0) 60%)",
                    }}
                />

                {/* Bottom Overlay */}
                <div
                    className="absolute bottom-0 left-0 w-full h-[560px] md:h-[520px] pointer-events-none z-0"
                    style={{
                        background:
                            "linear-gradient(360deg, rgba(244,249,244,1) 0%, rgba(244,249,244,0.85) 15%, transparent 100%)",
                    }}
                />

                <div className='flex flex-col gap-20'>


                    <div className="relative z-10 max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-[40px] items-center pt-[12rem] px-4">

                        {/* Image */}
                        <div className="w-full h-[360px] md:h-[420px]">
                            <img
                                src={founderImg}
                                alt="Founder"
                                className="w-full h-full object-cover rounded-[20px]"
                            />
                        </div>

                        {/* Content Card */}
                        <div className="bg-white p-10 md:p-[40px] rounded-[20px] h-[480px] md:h-[420px] flex flex-col justify-center ">

                            {/* Heading */}
                            <h2 className="text-[32px] pr-4 md:pr-0 md:text-[36px] leading-[40px] text-primary mb-4 md:mb-[20px] font-season font-medium ">
                                A note from our{" "}
                                <span className="text-greenbase">founder</span>
                            </h2>

                            {/* Text */}
                            <p className="text-base md:text-[18px] md:leading-[28px] text-primary font-dm mb-[16px]">
                                Many people are encouraged to meditate, but the practice often
                                remains abstract.
                            </p>

                            <p className="text-[20px] leading-[28px] md:leading-[40px] text-primary font-dm font-medium  mb-[16px]">
                                The mind can be trained like any other skill.
                            </p>

                            <p className="text-base md:text-[18px] md:leading-[28px] md:leading-[30px] font-dm  text-primary mb-[16px]">
                                Small, consistent practice gradually changes how we focus, respond
                                to stress, and understand our inner experience. Avyakt combines
                                meditation with learning and experimentation so people can explore
                                how their mind works.
                            </p>

                        </div>
                    </div>


                    {/* CTA Footer */}
                    <div className="min-h-screen relative text-white text-center flex flex-col items-center justify-center gap-2 md:gap-20 md:px-4 py-8 md:py-12">

                        <div>
                            {/* Heading */}
                            <h1 className="text-center font-season-medium max-w-md md:max-w-7xl text-4xl md:text-5xl 2xl:text-7xl font-medium mb-4 tracking-wide ">
                                Mindfulness for every stage of life.
                            </h1>

                            {/* Subtext */}
                            <p className="max-w-md text-center px-4 md:px-0 md:max-w-5xl 2xl:text-xl font-dm text-white mb-8 text-base md:text-lg leading-6 md:leading-7 md:leading-[30px] mx-auto">
                                Sign up to receive simple and effective meditation, yoga, and other wellness tips from experts with decades of experience. Occasionally, we’ll let you know about our upcoming retreats, too.
                            </p>

                            {/* Form */}
                            <div className="flex flex-col items-center mb-16 md:mb-24 w-full">
                                <form className="w-full max-w-2xl px-4 md:px-0 flex flex-col items-center md:flex-row gap-4 ">

                                    {/* Inputs */}
                                    <div className="flex flex-col items-center gap-4 w-full">

                                        {/* Row 1 */}
                                        <div className="flex flex-col md:flex-row gap-4 w-full">
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                className="px-5 py-3 rounded-full font-dm 2xl:text-xl  font-medium bg-white text-primary w-full outline-none placeholder-[#191919]"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                className="px-5 py-3 rounded-full font-dm font-medium bg-white 
                                                2xl:text-xl text-primary w-full outline-none placeholder-[#191919]"
                                            />
                                        </div>

                                        {/* Row 2 */}
                                        <input
                                            type="email"
                                            placeholder="Enter your Email"
                                            className="px-5 py-3 rounded-full font-dm font-medium bg-white 
                                            2xl:text-xl text-primary w-full outline-none placeholder-[#191919]"
                                            required
                                        />

                                      

                                    </div>
                                         {/* Button */}
                                       <div className='md:w-[35%]'> <button className="bg-[#71AC61] w-60 md:w-full md:w-auto mt-2 font-dm hover:scale-105 transition px-8 py-3 rounded-full font-medium 2xl:text-xl 2xl:py-4">
                                            Sign up
                                        </button></div>
                                </form>
                            </div>
                        </div>

                        {/* Footer Section */}
                        <div className="relative w-full">
                            <div className="relative max-w-6xl flex flex-col items-center gap-8 mx-auto z-20 px-4">

                                {/* Logo */}
                                <div className="flex justify-center">
                                    <img src={DarkLogo} alt="Dark logo" className="w-24 md:w-auto" />
                                </div>

                                {/* Nav + Social */}
                                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

                                    {/* Nav */}
                                    <div className="
    grid grid-cols-2 gap-y-6 gap-x-12
    text-primary font-dm font-semibold 
    text-base 2xl:text-[18px] tracking-wide text-center
    md:flex md:flex-wrap md:justify-center md:gap-16
  ">
                                        <a href="#" className="hover:text-[#71AC61]">HOME</a>
                                        <a href="#" className="hover:text-[#71AC61]">THE SCIENCE</a>
                                        <a href="#" className="hover:text-[#71AC61]">PROGRAMS</a>
                                        <a href="#" className="hover:text-[#71AC61]">ABOUT</a>
                                        <a href="#" className="hover:text-[#71AC61]">CONTACT</a>
                                        <a href="#" className="hover:text-[#71AC61]">BLOG</a>
                                    </div>

                                    {/* Social Icons */}
                                    <div className="flex justify-center gap-6 text-lg 2xl:text-xl text-[#191919]">
                                        <FaYoutube className="cursor-pointer hover:text-[#71AC61]" />
                                        <FaFacebookF className="cursor-pointer hover:text-[#71AC61]" />
                                        <FaTwitter className="cursor-pointer hover:text-[#71AC61]" />
                                        <FaInstagram className="cursor-pointer hover:text-[#71AC61]" />
                                        <FaLinkedinIn className="cursor-pointer hover:text-[#71AC61]" />
                                    </div>

                                </div>

                                {/* Copyright */}
                                <p className="text-base md:text-[18px] font-dm mb-6 text-[#191919] tracking-wide text-center">
                                    Avyakt©2026. All rights reserved.
                                </p>

                            </div>

                            {/* Background Footer Image */}
                            <div className="w-full relative flex justify-center">
                                <img
                                    src={avyaktFooter}
                                    alt="Avyakt Footer Logo"
                                    className="w-full 2xl:w-[1200px] h-36 md:h-80 object-cover absolute bottom-0 z-10"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutFooter