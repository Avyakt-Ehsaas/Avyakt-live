import React, { useState } from "react";
import ProgramCard from "./ProgramCard";
import { motion, AnimatePresence } from "framer-motion";

import Library1 from "../../assets/images/Library1.png";
import Library2 from "../../assets/images/Library2.png";
import Library3 from "../../assets/images/Library3.png";


import { HiAcademicCap } from "react-icons/hi";
import { HiOfficeBuilding } from "react-icons/hi";
import { HiUserGroup } from "react-icons/hi";
import { HiUser } from "react-icons/hi";


function SponsorPage() {
  const [activeTab, setActiveTab] = useState("school");

  const programData = [     
        {
          tag: "FOR SCHOOL",
          rating: "4.9",
          topText: "Guided",
          totalTime: "29 mins",
          title: "Before the exam - steady nerves",
          time: "7 mins",
          category: "Breathwork",
          level: "Beginner",
          keyPoint: "Exam anxiety",
          image: Library1,
        },
        {
          tag: "FOR SCHOOL",
          rating: "4.9",
          topText: "Guided",
          totalTime: "20 mins",
          title: "Deep work mode — settle in",
          time: "5 mins",
          category: "Guided",
          level: "Beginner",
          keyPoint: "Study focus",
          image: Library2,
        },
        {
          tag: "FOR SCHOOL",
          rating: "4.9",
          topText: "Guided",
          totalTime: "29 mins",
          title: "Dealing with peer pressure",
          time: "8 mins",
          category: "Vizualization",
          level: "Intermediate",
          keyPoint: "Peer pressure",
          image: Library3,
        }
      ];

  return (
    <div className="w-full pt-0 md:pt-24 pb-0 flex items-center justify-center bg-white min-h-screen 2xl:min-h-fit mb-4 md:mb-0">
      <div className="max-w-[1280px] h-auto  mx-auto px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-24 ">

        <div className="sponsor-page max-w-7xl pt-8">
          <p className="text-greenbase text-center font-dm text-medium md:text-lg tracking-widest  uppercase mb-4 md:mb-0">
            LIBRARY
          </p>
          <h1 className="font-season-medium text-center heading-main md:leading-[80px] 2xl:leading-[72px] text-primary tracking-[0%] max-w-3xl mx-auto">
            Sessions built around <br />what you're going through
          </h1>

        </div>
        {/* Dynamic Card */}
        <div className="mt-12 w-full md:w-[1200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {activeTab.length > 0 &&
                (
                  programData?.map((program, index) => (
                    <ProgramCard
                      key={index} {...program} />
                  ))
                )
              }

            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-10">
          <button className="bg-[#71AC61] text-white px-6 py-3 font-dm paragraph-body  rounded-full font-medium hover:bg-[#4F7944] transition-all duration-300 cursor-pointer">
            Browse all sessions
          </button>
        </div>
      </div>
    </div>
  );
}

export default SponsorPage;