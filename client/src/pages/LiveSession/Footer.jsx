import React,{useState,useEffect} from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { CheckCircle, TrendingUp, Heart, ShieldCheck, Brain } from "lucide-react";
import { TbHeartFilled } from "react-icons/tb";
import FullCTA from '../../assets/images/FullCTA.png'
import DarkLogo from "../../assets/images/LogoDark.svg";
import avyaktFooter from "../../assets/avyakt.png"

import MeditationWork1 from "../../assets/Icons/MeditationWork1.png"
import faceEmoji from "../../assets/Icons/faceEmoji.png"
import fireEmoji from "../../assets/Icons/fireEmoji.png"
import brainEmoji from "../../assets/Icons/brainEmoji.png"
import Pricing from './Pricing';




const Footer = () => {

    const textCard = [
        {
            icon: faceEmoji,
            title: "Before & after mood score",
            decs: "A single mood check before and after each session. Over time this becomes a mood history you can actually read."
        },
        {
            icon: fireEmoji,
            title: "Streak & consistency rate",
            decs: "Weekly and monthly views show patterns and tells how often you showed up, which days you skip, which contexts triggered return visits."
        },
        {
            icon: brainEmoji,
            title: "Context shift over time",
            decs: "Started with heartbreak sessions, moved to sleep, then growth? Your context journey is tracked and reflected back to you as a visible arc of recovery."
        }
    ]

    return (
        <>
            <section
                className="relative z-10 w-full min-h-screen flex flex-col gap-50 items-center bg-cover bg-center bg-no-repeat"
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
                    className="absolute bottom-0 left-0 w-full h-[730px] pointer-events-none z-0"
                    style={{
                        background:
                            "linear-gradient(360deg, rgba(244,249,244,1) 0%, rgba(244,249,244,0.85) 10%, transparent 90%)",
                    }}
                />
                <div className='flex flex-col gap-20'>
                    {/* Blog Section */}
                    <div className="relative z-10 mx-auto w-full max-w-[1100px] flex flex-col justify-between h-full pt-28">

                        <p className="text-greenbase font-dm text-center font-medium tracking-widest text-[14px] text-[20px] uppercase ">
                            PRICING
                        </p>



                        {/* Heading */}
                        <div >
                            <h2 className="heading-main font-season font-med text-center text-primary">
                                Start free. Then commit.
                            </h2>
                            <p className='text-gray font-dm paragraph-body mt-1'>21 days on us. Then choose how long you want to go.</p>
                        </div>

                        <div className="mt-2">

                            <Pricing />

                        </div>

                    </div>

                    {/* CTA Footer */}
                    <div className="min-h-screen 2xl:min-h-fit relative text-white text-center flex flex-col items-center justify-center gap-2 md:gap-20 md:px-4 pt-8 md:pt-12">

                        <div>
                            {/* Heading */}
                            <h1 className="text-center font-season-medium max-w-md md:max-w-7xl heading-main  2xl:text-7xl font-med mb-2 tracking-wide px-12 md:px-0">
                                Mindfulness for every stage of life.
                            </h1>

                            {/* Subtext */}
                            <p className="max-w-md text-center px-4 md:px-0 md:max-w-5xl 2xl:text-xl font-dm text-white mb-8 paragraph-body mx-auto">
                                Sign up to receive simple and effective meditation, yoga, and other wellness tips from experts with decades of experience. Occasionally, we’ll let you know about our upcoming retreats, too.
                            </p>

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
                        <div className="relative w-full  ">
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
                                    className="
                                           absolute bottom-0 z-10
                                            lg:w-full
                                           max-w-[100vw]
                                           h-100
                                           object-contain
                                           pointer-events-none
                                       "
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </>
    )
}

export default Footer


