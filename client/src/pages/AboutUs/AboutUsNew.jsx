import React from "react";
import LandingSidebar from "../LandingPage/LandingSidebar/LandingSidebar";
import IdeaGuide from "./IdeaGuide";
import StagesOfLife from "./StagesOfLife";
import RootedSection from "./RootedSection";
import AboutFooter from "./AboutFooter";
import HeroSection from "./HeroSection";
import Problem from "./Problem";
import Practice from "./Practice";


const AboutUsNew = () => {
    return (
        <>
            <div className='sticky top-0 z-20'>
                <LandingSidebar className="z-40" />
            </div>
            <HeroSection />
            <Problem />
            <IdeaGuide />
            <Practice />
            <StagesOfLife />
            <RootedSection />
            <AboutFooter />
        </>
    );
}

export default AboutUsNew;