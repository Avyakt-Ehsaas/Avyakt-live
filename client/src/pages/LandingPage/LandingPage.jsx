import React, { useRef, useState, useEffect } from "react";
import LandingSidebar from "./LandingSidebar/LandingSidebar";
import HeroSection from "./HeroSection.jsx";
import HeroText from "./HeroToText.jsx";
import KidsRestlessSection from "./KidsRestlessSection.jsx";
import LoginModal from "../../components/ui/Modal/LoginModal.jsx";
import YoungAdultSection from "./YoungAdultSection.jsx";
import Footer from "./Footer.jsx";
import ModernProblem from "./ModernProblem.jsx";
import TestimonialCarousel from "./Testimonials/TestimonialCarousel.jsx";
import SponsorPage from "./SponserPage.jsx";
import BlogSection from "./BlogSection.jsx";
import Carousel from "./Testimonials/Carousel.jsx";
import CTAFooter from "./CTAFooter.jsx";
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
    <div className="bg-[#FFF6EF] min-h-screen">
      <LandingSidebar isDarkBg={isHeroVisible} />

      <div ref={heroRef}>
        <HeroSection />
      </div>

      <HeroText />
      <LoginModal />
      <ModernProblem />
      <SponsorPage />
      <TestimonialCarousel />
      {/* <BlogSection />
      <CTAFooter /> */}
      <FinalCTA />
    </div>
  );
};

export default LandingPage;
