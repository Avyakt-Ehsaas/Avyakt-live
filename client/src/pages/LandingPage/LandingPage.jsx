import React, { useState, useEffect } from "react";
import LandingSidebar from "./LandingSidebar/LandingSidebar";
import HeroSection from "./HeroSection.jsx";

import LoginModal from "../../components/ui/Modal/LoginModal.jsx";


import TestimonialCarousel from "./Testimonials/TestimonialCarousel.jsx";
import SponsorPage from "./SponserPage.jsx";
import FinalCTA from "./FinalCTA.jsx";
import ProblemSection from "./ProblemSection.jsx";
import ResearchSection from "./ResearchSection.jsx";
import FAQSection from "./FAQs.jsx";
import Solution from "./Solution.jsx";
import Intro from "./Intro.jsx";
import HowItWorks from "./HowItsWork.jsx";
import TheScienceSection from "./TheScienceSection.jsx";
import Build from "./Build.jsx";

const LandingPage = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // If user has scrolled more than 100px, they're past HeroSection
      if (scrollPosition > 100) {
        setIsHeroVisible(false);
      } else {
        setIsHeroVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen overflow-hidden ">
      <LandingSidebar isDarkBg={isHeroVisible} />

      <div className="w-full min-h-screen">
        <HeroSection />
      </div>

      <ProblemSection />  
      <div className="relative bg-white">
     <LoginModal />
      <ResearchSection />
         <Solution />
        <Intro />
        <Build/>
      <SponsorPage />
      <TheScienceSection />
      <HowItWorks />
      <TestimonialCarousel />
      <FAQSection />
      <FinalCTA />
      </div>
    </div>

  );
};

export default LandingPage;
