import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

import FullCTA from '../../assets/images/FullCTA.png'
import kidImg from "../../assets/images/schoolblog2.png";
import youthImg from "../../assets/images/organisationblog2.png";
import calmImg from "../../assets/images/individualblog2.png";

import DarkLogo from "../../assets/images/LogoDark.svg";
import avyaktFooter from '../../assets/images/avyaktFooterWatermark.svg';

const FinalCTA = () => {
    const blogs = [
        {
            tag: "Kids & Mindfulness",
            title: "Helping Children Handle Big Emotions",
            desc: "Simple breathing and awareness practices that support calm, focus, and emotional balance in everyday moments.",
            image: kidImg,
        },
        {
            tag: "Youth & Mental Clarity",
            title: "Why Your Mind Never Seems to Rest",
            desc: "Understanding overthinking, digital overload, and how mindfulness creates mental space.",
            image: youthImg,
        },
        {
            tag: "Everyday Calm",
            title: "Finding Stillness in a Busy Life",
            desc: "Small meditation habits that ease stress and bring presence back into daily routines.",
            image: calmImg,
        },
    ];
    return (
        <>
            <section
                className="relative z-10 w-full min-h-screen flex flex-col gap-50 items-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${FullCTA})` }}
            >

                {/* Overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(246, 249, 245, 0.9) 20%, rgba(250, 245, 245, 0.1) 30%)",
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

                <div className='flex flex-col gap-20 '>

                    {/* Blog Section */}

                    <div className="relative z-10 mx-auto w-full max-w-[1100px] px-8 sm:px-6 flex flex-col justify-between h-full py-28">

                        {/* Heading */}
                        <div>
                            <h2 className="text-center text-2xl sm:text-3xl md:text-5xl font-medium text-[#191919] leading-tight">
                                Stories & science of{" "}
                                <span className="text-greenbase">calm living</span>
                            </h2>

                            <p className="mt-2 text-center text-primary font-dm">
                                Short reads on mindfulness, emotional wellbeing, and modern life for every age.
                            </p>
                        </div>

                        {/* TOP ROW */}
                        <div className="flex mt-8 flex-col items-center gap-4 md:flex-row md:justify-center">
                            {blogs.slice(0, 2).map((blog, index) => (
                                <div
                                    key={index}
                                    className="flex max-w-[380px] h-[200px] overflow-hidden rounded-xl bg-white shadow-sm"
                                >
                                    {/* Content */}
                                    <div className="flex flex-col justify-center py-0 px-4 pr-12 flex-1">
                                        <p className="text-xs font-dm font-medium text-greenbase">
                                            {blog.tag}
                                        </p>

                                        <h3 className="mt-1 font-dm text-medium font-semibold text-primary leading-[32px]">
                                            {blog.title}
                                        </h3>

                                        <p className="mt-1 text-xs text-[#696969] line-clamp-3">
                                            {blog.desc}
                                        </p>
                                    </div>

                                    {/* Image */}
                                    <div className="w-32 h-full">
                                        <img
                                            src={blog.image}
                                            alt="blog"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* BOTTOM CARD */}
                        <div className="flex justify-center mt-8">
                            <div className="flex max-w-[380px] h-[200px] overflow-hidden rounded-xl bg-white shadow-sm">

                                {/* Content */}
                                <div className="flex flex-col justify-center py-0 pl-4 pr-10 flex-1">
                                    <p className="text-xs font-dm font-medium text-greenbase">
                                        {blogs[2].tag}
                                    </p>

                                    <h3 className="mt-1 font-dm text-medium font-semibold text-primary leading-[32px]">
                                        {blogs[2].title}
                                    </h3>

                                    <p className="mt-1 text-xs font-dm text-[#696969] line-clamp-3">
                                        {blogs[2].desc}
                                    </p>
                                </div>

                                {/* Image */}
                                <div className="w-32 h-full">
                                    <img
                                        src={blogs[2].image}
                                        alt="blog"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Button */}
                        <div className="flex justify-center mt-4">
                            <button className="rounded-full font-dm bg-greenbase-primary px-5 py-3 text-medium text-white transition hover:scale-105">
                                See more
                            </button>
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
                            <p className="max-w-3xl font-dm text-gray-200 mb-8 text-sm md:text-sm leading-relaxed">
                                Sign up to receive simple and effective meditation, yoga, and other wellness tips from experts with decades of experience. Occasionally, we’ll let you know about our upcoming retreats, too.
                            </p>

                            <div className="flex flex-col items-center">
                                <div className="">
                                    {/* Form Row 1 */}
                                    <div className="flex flex-col md:flex-row gap-4 w-xl max-w-2xl">
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
                                    <div className="flex flex-col md:flex-row gap-4 w-xl max-w-2xl mt-4">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="px-5 py-3 rounded-full bg-white/90 text-primary w-full outline-none"
                                        />
                                    </div>
                                    <div className="h-20 flex items-center justify-center mt-4 ml-3">
                                        <button className="bg-[#71AC61] font-dm hover:scale-105 hover:text-medium transition px-8 py-3 rounded-full font-medium whitespace-nowrap">
                                            Sign up
                                        </button>
                                    </div>
                                </div>
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
                                    <div className="flex justify-center text-[#191919]  font-dm font-semibold gap-8 md:gap-16 text-xs md:text-sm mb-6 flex-wrap tracking-wide">
                                        <a href="#" className="hover:text-[#71AC61]">HOME</a>
                                        <a href="#" className="hover:text-[#71AC61]">THE SCIENCE</a>
                                        <a href="#" className="hover:text-[#71AC61]">PROGRAMS</a>
                                        <a href="#" className="hover:text-[#71AC61]">ABOUT</a>
                                        <a href="#" className="hover:text-[#71AC61]">CONTACT</a>
                                        <a href="#" className="hover:text-[#71AC61]">BLOG</a>
                                    </div>

                                    {/* Social Icons */}
                                    <div className="flex gap-6 mb-3 text-lg text-[#191919] ">
                                        <FaFacebookF className="cursor-pointer hover:text-[#71AC61]" />
                                        <FaTwitter className="cursor-pointer hover:text-[#71AC61]" />
                                        <FaInstagram className="cursor-pointer hover:text-[#71AC61]" />
                                        <FaLinkedinIn className="cursor-pointer hover:text-[#71AC61]" />
                                    </div>
                                </div>

                                {/* Copyright */}
                                <p className="text-[14px] font-dm mb-8 text-[#191919] font-medium tracking-wide">
                                    Avyakt©2026. All rights reserved.
                                </p>
                            </div>
                            <div>
                                <img src={avyaktFooter} alt="Avyakt Footer Logo" className="w-full -z-10 absolute bottom-0 left-1/2 transform -translate-x-1/2" />
                            </div>
                        </div>




                    </div>

                </div>
            </section>
        </>
    )
}

export default FinalCTA