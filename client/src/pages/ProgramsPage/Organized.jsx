import React, { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import Organized1 from "../../assets/Icons/Organized1.png"
import Organized2 from "../../assets/Icons/Organized2.png"
import Organized3 from "../../assets/Icons/Organized3.png"
import Organized4 from "../../assets/Icons/Organized4.png"
import Organized5 from "../../assets/Icons/Organized5.png"
import Organized6 from "../../assets/Icons/Organized6.png"
import Organized7 from "../../assets/Icons/Organized7.png"



const sections = [
  {
    icon: Organized1,
    id: "hard-feelings",
    title: "Hard Feelings",
    desc: "Manage emotional distress & build resilience",
    stats: {
      time: "5–10 min",
      label: "resets",
      type: "Structured",
      typeLabel: "recovery sessions",
    },
    items: [
      {
        icon: Organized3,
        name: "Anxiety & Stress",
        sessions: 6,
        description: "Support for calming anxious thoughts, emotional overload, and stress triggers.",
        keypoints: ["Calm breathing", "Stress reset", "Thought awareness"],
      },
      {
        icon: Organized6,
        name: "Grief and Loss",
        sessions: 4,
        description: "Gentle sessions to process loss, sadness, and emotional heaviness.",
        keypoints: ["Emotional release", "Self-compassion", "Healing reflection"],
      },
      {
        icon: Organized7,
        name: "Stress & Burnout",
        sessions: 3,
        description: "Designed to recover energy, reduce mental fatigue, and rebuild balance.",
        keypoints: ["Nervous system rest", "Energy recovery", "Work-life reset"],
      },
    ],
  },

  {
    icon: Organized2,
    id: "meditation",
    title: "Meditation Basics",
    desc: "Learn core meditation skills",
    stats: {
      time: "10–15 min",
      label: "daily practice",
      type: "Foundational",
      typeLabel: "mindfulness sessions",
    },
    items: [
      {
        icon: Organized3,
        name: "Anxiety & Stress",
        sessions: 6,
        description: "Support for calming anxious thoughts, emotional overload, and stress triggers.",
        keypoints: ["Calm breathing", "Stress reset", "Thought awareness"],
      },
      {
        icon: Organized6,
        name: "Grief and Loss",
        sessions: 4,
        description: "Gentle sessions to process loss, sadness, and emotional heaviness.",
        keypoints: ["Emotional release", "Self-compassion", "Healing reflection"],
      },
      {
        icon: Organized7,
        name: "Stress & Burnout",
        sessions: 3,
        description: "Designed to recover energy, reduce mental fatigue, and rebuild balance.",
        keypoints: ["Nervous system rest", "Energy recovery", "Work-life reset"],
      },
    ],
  },

  {
    icon: Organized5,
    id: "body-rest",
    title: "Body & Rest",
    desc: "Improve sleep, relaxation, and physical awareness",
    stats: {
      time: "5–20 min",
      label: "sleep support",
      type: "Deep Rest",
      typeLabel: "body recovery sessions",
    },
    items: [
      {
        icon: Organized3,
        name: "Anxiety & Stress",
        sessions: 6,
        description: "Support for calming anxious thoughts, emotional overload, and stress triggers.",
        keypoints: ["Calm breathing", "Stress reset", "Thought awareness"],
      },
      {
        icon: Organized6,
        name: "Grief and Loss",
        sessions: 4,
        description: "Gentle sessions to process loss, sadness, and emotional heaviness.",
        keypoints: ["Emotional release", "Self-compassion", "Healing reflection"],
      },
      {
        icon: Organized7,
        name: "Stress & Burnout",
        sessions: 3,
        description: "Designed to recover energy, reduce mental fatigue, and rebuild balance.",
        keypoints: ["Nervous system rest", "Energy recovery", "Work-life reset"],
      },
    ],
  },

  {
    icon: Organized4,
    id: "focus",
    title: "Focus & Productivity",
    desc: "Improve cognitive performance and work output",
    stats: {
      time: "5–15 min",
      label: "focus resets",
      type: "Cognitive",
      typeLabel: "performance sessions",
    },
    items: [
      {
        icon: Organized3,
        name: "Anxiety & Stress",
        sessions: 6,
        description: "Support for calming anxious thoughts, emotional overload, and stress triggers.",
        keypoints: ["Calm breathing", "Stress reset", "Thought awareness"],
      },
      {
        icon: Organized6,
        name: "Grief and Loss",
        sessions: 4,
        description: "Gentle sessions to process loss, sadness, and emotional heaviness.",
        keypoints: ["Emotional release", "Self-compassion", "Healing reflection"],
      },
      {
        icon: Organized7,
        name: "Stress & Burnout",
        sessions: 3,
        description: "Designed to recover energy, reduce mental fatigue, and rebuild balance.",
        keypoints: ["Nervous system rest", "Energy recovery", "Work-life reset"],
      },
    ],
  },

  // 5TH ITEM
  {
    icon: Organized3,
    id: "growth",
    title: "Growth & Relationships",
    desc: "Improve self-awareness and relationships",
    stats: {
      time: "10–25 min",
      label: "reflection sessions",
      type: "Growth",
      typeLabel: "relationship awareness",
    },
    items: [
      {
        icon: Organized3,
        name: "Anxiety & Stress",
        sessions: 6,
        description: "Support for calming anxious thoughts, emotional overload, and stress triggers.",
        keypoints: ["Calm breathing", "Stress reset", "Thought awareness"],
      },
      {
        icon: Organized6,
        name: "Grief and Loss",
        sessions: 4,
        description: "Gentle sessions to process loss, sadness, and emotional heaviness.",
        keypoints: ["Emotional release", "Self-compassion", "Healing reflection"],
      },
      {
        icon: Organized7,
        name: "Stress & Burnout",
        sessions: 3,
        description: "Designed to recover energy, reduce mental fatigue, and rebuild balance.",
        keypoints: ["Nervous system rest", "Energy recovery", "Work-life reset"],
      },
    ],
  },
];



export default function MeditationLayout() {
  const [activeSection, setActiveSection] =
    useState("hard-feelings");

  const sectionRefs = useRef({});

  const [openItem, setOpenItem] = useState(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter(
          (entry) => entry.isIntersecting
        );

        if (visibleSections.length > 0) {
          const currentSection = visibleSections.reduce(
            (prev, current) =>
              prev.intersectionRatio >
                current.intersectionRatio
                ? prev
                : current
          );

          setActiveSection(currentSection.target.id);
        }
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "-20% 0px -35% 0px",
      }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const scrollToSection = (id) => {
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="bg-white py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">
          <p className="text-greenbase font-dm text-medium text-[14px] md:text-[20px] tracking-widest uppercase mb-6 md:mb-0 ">
            HOW IT'S ORGANISED
          </p>

          <h1 className="px-12 md:px-0 heading-main font-semibold text-primary font-season-med">
            Start with what you’re going through
          </h1>

          <p className="max-w-4xl mx-auto mt-2 text-gray font-dm paragraph-body text-center">
            Every session lives inside a context that describes
            what you're going through, not just what type of
            meditation it is. Click a category to explore
            what's inside.
          </p>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-12 gap-2 lg:gap-10 ">

          {/* SIDEBAR */}
          <div className="col-span-12 lg:col-span-3">
            <div className="lg:sticky lg:top-10 flex lg:block gap-3 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 lg:space-y-3">
              {sections.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                 className={`min-w-[260px] lg:min-w-0 w-full text-left rounded-[24px] p-4 md:p-5 transition-all duration-300 border
                  
                  ${activeSection === item.id
                      ? "bg-[#C2E0BA33] border-[#C2E0BA33]"
                      : "bg-transparent border-transparent hover:bg-white"
                    }`}
                >
                  <div className="flex items-start gap-3">

                    {/* Icon */}
                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-xl shrink-0">
                      <img src={item.icon} alt={item.title} className="mt-1" />
                    </div>

                    <div>
                      <h3 className="text-primary font-dm card-title font-med">
                        {item.title}
                      </h3>

                      <p className="text-gray font-dm paragraph-secondary text-left ">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-span-12 lg:col-span-9 space-y-16 lg:space-y-24">
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                ref={(el) =>
                  (sectionRefs.current[section.id] = el)
                }
                className="scroll-mt-24 min-h-fit md:min-h-screen"
              >

                {/* TOP CARD */}
              <div className="bg-[#C2E0BA33] rounded-[28px] md:rounded-[32px] p-5 md:p-8">

                <div className="flex items-start gap-3 md:gap-4">
  <img src={section.icon} alt={section.title} className="mt-1 h-10 w-10 md:h-12 md:w-12 shrink-0" />

                    <div>
                      <h2 className="heading-large text-left text-primary font-season-medium font-med">
                        {section.title}
                      </h2>

                      <p className="text-gray font-dm paragraph-body text-left mt-2">
                        {section.desc}
                      </p>
                    </div>
                  </div>

                  {/* STATS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">

                    <div className="bg-white rounded-[24px] p-6 text-center">
                      <h3 className="heading-large text-greenbase font-season-medium font-med">
                        {section.stats.time}
                      </h3>

                      <p className="mt-3 text-primary font-dm paragraph-secondary ">
                        {section.stats.label}
                      </p>
                    </div>

                    <div className="bg-white rounded-[24px] p-6 text-center">
                      <h3 className="heading-large text-greenbase font-season-medium font-med">
                        {section.stats.type}
                      </h3>

                      <p className="mt-3 text-primary font-dm paragraph-secondary ">
                        {section.stats.typeLabel}
                      </p>
                    </div>
                  </div>
                </div>

                {/* SESSION LIST */}
                <div className="space-y-4 mt-6">
                  {section.items.map((item, index) => {
                    const itemKey = `${section.id}-${index}`;
                    const isOpen = openItem === itemKey;

                    return (
                      <div
                        key={itemKey}
                        className="bg-white border border-[#E8E8E8] rounded-[22px] px-6 py-5 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-[#EEF4EA] flex items-center justify-center text-lg">
                              <img src={item.icon} alt={item.name} />
                            </div>

                            <h4 className="text-primary paragraph-body font-dm font-med">
                              {item.name}
                            </h4>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-gray font-dm paragraph-secondary">
                              {item.sessions} sessions
                            </span>

                            <button
                              onClick={() => setOpenItem(isOpen ? null : itemKey)}
                              className="w-8 h-8 rounded-full border border-[#9CC48B] flex items-center justify-center text-[#7BA96B] hover:bg-[#EEF4EA] transition"
                            >
                              {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                            </button>
                          </div>
                        </div>

                        {isOpen && (
                          <div className="mt-5 pl-14 border-t border-[#E8E8E8] pt-4">
                            <p className="text-gray font-dm paragraph-secondary text-left font-med">
                              {item.description}
                            </p>
                            <div className="flex flex-wrap gap-3 mt-5">
                              {item.keypoints.map((point, i) => (
                                <div
                                  key={i}
                                  className="px-5 py-3 rounded-full border border-[#8EBB7F] 
      text-[#7BA96B] font-dm  
      bg-[#F9FCF7] hover:bg-[#EEF4EA] paragraph-secondary transition-all"
                                >
                                  {point}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}