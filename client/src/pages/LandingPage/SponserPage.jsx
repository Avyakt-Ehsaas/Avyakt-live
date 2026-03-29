import React, { useState } from "react";
import ProgramCard from "./ProgramCard";
import { motion, AnimatePresence } from "framer-motion";

import school from "../../assets/images/schoolblog1.png";
import organisation from "../../assets/images/organisationblog1.png";
import senior from "../../assets/images/seniorsblog1.png";
import individual from "../../assets/images/individualblog1.png";

import { HiAcademicCap } from "react-icons/hi";
import { HiOfficeBuilding } from "react-icons/hi";
import { HiUserGroup } from "react-icons/hi";
import { HiUser } from "react-icons/hi";


function SponsorPage() {
    const [activeTab, setActiveTab] = useState("school");

    const programData = {
       school: {
        tag: "FOR SCHOOL",
  title: "Dhyan Shakti: Attention Course",
  description:
    "An 8–week structured attention and mindfulness curriculum for grades 4–12. Built on neuroscience, delivered by trained instructors, with institutional impact reports.",
    points: ["Grades 4–12", "8 weeks", "NEP 2020 aligned", "Impact report", "Teacher toolkit"],
  buttonText: "See full Program",
  image: school,
},

        organisation: {
              tag: "FOR ORGANISATION",
  title: "Workplace Wellbeing Programs",
  description:
    "Structured programs targeting the three biggest workplace challenges attention deficits, emotional reactivity, and chronic stress delivered as live sessions, workshops, or ongoing retainers.",
    points: ["Attention & Regulation", "Emotional regulation", "Stress managemnet", "Online + on-site"],
             buttonText: "See full Program",
            image: organisation,
        },

        senior: {
               tag: "FOR SENIOR CLUB",
  title: "Cognitive + Sleep & Calm Program",
  description: "An 8-week program designed specifically for adults 60+ addressing sleep quality, anxiety, and cognitive sharpness through gentle, accessible meditation practices delivered in Hindi and English.",
    points: ["Age 60+", "Hindi + English", "Chair-friendly", "Sleep & cognition"],
            buttonText: "See full Program",
            image: senior,
        },

        individual: {
              tag: "FOR INDIVIDUAL",
  title: "Daily Meditation & Silence Sessions",
  description:
    "Two live daily programs, a structured year-long meditation journey and a silence practice, both designed to build a genuine daily habit, tracked and community-powered.",
    points: ["Live daily Sessions", "Progress tracking", "21-day free trial", "Community"],
            buttonText: "See full Program",
            image: individual,
        },
    };

    return (
        <div className="w-full pt-24 pb-18 bg-white min-h-screen mb-10">
            <div className="max-w-[1280px] h-auto  mx-auto px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-24">

                {/* Tabs */}
                <div className="flex gap-[30px] justify-center rounded-[12px] px-6 py-2 w-fit mx-auto relative text-[18px]">
                    {[
                        { id: "school", label: "For school", icon: <HiAcademicCap /> },
                        { id: "organisation", label: "For Organisation", icon: <HiOfficeBuilding /> },
                        { id: "senior", label: "For Senior Club", icon: <HiUserGroup /> },
                        { id: "individual", label: "Individual", icon: <HiUser /> },
                    ].map((tab) => (
                        // <button
                        //     key={tab.id}
                        //     onClick={() => setActiveTab(tab.id)}
                        //     className={`relative cursor-pointer text-[18px] font-medium font-dm text-primary tracking-wide pb-2 ${activeTab === tab.id ? "text-greenbase" : ""}`}
                        //     style={{ fontWeight: "500" }}
                        // >
                        //     {tab.label}

                        //     {activeTab === tab.id && (
                        //         <motion.div
                        //             layoutId="activeTabLine"
                        //             className="absolute left-0 right-0 -bottom-1 h-[3px] border-b-2 border-greenbase rounded-full"
                        //             transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        //         />
                        //     )}
                        // </button>
                         <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`relative cursor-pointer font-medium font-dm text-primary tracking-wide pb-2 flex items-center justify-center ${
        activeTab === tab.id ? "text-greenbase" : ""
      }`}
    >
      
      {/* Mobile → Icon */}
      <span className="text-[22px] md:hidden">
        {tab.icon}
      </span>

       {/* Hover Label (Mobile Tooltip) */}
      <span className="absolute -bottom-7 text-[12px] bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition md:hidden whitespace-nowrap">
        {tab.label}
      </span>

      {/* Desktop → Label */}
      <span className="hidden md:block text-[18px]">
        {tab.label}
      </span>

      {activeTab === tab.id && (
        <motion.div
          layoutId="activeTabLine"
          className="absolute left-0 right-0 -bottom-1 h-[3px] border-b-2 border-greenbase rounded-full"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </button>
                    ))}
                </div>

                <div className="sponsor-page max-w-7xl">
                    <h1 className="font-season-medium text-center text-[36px] md:text-[56px] leading-[80px] 2xl:leading-[72px] text-primary tracking-[0%]">
                            For every stage of life.
                    </h1>

                    <p className="font-dm text-center text-[20px] 2xl:text-[20px] leading-[30px] tracking-[0%]">
                       Structured meditation programs for individuals, schools, organizations, and senior communities,<br /> each designed for the specific needs of that audience.
                    </p>
                </div>
                {/* Dynamic Card */}
                <div className="mt-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                        >
                            <ProgramCard {...programData[activeTab]} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default SponsorPage;