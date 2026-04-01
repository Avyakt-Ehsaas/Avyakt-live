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
                    <div className='min-h-screen relative text-white text-center flex flex-col items-center justify-center gap-20 px-4'>

                        <div className=''>
                            {/* Heading */}
                            <h1 className="font-season-medium text-4xl md:text-5xl  font-medium mb-4 tracking-wide">
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
                            <div className='w-full relative flex items-center justify-center'>
                                <img src={avyaktFooter} alt="Avyakt Footer Logo" className="w-full max-w-7xl h-100 z-10 absolute bottom-0 opacity-100" />
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </>
    )
}

export default FinalCTA
