import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const journeyData = [
  {
    id: "01",
    quarter: "Quarter One",
    label: "The Grounding",
    title: "Foundation & Stabilisation",
    description:
      "Build the internal conditions for calmness. This phase establishes awareness, attention and a more regulated baseline.",
    points: [
      "Breath and body awareness",
      "Attention and focus training",
      "Sleep onset techniques",
    ],
    duration: "Months 01–03",
  },
  {
    id: "02",
    quarter: "Quarter Two",
    label: "The Regulation",
    title: "Resilience & Regulation",
    description:
      "Create more space between stimulus and response while developing emotional stability and nervous-system resilience.",
    points: [
      "Emotional regulation",
      "Thought observation",
      "Nervous system regulation",
      "Resilience building",
    ],
    duration: "Months 04–06",
  },
  {
    id: "03",
    quarter: "Quarter Three",
    label: "The Expansion",
    title: "Depth & Performance",
    description:
      "Move beyond basic practice into deeper states of silence, cognitive clarity and intentional flow.",
    points: [
      "Peak cognitive performance",
      "Deep states of silence",
      "Flow-state entry",
      "Advanced visualisation",
    ],
    duration: "Months 07–09",
  },
  {
    id: "04",
    quarter: "Quarter Four",
    label: "The Integration",
    title: "Integration & Awareness",
    description:
      "Meditation becomes less of an activity and more of a natural way of moving through everyday life.",
    points: [
      "Continuous mindfulness",
      "Compassion and equanimity",
      "Freedom from reactive patterns",
      "Embodied wisdom",
    ],
    duration: "Months 10–12",
  },
];

const YearlyJourney = () => {
  return (
    <section
      id="working-steps"
      className="relative overflow-hidden bg-[#FBFCF8] py-20 md:py-32"
    >
      {/* Soft background decoration */}
      <div className="pointer-events-none absolute -left-40 top-32 h-[420px] w-[420px] rounded-full bg-[#DDEED7]/50 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-[460px] w-[460px] rounded-full bg-[#E8F1E3]/70 blur-[130px]" />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-[760px] text-center">
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-[#7BAD69]" />

            <p className="font-dm text-[11px] uppercase tracking-[0.28em] text-[#6FA55E] md:text-[13px]">
              Your Yearly Journey
            </p>

            <span className="h-px w-8 bg-[#7BAD69]" />
          </div>

          <h2 className="font-season-medium text-[40px] leading-[1.08] text-[#1F2A20] md:text-[64px]">
            A year of returning
            <span className="block italic text-[#6FA55E]">to yourself.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-[650px] font-dm text-[15px] leading-7 text-[#70766F] md:text-[17px]">
            Four progressive phases designed to turn meditation from a daily
            practice into a more natural and embodied way of living.
          </p>
        </div>

        {/* Journey */}
        <div className="relative mt-20 md:mt-28">
          {/* Desktop centre line */}
          <div className="absolute left-1/2 top-8 hidden h-[calc(100%-64px)] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#A8C99B] to-transparent md:block" />

          {/* Mobile line */}
          <div className="absolute bottom-10 left-[20px] top-10 w-px bg-gradient-to-b from-transparent via-[#A8C99B] to-transparent md:hidden" />

          <div className="space-y-12 md:space-y-24">
            {journeyData.map((item, index) => {
              const isEven = index % 2 !== 0;

              return (
                <article
                  key={item.id}
                  className="relative grid items-center md:grid-cols-[1fr_100px_1fr]"
                >
                  {/* Desktop left side */}
                  <div
                    className={`hidden md:block ${
                      isEven ? "md:col-start-1" : "md:col-start-3"
                    }`}
                  >
                    <JourneyCard item={item} />
                  </div>

                  {/* Desktop centre marker */}
                  <div className="relative z-10 hidden h-full items-center justify-center md:col-start-2 md:row-start-1 md:flex">
                    <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#A8C99B] bg-[#FBFCF8] shadow-[0_0_0_10px_rgba(251,252,248,0.95)]">
                      <div className="h-[12px] w-[12px] rounded-full bg-[#82B66E] shadow-[0_0_20px_rgba(130,182,110,0.7)]" />
                    </div>
                  </div>

                  {/* Empty balancing space */}
                  <div
                    className={`hidden md:block ${
                      isEven ? "md:col-start-3" : "md:col-start-1"
                    } md:row-start-1`}
                  >
                    <div
                      className={`flex ${
                        isEven ? "justify-start" : "justify-end"
                      }`}
                    >
                      <span className="select-none font-season-medium text-[150px] leading-none text-[#DDE8D8]/55">
                        {item.id}
                      </span>
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="relative pl-14 md:hidden">
                    <div className="absolute left-[11px] top-8 z-10 flex h-[19px] w-[19px] items-center justify-center rounded-full border border-[#83B870] bg-[#FBFCF8]">
                      <div className="h-[7px] w-[7px] rounded-full bg-[#83B870]" />
                    </div>

                    <JourneyCard item={item} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const JourneyCard = ({ item, index }) => {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 95%", "end 20%"],
  });

  // Subtle parallax
  const rawY = useTransform(scrollYProgress, [0, 1], [60, -25]);
  const parallaxY = useSpring(rawY, {
    stiffness: 90,
    damping: 22,
    mass: 0.8,
  });

  const isEven = index % 2 !== 0;

  return (
    <motion.div
      ref={cardRef}
      style={{ y: parallaxY }}
      initial={{
        opacity: 0,
        x: isEven ? -90 : 90,
        scale: 0.94,
        filter: "blur(8px)",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.28,
      }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-[30px] border border-[#DDE7D9] bg-white/75 p-6 shadow-[0_22px_70px_rgba(39,63,34,0.06)] backdrop-blur-xl transition-[border-color,box-shadow] duration-500 hover:border-[#BFD8B5] hover:shadow-[0_28px_90px_rgba(39,63,34,0.1)] md:p-9"
    >
      {/* Card glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#E1F0DB] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center rounded-full border border-[#B9D7AE] bg-[#F6FAF4] px-4 py-2">
            <span className="font-dm text-[10px] font-medium uppercase tracking-[0.2em] text-[#649C52]">
              {item.quarter}
            </span>
          </div>

          <span className="font-dm text-[11px] uppercase tracking-[0.16em] text-[#999F97]">
            {item.duration}
          </span>
        </div>

        <p className="mb-3 font-dm text-[12px] uppercase tracking-[0.22em] text-[#83A979]">
          {item.label}
        </p>

        <h3 className="max-w-[440px] font-season-medium text-[28px] leading-tight text-[#202A21] md:text-[36px]">
          {item.title}
        </h3>

        <p className="mt-5 max-w-[500px] font-dm text-[14px] leading-7 text-[#747A73] md:text-[15px]">
          {item.description}
        </p>

        <div className="my-7 h-px w-full bg-gradient-to-r from-[#D7E5D1] to-transparent" />

        <ul className="grid gap-3 sm:grid-cols-2">
          {item.points.map((point, pointIndex) => (
            <motion.li
              key={point}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: 0.25 + pointIndex * 0.08,
              }}
              className="flex items-start gap-3 font-dm text-[13px] leading-6 text-[#60675F] md:text-[14px]"
            >
              <span className="mt-[7px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full bg-[#E9F4E5]">
                <span className="h-[5px] w-[5px] rounded-full bg-[#78AB64]" />
              </span>

              <span>{point}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default YearlyJourney;