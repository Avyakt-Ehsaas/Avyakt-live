import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Typewriter } from "../../components/ui/TypeWriter";

const HeroText = () => {
  const sectionRef = useRef(null);
  const [startTyping, setStartTyping] = useState(false);

  // Scroll animation (Motion replacement for ScrollTrigger)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 99%", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [40, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1.5]);

  // Typing trigger like onLeave / onLeaveBack
useEffect(() => {
  const unsubscribe = scrollYProgress.on("change", (value) => {

    if (value >= 1 && !startTyping) {
      setTimeout(() => {
        setStartTyping(true);
      }, 300); // zoom finish pause
    }
     if (value < 1.2 && startTyping) {
      setStartTyping(false); // reverse scroll → stop typing
    }

  });

  return () => unsubscribe();
}, [scrollYProgress, startTyping]);

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

  return (
    <motion.div
      ref={sectionRef}
      style={{ scale, y, 
        opacity
       }}
      className="relative mt-[100vh]  md:min-h-screen overflow-hidden pointer-events-none"
    >
      <div className="py-[18rem] h-[60vh] md:h-[70vh] flex items-center justify-center bg-white overflow-hidden min-h-screen">
        <div className="text-center w-[732px]">
          <motion.h1 
            className="text-6xl font-semibold text-[#191919] tracking-tight font-season-medium"
          >
            Introducing
          </motion.h1>

          <motion.h2 
            className="text-4xl text-greenbase md:text-5xl mt-[3rem]"
          >
            {startTyping && <Typewriter texts={avyaktText} />}
          </motion.h2>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroText;
