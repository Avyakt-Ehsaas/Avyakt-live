import React, { useRef, useState, useEffect } from "react";
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

const LandingPage = () => {
  const heroRef = useRef(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <LandingSidebar isDarkBg={isHeroVisible} />

      <div ref={heroRef}>
        <HeroSection />
      </div>
      <LoginModal />
      <ModernProblem />
      <SponsorPage />
      <TestimonialCarousel />
      <FinalCTA />
    </div>

  );
};

export default LandingPage;
