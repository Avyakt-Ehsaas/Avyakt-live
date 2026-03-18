import React from "react";
import LandingSidebar from "../LandingPage/LandingSidebar/LandingSidebar";
import IdeaGuide from "./IdeaGuide";
import StagesOfLife from "./StagesOflife";
import FounderNote from "./FounderNote";


const AboutUsNew = () => {
    return (
        <>
         <div className='sticky top-0 z-20'>
            <LandingSidebar className="z-40"/>
        </div>
        <IdeaGuide />  
        <StagesOfLife /> 
        <FounderNote />
        </>
    );
}

export default AboutUsNew;