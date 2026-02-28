import React, { useState } from "react";
import ProgramCard from "./ProgramCard";
import { motion, AnimatePresence } from "framer-motion";

import school from "../../assets/images/schoolblog1.png";
import organisation from "../../assets/images/organisationblog1.png";
import senior from "../../assets/images/seniorsblog1.png";
import individual from "../../assets/images/individualblog1.png";     


function SponsorPage() {
    const [activeTab, setActiveTab] = useState("school");

    const programData = {
        school: {
            title: "Build focus, emotional intelligence, and calm in growing minds",
            description:
                "Structured mindfulness programs that improve attention, reduce exam anxiety, and support emotional regulation — with progress tracking for students and schools.",
            points: [
                "Focus & attention",
                "Anxiety & stress management",
                "Emotional intelligence",
                "Cognitive development",
            ],
            footerText:
                "Backed by structured curricula, neuroscience labs, and AI-powered wellbeing tracking.",
            buttonText: "Explore School Programs",
            image: school,
        },

        organisation: {
            title: "Enhance productivity and reduce workplace stress",
            description:
                "Mindfulness programs designed for corporate teams to improve focus, emotional balance, and overall wellbeing.",
            points: [
                "Workplace stress reduction",
                "Team productivity",
                "Emotional resilience",
                "Leadership clarity",
            ],
            footerText:
                "Backed by neuroscience-based practices and performance analytics.",
            buttonText: "Explore Organisation Programs",
            image: organisation,
        },

        senior: {
            title: "Gentle mindfulness for healthy and peaceful aging",
            description:
                "Specially designed programs to improve mental clarity, reduce loneliness, and enhance emotional wellbeing for seniors.",
            points: [
                "Memory & cognitive support",
                "Stress & anxiety reduction",
                "Emotional wellbeing",
                "Healthy lifestyle support",
            ],
            footerText:
                "Backed by senior wellness experts and guided meditative practices.",
            buttonText: "Explore Senior Club Programs",
            image: senior,
        },

        individual: {
            title: "Personalized mindfulness journeys for everyday life",
            description:
                "Individual-focused meditation programs tailored to your goals for focus, calm, and emotional balance.",
            points: [
                "Personal growth",
                "Daily stress management",
                "Better focus",
                "Emotional balance",
            ],
            footerText:
                "AI-powered personalization with guided mindfulness routines.",
            buttonText: "Explore Individual Programs",
            image: individual,
        },
    };

    return (
        <div className="w-full pt-24 pb-18 bg-white min-h-screen mb-10">
            <div className="max-w-[1280px] max-h-[450px]  mx-auto px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-24">

            {/* Tabs */}
            <div className="flex gap-[30px] justify-center rounded-[12px] px-6 py-2 w-fit mx-auto relative text-[18px]">
                {[
                    { id: "school", label: "For school" },
                    { id: "organisation", label: "For Organisation" },
                    { id: "senior", label: "For Senior Club" },
                    { id: "individual", label: "Individual" },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative cursor-pointer text-[16px] font-semibold font-dm text-primary tracking-wide pb-2 ${activeTab === tab.id ? "text-greenbase" : ""}`}

                    >
                        {tab.label}

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

            <div className="sponsor-page">
                <h1 className="font-season-medium text-center text-[36px] md:text-[42px] 2xl:text-[48px] leading-[60px] 2xl:leading-[72px] text-primary tracking-[0%]">
                    Meditation designed for{" "}
                    <span className="text-greenbase">every stage of life</span>
                </h1>

                <p className="font-dm text-center text-[18px] 2xl:text-[20px] leading-[24px] tracking-[0%]">
                    Personalized mindfulness journeys for kids, youth, and adults — helping build <br />
                    focus, emotional balance, and lasting calm.
                </p>
            </div>
            {/* Dynamic Card */}
            <div className="mt-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                    >
                        <ProgramCard {...programData[activeTab]}/>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
        </div>
    );
}

export default SponsorPage;