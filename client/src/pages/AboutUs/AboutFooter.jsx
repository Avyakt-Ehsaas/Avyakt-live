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
                                className="absolute bottom-0 left-0 w-full h-[480px] pointer-events-none z-0"
                                style={{
                                    background:
                                        "linear-gradient(360deg, rgba(244,249,244,1) 0%, rgba(244,249,244,0.85) 10%, transparent 100%)",
                                }}
                            />
            
                            <div className='flex flex-col gap-20'>


                                    <div className="relative z-10 max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-[40px] items-center pt-[12rem]">
                                            
                                            {/* Image */}
                                            <div className="w-full h-[420px]">
                                              <img
                                                src={founderImg}
                                                alt="Founder"
                                                className="w-full h-full object-cover rounded-[20px]"
                                              />
                                            </div>
                                    
                                            {/* Content Card */}
                                            <div className="bg-[#C2E0BA] p-[40px] rounded-[20px] h-[420px] flex flex-col justify-center ">
                                              
                                              {/* Heading */}
                                              <h2 className="text-[36px] leading-[40px] text-primary mb-[20px] font-season font-medium ">
                                                A note from our{" "}
                                                <span className="text-greenbase">founder</span>
                                              </h2>
                                    
                                              {/* Text */}
                                              <p className="text-[18px] leading-[28px] text-primary font-dm mb-[16px]">
                                                Many people are encouraged to meditate, but the practice often
                                                remains abstract.
                                              </p>
                                    
                                              <p className="text-[20px] leading-[40px] text-primary font-dm font-semibold mb-[16px]">
                                                The mind can be trained like any other skill.
                                              </p>
                                    
                                              <p className="text-[18px] leading-[30px] font-dm  text-primary mb-[16px]">
                                                Small, consistent practice gradually changes how we focus, respond
                                                to stress, and understand our inner experience. Avyakt combines
                                                meditation with learning and experimentation so people can explore
                                                how their mind works.
                                              </p>
                                    
                                            </div>
                                          </div>



            
                                {/* CTA Footer */}
                                <div className='min-h-screen relative text-white text-center flex flex-col items-center justify-center gap-20 px-4 '>
            
                                    <div className=''>
                                        {/* Heading */}
                                        <h1 className="font-season-medium text-4xl md:text-5xl  font-medium mb-4 tracking-wide ">
                                            Mindfulness for every stage of life.
                                        </h1>
            
                                        {/* Subtext */}
                                        <p className="max-w-5xl font-dm text-white mb-8 text-lg leading-[30px]">
                                            Sign up to receive simple and effective meditation, yoga, and other wellness tips from experts with decades of experience. Occasionally, we’ll let you know about our upcoming retreats, too.
                                        </p>
            
                                        <div className="flex flex-col items-center mb-24">
                                            <form>
                                               <div className='flex'>
                                                    <div className="flex flex-col">
                                                             {/* Form Row 1 */}
                                                <div className="flex flex-col md:flex-row gap-4 w-xl max-w-2xl">
                                                    <input
                                                        type="text"
                                                        placeholder="First Name"
                                                        className="px-5 py-3 rounded-full font-dm font-medium bg-white text-primary w-full outline-none placeholder-[#191919]"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Last Name"
                                                        className="px-5 py-3 rounded-full font-dm font-medium bg-white text-primary w-full outline-none placeholder-[#191919]"
                                                    />
                                                </div>
            
                                                {/* Form Row 2 */}
                                                <div className="flex flex-col md:flex-row gap-4 w-xl max-w-2xl mt-4">
                                                    <input
                                                        type="email"
                                                        placeholder={`Enter your Email `}
                                                        className="px-5 py-3 rounded-full font-dm font-medium bg-white text-primary w-full outline-none placeholder-[#191919]"
                                                        required
                                                    />
                                                </div>
                                                    </div>
                                                      <div className="h-20 flex items-center justify-center mt-4 ml-3">
                                                    <button className="bg-[#71AC61] font-dm hover:scale-105 hover:text-medium transition px-8 py-3 rounded-full font-medium whitespace-nowrap">
                                                        Sign up
                                                    </button>
                                                </div>
                                               
                                               </div>
                                               
                                            </form>
                                        </div>
                                    </div>
            
            
            
            
                                    <div className='relative w-full'>
                                        {/* Footer */}
                                        <div className="relative w-6xl flex flex-col justify-center items-center gap-10 mx-auto z-20">
            
                                            <div className="flex justify-center gap-16 mb-4 w-20">
                                                <img src={DarkLogo} alt="Dark logo" />
                                            </div>
            
                                            <div className="flex justify-center gap-16">
                                                {/* Nav */}
                                                <div className="flex justify-center text-[#191919]  font-dm font-semibold gap-8 md:gap-24 text-xs md:text-sm mb-6 flex-wrap tracking-wide">
                                                    <a href="#" className="hover:text-[#71AC61]">HOME</a>
                                                    <a href="#" className="hover:text-[#71AC61]">THE SCIENCE</a>
                                                    <a href="#" className="hover:text-[#71AC61]">PROGRAMS</a>
                                                    <a href="#" className="hover:text-[#71AC61]">ABOUT</a>
                                                    <a href="#" className="hover:text-[#71AC61]">CONTACT</a>
                                                    <a href="#" className="hover:text-[#71AC61]">BLOG</a>
                                                </div>
            
                                                {/* Social Icons */}
                                                <div className="flex gap-6 mb-3 text-xl text-[#191919] ">
                                                    <FaYoutube className="cursor-pointer hover:text-[#71AC61]" />
                                                    <FaFacebookF className="cursor-pointer hover:text-[#71AC61]" />
                                                    <FaTwitter className="cursor-pointer hover:text-[#71AC61]" />
                                                    <FaInstagram className="cursor-pointer hover:text-[#71AC61]" />
                                                    <FaLinkedinIn className="cursor-pointer hover:text-[#71AC61]" />
                                                </div>
                                            </div>
            
                                            {/* Copyright */}
                                            <p className="text-[16px] font-dm mb-8 text-[#191919] tracking-wide">
                                                Avyakt©2026. All rights reserved.
                                            </p>
                                        </div>
                                        <div className='w-full relative'>
                                            <img src={avyaktFooter} alt="Avyakt Footer Logo" className="w-full h-100 z-10 absolute bottom-0 opacity-100" />
                                        </div>
                                    </div>
            
                                </div>
            
                            </div>
                        </section>
        </>
    )
}

export default AboutFooter