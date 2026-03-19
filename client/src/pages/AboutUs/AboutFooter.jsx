import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import DarkLogo from "../../assets/images/LogoDark.svg";
// import avyaktFooter from '../../assets/images/avyaktFooterWatermark.svg';
import Footer from '../../assets/images/AboutFooter.png'

const AboutFooter = () => {
    return (
        <>

            <section className="relative z-10 w-full min-h-screen flex flex-col gap-50 items-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${Footer})` }}
            >

                <div
                    className="absolute bottom-0 left-0 w-full h-[730px] pointer-events-none z-0"
                    style={{
                        background:
                            "linear-gradient(360deg, rgba(244,249,244,1) 0%, rgba(244,249,244,0.85) 10%, transparent 90%)",
                    }}
                />

                {/* CTA Footer */}
                <div className='min-h-screen relative text-white text-center flex flex-col items-center justify-center gap-20 px-4 pt-[4rem]'>

                    <div className='pt-4'>
                        {/* Heading */}
                        <h1 className="font-season-medium text-4xl md:text-5xl  font-medium mb-4 tracking-wide">
                            Mindfulness for every stage of life.
                        </h1>

                        {/* Subtext */}
                        <p className="max-w-5xl font-dm text-white mb-8 text-lg leading-[30px]">
                            Sign up to receive simple and effective meditation, yoga, and other wellness tips from experts with decades of experience. Occasionally, we’ll let you know about our upcoming retreats, too.
                        </p>

                        <div className="flex flex-col items-center">
                            <form >
                                <div className="flex">
                                    <div>
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
                                    <div className="flex items-center justify-center mt-4 ml-3">
                                        <button className="bg-[#71AC61] font-dm hover:scale-105 hover:text-medium transition px-8 py-3 rounded-full font-medium whitespace-nowrap">
                                            Sign up
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>




                    <div className=''>
                        {/* Footer */}
                        <div className="w-6xl flex flex-col gap-10 items-center">

                            <div className="flex justify-center gap-16 mb-4 w-20">
                                <img src={DarkLogo} alt="Dark logo " className="text-sm" />
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
                        {/* <div>
                                    <img src={avyaktFooter} alt="Avyakt Footer Logo" className="w-full -z-10 absolute bottom-0 left-1/2 transform -translate-x-1/2" />
                                </div> */}
                    </div>

                </div>

            </section>
        </>
    )
}

export default AboutFooter