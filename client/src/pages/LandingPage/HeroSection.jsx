import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import heroImage from "../../assets/hero.png"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from "gsap/ScrollTrigger"
import { motion } from 'framer-motion'
import bgSky from '../../assets/Bg-Sky.jpg'
import Person from '../../assets/bg-Person.jpg'

gsap.registerPlugin(ScrollTrigger)

const HeroSection = () => {

  const headingRef = useRef(null)
  const bgRef = useRef(null);
  const personRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {

    // 🔹 Initial load animations
    gsap.from(headingRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: "power4.out",
    })

    gsap.fromTo(
      ".hero-btn",
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

    // 🔹 Skip parallax on mobile (important)
   gsap.to(bgRef.current, {
      y: 80,
      scrollTrigger: {
        trigger: bgRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(personRef.current, {
      y: 40,
      scrollTrigger: {
        trigger: personRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(contentRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });

  }, [])

  return (
    <>
      <section className="relative min-h-screen w-full flex items-center overflow-hidden">

        {/* 🔹 Background */}
        <div ref={bgRef} className="absolute inset-0 z-0">
          <img
            src={bgSky}
            alt="Peaceful meditation background"
            className="w-full h-full object-cover"
          />
        </div>

       
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Person Layer */}
      <img
        ref={personRef}
        src={Person}
        alt="Meditating silhouette"
        className="absolute bottom-0 right-10 w-[280px] md:w-[420px] opacity-90"
      />


        {/* 🔹 Content */}
        <div
          ref={contentRef}
          className="relative z-10 max-w-7xl w-full px-5 md:px-10 py-24"
        >
          <div className="max-w-3xl">

            <h1
              ref={headingRef}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-extrabold text-white mb-6 leading-tight"
            >
              Avyakt-Ehsaas
            </h1>

            <div className="space-y-5 max-w-2xl">
              <motion.h3
                className="text-xl sm:text-2xl md:text-3xl text-orange-400 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Meditation Backed by Neuroscience
              </motion.h3>

              <motion.p
                className="text-lg sm:text-xl text-orange-100 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                Join daily live meditation sessions, explore mindful courses,
                and elevate your consciousness with Avyakt Ehsaas.
              </motion.p>
            </div>

            {/* 🔹 CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-6">
              <Link
                to="/register"
                className="hero-btn px-10 py-4 bg-orange-500 text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/30"
              >
                Start Your Journey
              </Link>

              <Link
                to="/about"
                className="hero-btn px-10 py-4 border-2 border-white text-white rounded-full font-bold text-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* 🔹 Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/80 text-sm animate-bounce">
          <div className="flex flex-col items-center">
            <span>Scroll to explore</span>
            <svg className="w-6 h-6 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* 🔹 Logos */}
      <div className="w-full flex justify-around items-center px-6 py-8 bg-white">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Google_for_Startups_logo.svg/1200px-Google_for_Startups_logo.svg.png"
          className="h-8 md:h-12 object-contain"
          alt="Google for Startups"
        />
        <img
          src="https://media.licdn.com/dms/image/v2/C4D0BAQHvqtUWXWJ8gw/company-logo_200_200/company-logo_200_200/0/1630574955442/iitmandicatalyst_logo"
          className="h-16 md:h-24 object-contain"
          alt="IIT Mandi Catalyst"
        />
      </div>
    </>
  )
}

export default HeroSection
