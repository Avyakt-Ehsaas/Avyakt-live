import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import FullCTA from '../../assets/images/FullCTA.png'
import sleepImg from '../../assets/images/sleepblog1.png'
import habitImg from '../../assets/images/habitblog1.png'
import focusImg from '../../assets/images/focusblog1.png'
import DarkLogo from '../../assets/Logo.png'
import avyaktFooter from '../../assets/avyakt.png';

import { IoSearch } from "react-icons/io5";

const FinalCTA = () => {
    const blogs = [
        {
            tag: "Sleep",
            title: "How 20 Minutes of Meditation Changes What Happens When You Sleep",
            desc: "What you do in the hour before bed determines the quality of sleep you get. Here's the science.",
            image: sleepImg,
        },
        {
            tag: "Building a Habit",
            title: "70% of People Quit Meditation in 3 Weeks. Here Is Why, and How Not To.",
            desc: "It's not discipline you're missing. It's structure, community, and a way to track if it's working.",
            image: habitImg,
        },
        {
            tag: "Attention & Focus",
            title: "Why Your Attention Keeps Breaking — And What to Do About It",
            desc: "The neuroscience of distraction and how structured practice rebuilds focus from the ground up.",
            image: focusImg,
        },
    ];
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

                    {/* Blog Section */}

                    <div className="relative z-10 mx-auto w-full max-w-[1100px] px-8 sm:px-6 flex flex-col justify-between h-full py-28">

                        {/* Heading */}
                        <div>
                            <p className="text-greenbase font-season text-center font-medium tracking-wide">
                                RESEARCH AND INSIGHTS
                            </p>
                            <h2 className="text-center text-2xl sm:text-4xl md:text-5xl font-medium text-[#191919] leading-tight">
                                What the science actually says
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3 mt-2">
                            {blogs.map((blog, index) => (
                                <article
                                    key={index}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300"
                                >
                                    {/* Image */}
                                    <div className="h-[200px] w-full">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-4 ">
                                        <p className="text-base font-medium font-dm text-greenbase mb-2">
                                            {blog.tag}
                                        </p>

                                        <h3 className="text-xl  font-dm font-semibold text-primary leading-9 mb-2">
                                            {blog.title}
                                        </h3>

                                        <p className="text-medium font-dm text-[#6B6B6B] leading-6 mb-4 ">
                                            {blog.desc}
                                        </p>

                                        <button
                                            className="text-greenbase cursor-pointer font-medium text-lg flex items-center gap-1 hover:gap-2 transition-all mb-2 hover:scale-102 transition duration-300">
                                            Read article →
                                        </button>

                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* CTA Footer */}
                    <div className="min-h-screen relative text-white text-center flex flex-col items-center justify-center gap-2 md:gap-20 px-0 md:px-0 md:py-0">

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
                                    <div className='md:w-[35%]'> <button className="bg-[#71AC61] w-60 md:w-full md:w-auto mt-2 font-dm hover:scale-105 transition px-4 sm:px-8 py-3 rounded-full font-medium 2xl:text-xl 2xl:py-4">
                                        Sign up
                                    </button></div>
                                </form>
                            </div>
                        </div>

                        {/* Footer Section */}
                        <div className=" w-full">
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
                            {/* Background Footer Image */}

                        </div>

                    </div>

                </div>
                {/* <div className="w-full h-full  flex justify-center"> */}
                <img
                    src={avyaktFooter}
                    alt="Avyakt Footer Logo"
                    className="
            absolute bottom-0 z-10
             lg:w-full
            max-w-[100vw]
            h-100
            object-contain
            pointer-events-none
        "
                />
                {/* </div> */}
            </section>
        </>
    )
}

export default FinalCTA
