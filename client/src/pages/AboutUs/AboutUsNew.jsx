import React from "react";
import LandingSidebar from "../LandingPage/LandingSidebar/LandingSidebar";
import IdeaGuide from "./IdeaGuide";
import RootedSection from "./RootedSection";
import AboutFooter from "./AboutFooter";
import HeroSection from "./HeroSection";
import Problem from "./Problem";
import Practice from "./Practice";
import MeditationSection from "./MeditationSection";


const AboutUsNew = () => {
    return (
        <>
            <div className='sticky top-0 z-20'>
                <LandingSidebar className="z-40" />
            </div>
            <HeroSection />
            <Problem />
            <MeditationSection />
            <IdeaGuide />
            <Practice />
            <RootedSection />
            <AboutFooter />
        </>
    );
}

export default AboutUsNew;