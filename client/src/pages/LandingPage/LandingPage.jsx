import React, { useState, useEffect } from "react";
import LandingSidebar from "./LandingSidebar/LandingSidebar";
import HeroSection from "./HeroSection.jsx";
import KidsRestlessSection from "./KidsRestlessSection.jsx";
import LoginModal from "../../components/ui/Modal/LoginModal.jsx";
import YoungAdultSection from "./YoungAdultSection.jsx";
import Footer from "./Footer.jsx";
import ModernProblem from "./ModernProblem.jsx";
import TestimonialCarousel from "./Testimonials/TestimonialCarousel.jsx";
import SponsorPage from "./SponserPage.jsx";
import FinalCTA from "./FinalCTA.jsx";
import HeroText from "./HeroText.jsx";

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

      <div className="fixed w-full min-h-screen">
        <HeroSection />
      </div>
      
        <HeroText  />
      <div className="relative bg-white">
     <LoginModal />
      <ModernProblem />
      <SponsorPage />
      <TestimonialCarousel />
      <FinalCTA />
      </div>
    </div>

  );
};

export default LandingPage;
