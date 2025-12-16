import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImage from "../../assets/hero.png";
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const headingRef = useRef(null);
    const paragraphRef = useRef(null);
    const buttonsRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        // Disable parallax on small screens
        if (window.innerWidth < 768) return;

        // Background parallax
        gsap.to(bgRef.current, {
            y: 80,
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
                trigger: bgRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        });

        // Heading parallax
        gsap.to(headingRef.current, {
            y: -50,
            ease: "none",
            scrollTrigger: {
                trigger: headingRef.current,
                start: "top 80%",
                end: "bottom top",
                scrub: true,
            }
        });

        // Paragraph parallax
        gsap.to(paragraphRef.current, {
            y: -30,
            ease: "none",
            scrollTrigger: {
                trigger: paragraphRef.current,
                start: "top 80%",
                end: "bottom top",
                scrub: true,
            }
        });

        // Buttons parallax
        gsap.to(buttonsRef.current, {
            y: -20,
            ease: "none",
            scrollTrigger: {
                trigger: buttonsRef.current,
                start: "top 80%",
                end: "bottom top",
                scrub: true,
            }
        });
    }, []);

    return (
        <>
            <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div ref={bgRef} className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt="Peaceful meditation background"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl w-full px-5 md:px-10 py-20">
                    <div className="max-w-3xl text-center md:text-left">
                        <h1
                            ref={headingRef}
                            className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-extrabold text-white mb-6 leading-tight"
                        >
                            Avyakt-Ehsaas
                        </h1>

                        <div ref={paragraphRef} className="space-y-6 max-w-2xl">
                            <motion.h3
                                className='text-xl sm:text-2xl md:text-3xl text-orange-400 font-medium'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                Meditation Backed by Neuroscience
                            </motion.h3>
                            <motion.p
                                className='text-lg sm:text-xl text-orange-100 font-medium'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Join daily live meditation sessions, explore our courses, and enhance your mind with Avyakt Ehsaas.
                            </motion.p>
                        </div>

                        <motion.div
                            ref={buttonsRef}
                            className='mt-10 flex flex-wrap gap-6 justify-center md:justify-start'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Link
                                to="/register"
                                className='px-10 py-4 bg-orange-500 text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/30'
                            >
                                Start Your Journey
                            </Link>
                            <Link
                                to="/about"
                                className='px-10 py-4 border-2 border-white text-white rounded-full font-bold text-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105'
                            >
                                Learn More
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll hint */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/80 text-sm animate-bounce">
                    <div className="flex flex-col items-center">
                        <span>Scroll to explore</span>
                        <svg className="w-6 h-6 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Partner Logos */}
            <div className="w-full flex justify-around mx-auto px-4 py-6">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Google_for_Startups_logo.svg/1200px-Google_for_Startups_logo.svg.png"
                    className="h-[30px] sm:h-[40px] mt-[25px] sm:mt-[30px] md:h-[50px] md:mt-[40px] w-auto object-contain"
                    alt="Google for Startups"
                />
                <img
                    src="https://media.licdn.com/dms/image/v2/C4D0BAQHvqtUWXWJ8gw/company-logo_200_200/company-logo_200_200/0/1630574955442/iitmandicatalyst_logo?e=2147483647&v=beta&t=UR1165UOK9lJNy8HBEuls_BKhlbCqZ4YzktMbvQZXYs"
                    className="h-[80px] sm:h-[100px] md:h-[140px] w-auto object-contain"
                    alt="IIT Mandi catalyst"
                />
            </div>
        </>
    );
}

export default HeroSection;
