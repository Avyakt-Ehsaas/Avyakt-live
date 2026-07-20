import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

import Schools from "../../assets/images/Schools.png";
import Individual from "../../assets/images/Individual.png";
import Employees from "../../assets/images/Employees.png";
import Seniors from "../../assets/images/Seniors.png";

const cards = [
  {
    id: "01",
    title: "Students",
    shortTitle: "Learn with clarity",
    desc: "Enhance academic performance through improved focus, reduced exam anxiety, and better memory retention.",
    img: Schools,
    points: [
      "Improved attention span",
      "Reduced academic stress",
      "Better memory retention",
    ],
  },
  {
    id: "02",
    title: "Professionals",
    shortTitle: "Work with calm",
    desc: "Build calm productivity, emotional balance, and deeper clarity during demanding workdays.",
    img: Employees,
    points: [
      "Calm decision-making",
      "Emotional resilience",
      "Sustainable productivity",
    ],
  },
  {
    id: "03",
    title: "Parents",
    shortTitle: "Respond with presence",
    desc: "Create patience, presence, and mindful responses for everyday family life.",
    img: Individual,
    points: [
      "More patient responses",
      "Mindful communication",
      "Greater emotional presence",
    ],
  },
  {
    id: "04",
    title: "Seniors",
    shortTitle: "Age with ease",
    desc: "Support emotional well-being, peaceful sleep, and gentle mental clarity.",
    img: Seniors,
    points: [
      "Peaceful sleep routines",
      "Emotional well-being",
      "Gentle mental clarity",
    ],
  },
];

export default function BenefitsStageLife() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    
    const nextIndex = Math.min(
      cards.length - 1,
      Math.floor(latest * cards.length)
    );

    if (nextIndex !== activeIndex) {
      setDirection(nextIndex > activeIndex ? 1 : -1);
      setActiveIndex(nextIndex);
    }
  });

  const activeCard = cards[activeIndex];

  const imageVariants = {
    enter: (animationDirection) => ({
      opacity: 0,
      y: shouldReduceMotion
        ? 0
        : animationDirection > 0
          ? 100
          : -100,
      scale: shouldReduceMotion ? 1 : 0.92,
      rotate: shouldReduceMotion
        ? 0
        : animationDirection > 0
          ? 3
          : -3,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)",
    }),

    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
    },

    exit: (animationDirection) => ({
      opacity: 0,
      y: shouldReduceMotion
        ? 0
        : animationDirection > 0
          ? -100
          : 100,
      scale: shouldReduceMotion ? 1 : 1.04,
      rotate: shouldReduceMotion
        ? 0
        : animationDirection > 0
          ? -3
          : 3,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)",
    }),
  };

  const contentVariants = {
    enter: (animationDirection) => ({
      opacity: 0,
      y: shouldReduceMotion
        ? 0
        : animationDirection > 0
          ? 30
          : -30,
    }),

    center: {
      opacity: 1,
      y: 0,
    },

    exit: (animationDirection) => ({
      opacity: 0,
      y: shouldReduceMotion
        ? 0
        : animationDirection > 0
          ? -30
          : 30,
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[380vh] bg-[#FBFCF8] "
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden pb-8">
        {/* Background glow */}
        <div className="pointer-events-none absolute -left-48 top-1/3 h-[460px] w-[460px] rounded-full bg-[#DCEFD6]/60 blur-[130px]" />

        <div className="pointer-events-none absolute -right-48 bottom-0 h-[520px] w-[520px] rounded-full bg-[#EAF2E7] blur-[140px]" />

        <div className="relative z-10 mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* ================= LEFT CONTENT ================= */}
          <div className="relative">
            <p className="font-dm text-[11px] font-medium uppercase tracking-[0.28em] text-[#71AC61] md:text-[14px]">
              Tailored Stillness
            </p>

            <h2 className="mt-2 max-w-[540px] font-season-medium text-[36px] leading-[1.08] text-[#202A21] md:text-[48px]">
              Benefits for every
              <span className="block italic text-[#71AC61]">
                stage of life.
              </span>
            </h2>

            <p className="mt-3 max-w-[510px] font-dm text-[15px] leading-6 text-[#747A73] md:text-[16px]">
              Every phase of life carries different emotional and cognitive
              needs. Our practices adapt to your context, rhythm and personal
              journey.
            </p>

            {/* Active category content */}
            <div className="relative mt-4 min-h-[230px] overflow-hidden">
              <AnimatePresence
                initial={false}
                mode="wait"
                custom={direction}
              >
                <motion.div
                  key={activeCard.title}
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-dm text-[12px] uppercase tracking-[0.22em] text-[#8BAA82]">
                      {activeCard.id}
                    </span>

                    <span className="h-px w-10 bg-[#BCD5B4]" />

                    <span className="font-dm text-[12px] uppercase tracking-[0.18em] text-[#8A9188]">
                      {activeCard.shortTitle}
                    </span>
                  </div>

                  <h3 className="mt-2 font-season-medium text-[30px] text-[#202A21] md:text-[32px]">
                    {activeCard.title}
                  </h3>

                  <p className="mt-1 max-w-[500px] font-dm text-[14px] leading-7 text-[#70776F] md:text-[15px]">
                    {activeCard.desc}
                  </p>

                  <ul className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {activeCard.points.map((point, index) => (
                      <motion.li
                        key={point}
                        initial={{
                          opacity: 0,
                          x: shouldReduceMotion ? 0 : -12,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: shouldReduceMotion
                            ? 0
                            : 0.12 + index * 0.08,
                          duration: 0.4,
                        }}
                        className="flex items-center gap-3 font-dm text-[13px] text-[#5E665D]"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E4F1E0]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#71AC61]" />
                        </span>

                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress navigation */}
            <div className="flex items-center gap-3">
              {cards.map((card, index) => (
                <button
                  key={card.id}
                  type="button"
                  aria-label={`View ${card.title}`}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className="group flex items-center gap-2"
                >
                  <span
                    className={`h-[5px] rounded-full transition-all duration-500 ${
                      index === activeIndex
                        ? "w-12 bg-[#71AC61]"
                        : "w-5 bg-[#D0DEC9] group-hover:bg-[#A7C39D]"
                    }`}
                  />
                </button>
              ))}

              <span className="ml-2 font-dm text-[11px] uppercase tracking-[0.18em] text-[#979D96]">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(cards.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* ================= RIGHT IMAGE CARD ================= */}
          <div className="relative mx-auto h-[430px] w-full max-w-[600px]">
            {/* Background decorative cards */}
            <div className="absolute inset-x-10 bottom-2 top-10 rotate-[-4deg] rounded-[32px] border border-[#DCE7D8] bg-[#EAF3E7]" />

            <div className="absolute inset-x-5 bottom-5 top-5 rotate-[3deg] rounded-[32px] border border-[#DDE9D9] bg-white shadow-[0_20px_55px_rgba(36,60,31,0.08)]" />

            {/* Active card */}
            <AnimatePresence
              initial={false}
              mode="popLayout"
              custom={direction}
            >
              <motion.article
                key={activeCard.title}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.75,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 overflow-hidden rounded-[32px] bg-white shadow-[0_35px_100px_rgba(35,59,31,0.18)]"
              >
                <img
                  src={activeCard.img}
                  alt={activeCard.title}
                  className="h-full w-full object-cover"
                />

                {/* Image overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101A12]/90 via-[#101A12]/15 to-transparent" />

                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />

                {/* Top number */}
                <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/15 font-dm text-[12px] text-white backdrop-blur-md">
                  {activeCard.id}
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-9">
                  <p className="font-dm text-[11px] uppercase tracking-[0.23em] text-white/65">
                    Meditation for
                  </p>

                  <div className="mt-2 flex items-end justify-between gap-5">
                    <h3 className="font-season-medium text-[36px] leading-none md:text-[48px]">
                      {activeCard.title}
                    </h3>

                    <span className="hidden rounded-full border border-white/25 bg-white/10 px-4 py-2 font-dm text-[11px] uppercase tracking-[0.15em] text-white/80 backdrop-blur-sm sm:inline-flex">
                      {activeCard.shortTitle}
                    </span>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}