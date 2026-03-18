import React from "react";
import LandingSidebar from "../LandingPage/LandingSidebar/LandingSidebar";
import IdeaGuide from "./IdeaGuide";
import StagesOfLife from "./StagesOfLife";
import FounderNote from "./FounderNote";
import RootedSection from "./RootedSection";
import AboutFooter from "./AboutFooter";


const AboutUsNew = () => {
    return (
        <>
         <div className='sticky top-0 z-20'>
            <LandingSidebar className="z-40"/>
        </div>
        <IdeaGuide />  
        <StagesOfLife /> 
        <RootedSection />
        <FounderNote />
        <AboutFooter />
        </>
    );
}

export default AboutUsNew;
