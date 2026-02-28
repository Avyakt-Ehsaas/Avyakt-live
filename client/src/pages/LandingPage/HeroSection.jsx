
import React, { useEffect, useRef, useState } from 'react'
import HeroImage from '../../assets/images/HeroImage.svg'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Typewriter } from '../../components/ui/TypeWriter';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {

  const avyaktText = [
    "अव्यक्त-अहसास",
    "অব্যক্ত এহসাস",
    "અવ્યક્ત એહસાસ",
    "அவ்யக்த் எஹ்ஸாஸ்",
    "అవ్యక్త్ ఎహ్సాస్",
    "അവ്യക്ത് എഹ്സാസ്",
    "اویکت احساس",
    "অৱ্যক্ত এহসাস",
    "Avyakt Ahsaas",
  ];

  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const [startTyping, setStartTyping] = useState(false);

  const handleClick = () => {
    try {
      navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  }

 useEffect(() => {
  const section = sectionRef.current;

  gsap.set(section, {
    y: "-100%",
    scale: 25,
    opacity: 0,
  });

  gsap.to(section, {
    y: "0%",
    opacity: 1,
    scale: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: section,
      start: "top 99%", 
      end: "top top",
      scrub: true,
      onLeave: () => {
            setStartTyping(true);
          },
          onLeaveBack: () => {
            setStartTyping(false);
          },
    }
  });

}, []);


  return (
    <>
      <div className="relative h-[190vh] w-full bg-white overflow-hidden">

        <div ref={heroRef} className="sticky top-0  w-full h-screen overflow-hidden z-10">
          <img
            // src={heroSectionImage}
            src={HeroImage}
            alt="Hero"
            className='absolute bottom-0 md:-bottom-0 lg:-bottom-0 xl:-bottom-10 right-0 bg-[#191919] w-auto h-auto min-w-full min-h-full object-cover z-0'
          />
          <div className=" z-10"></div>

          <div className="absolute inset-0 flex items-center justify-center z-40">

            <div className="text-white font-season-medium text-center md:mt-[1rem]">
              <h1 className='mb-3 mx-18 md:mx-0 md:text-5xl 3xl:text-6xl text-3xl/12'>Discover Your {" "}
                <span className='text-greenbase-light'>Avyakt Potential</span>
                <br />
                Through <span className='text-greenbase-light'>Meditation</span></h1>
              <p className='text-lg mb-4 font-medium font-dm'>Whether you want to stay focused, feel calmer, or simply feel better we <br /> help you build a healthier relationship with your mind.</p>
              <p className='text-greenbase-light text-[1.1rem] font-medium font-dm'>Join the 21-Day Live Meditation Journey</p>
              <button
                onClick={handleClick}
                className='bg-greenbasebg mb-2 text-white font-semibold font-dm mt-4 px-4 py-3 rounded-full'>Start Your Journey</button>
              <div className='flex justify-center'>
                <div className=" flex justify-center items-center">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      src={`https://randomuser.me/api/portraits/${i % 2 ? "women" : "men"}/${i}.jpg`}
                      alt={`user${i}`}
                      className="w-8 h-8 rounded-full"
                      style={{ marginLeft: i > 0 ? '-5px' : '0' }}
                    />
                  ))}
                </div>
                <p className='ml-2 mt-2 font-medium font-dm'>Trusted by 500+ users on their wellness journey</p>
              </div>
            </div>
          </div>
          {/* Scroll Down Circle Arrow */}
          <div
            // onClick={scrollToNext}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 cursor-pointer"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-white/40 backdrop-blur-sm animate-bounce  hover:scale-110 transition">

              <span className="text-white text-lg leading-none">↓</span>

            </div>
          </div>
        </div>

        <div
          ref={sectionRef}
          className="relative z-30  min-h-screen overflow-hidden"
        >
          <div>
            <div className="py-[18rem] h-[60vh] md:h-[70vh] flex items-center justify-center bg-white overflow-hidden">
                  <div className="text-center w-[732px]">
                    <h1 
                    // ref={textRef}
                    className="text-2xl md:text-6xl font-semibold z-50 text-[#191919] tracking-tight font-season-medium">
                      Introducing
                    </h1>
            
                    <h2 className="text-3xl text-greenbase md:text-5xl mt-[3rem]">
                     {startTyping && <Typewriter texts={avyaktText} />}
                    </h2>
                  </div>
                </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default HeroSection 