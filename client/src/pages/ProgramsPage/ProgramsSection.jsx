import React from "react";
import Card from "./Card";

import first from "../../assets/images/first.png"
import second from "../../assets/images/second.png"
import third from "../../assets/images/third.png"
import fourth from "../../assets/images/fourth.png"
import fifth from "../../assets/images/fifth.png"
import sixth from "../../assets/images/sixth.png"



const programs = [
    {
        id: "dhyan",
        weeks: "8 weeks",
        title: "Dhyan Shakti — Attention Lab",
        subtitle:
            "Strengthening sustained attention, reducing distraction, and improving deep focus.",
        activities: [
            "Attention experiments (before & after meditation)",
            "Breath-counting practices",
            "Focus games & cognitive tasks",
            "Digital distraction awareness",
        ],
        tags: ["Improved concentration", "Classroom Engagement", "Stronger Learning readiness"],
        image: sixth,
        imageSide: "right",
    },
    {
        id: "shanti",
        weeks: "8 weeks",
        title: "Shanti Path — Anxiety & Calm",
        subtitle: "Managing stress, exam anxiety, and emotional overwhelm.",
        activities: [
            "Breath regulation techniques",
            "Calm response training",
            "Thought awareness exercises",
            "Relaxation practices",
        ],
        tags: ["Reduced anxiety", "Emotional control", "Increased resilience under pressure"],
        image: first,
        imageSide: "left",
    },
    {
        id: "Krutajna",
        weeks: "6 weeks",
        title: "Krutajna — Gratitude & Mindset",
        subtitle: "Building optimism, emotional wellbeing, and positive thinking.",
        activities: [
            "Gratitude journaling",
            "Kindness challenges",
            "Affirmation practices",
            "Reflection exercises"
        ],
        tags: ["Improved mood", "Stronger self-worth", "Healthier classroom relationships."],
        image: second,
        imageSide: "right",
    },
    {
        id: "Manas",
        weeks: "10 weeks",
        title: "Manas Vigyan — Know Your Brain",
        subtitle: "Understanding how attention, memory, and emotions work.",
        activities: [
            "Brain-based experiments",
            "Meditation Science labs",
            "Cognitive games",
            "Self-obervation exercises"
        ],
        tags: ["Greater self awareness", "Curiosity", "Owner of mental habits."],
        image: third,
        imageSide: "left",
    },
    {
        id: "samvedna",
        weeks: "8 weeks",
        title: "Samvedna — Emotional Intelligence",
        subtitle: "Recognizing, expressing, and regulating emotions.",
        activities: [
            "Emotional mappings",
            "Empathy exercises",
            "Role play scenarios",
            "Self-Compassion practices"
        ],
        tags: ["Better emotional expression", "Healthier peer relationships", "Conflict handling"],
        image: fourth,
        imageSide: "right",
    },
    {
        id: "Dhairya",
        weeks: "6 weeks",
        title: "Dhairya — Exam Warrior",
        subtitle: "Staying calm, focused, and confident during exams.",
        activities: [
            "Pre-exam calm rituals",
            "Focus visualizations",
            "Stress release breathing",
            "Performance routines"
        ],
        tags: ["Reduced text anxiety", "Stronger focus", "Improved exam performance"],
        image: fifth,
        imageSide: "left",
    }
];

export default function ProgramsSection() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
            {programs.map((p, index) => (
                <Card
                    key={index}
                    badge={p.weeks}
                    title={p.title}
                    description={p.subtitle}
                    list={p.activities}
                    chips={p.tags}
                    image={p.image}
                    imageSide={index % 2 === 0 ? "right" : "left"}
                />
            ))}
        </div>
    );
}