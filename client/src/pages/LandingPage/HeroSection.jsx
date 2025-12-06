import React, { useRef } from 'react'
import { BsStars } from "react-icons/bs";
import { Link } from 'react-router-dom';
import heroImage from "../../assets/hero-meditate.jpg"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const HeroSection = () => {

    const Startups = useRef(null);
    const headingRef = useRef([]);
    const paraRef = useRef(null);
    const imgRef = useRef(null)

    const text = "Avaykt-Ehsaas";

    useGSAP(() => {
        gsap.from(headingRef.current, {
            y: -80,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out",
        })

        gsap.from(paraRef.current.children, {
            x: -120,
            opacity: 0,
            duration: 1.6,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.4
        })

        gsap.from(Startups.current, {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 1.2,
            ease: "power3.out",
        })

        gsap.fromTo(".btn",
            { opacity: 0, y: 30, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: 0.8,
                stagger: 0.2,
                ease: "power4.out"
            }
        )

        gsap.from(imgRef.current, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 1.4,
            ease: "power3.out",
        })
    });

    return (
        <section className="min-h-screen w-full bg-white/20 flex items-center">
            <div className="max-w-7xl mx-auto w-full px-5 md:px-10 py-10">
                <div className="flex flex-col md:flex-row items-center gap-12">

                    {/*  LEFT SECTION */}
                    <div className="w-full md:w-1/2 text-center md:text-left">

                        {/* Google badge */}
                        <div
                            ref={Startups}
                            className="mx-auto md:mx-0 mb-6 bg-orange-200 text-orange-600 w-fit px-5 py-8 md:py-2 rounded-xl text-sm font-semibold flex items-center gap-2"
                        >
                            <BsStars />
                            Google Startups Member
                        </div>

                        {/* Heading */}
                        <h1 
                        ref={headingRef}
                        className="flex flex-wrap justify-center md:justify-start text-5xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-orange-600">
                            Avaykt-Ehsaas
                        </h1>

                        {/* Paragraph */}
                        <div ref={paraRef} className="mt-6 space-y-4">
                            <h3 className='text-base sm:text-lg md:text-xl text-amber-700 font-medium'>
                                Meditation Backed by Neuroscience
                            </h3>
                            <p className='text-sm sm:text-base md:text-lg text-gray-700 font-medium max-w-xl mx-auto md:mx-0'>
                                <i>
                                    Join daily live meditation sessions, explore our courses, and enhance your mind with Avaykt Ehsaas.
                                </i>
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className='mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4'>
                            <Link
                                to={"/user"}
                                className='btn px-6 py-3 text-center rounded-xl bg-gradient-to-r from-orange-200 to-amber-400 text-orange-700 hover:scale-105 hover:text-stone-900 transition-all font-semibold w-48'
                            >
                                Join Session
                            </Link>

                            <Link
                                to={"/user"}
                                className='btn px-6 py-3 text-center rounded-xl bg-gradient-to-r from-orange-400 to-amber-200 text-stone-800 hover:scale-105 hover:text-white transition-all font-semibold w-48'
                            >
                                Explore Courses
                            </Link>
                        </div>

                    </div>

                    {/* 🟦 RIGHT SECTION */}
                    <div
                        ref={imgRef}
                        className="w-full mt-10 md:mt-0 md:w-1/2 flex justify-center"
                    >
                        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
                            <img
                                src={heroImage}
                                alt="hero image"
                                className="rounded-3xl w-full h-auto object-cover shadow-xl"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default HeroSection
