import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

import LegendSleep from "../../assets/Icons/LegendSleep.png";
import Group from "../../assets/Icons/Group.png";
import Lotus from "../../assets/Icons/Lotus.png";
import Aim from "../../assets/Icons/Aim.png";

const cards = [
  {
    id: "01",
    timing: "Week 3",
    icon: LegendSleep,
    category: "Focus · Sharpened",
    title: "Attention Ninja",
    description:
      "Your mind stays where you place it. Distractions still arrive, but they no longer control the moment.",
    keyPoints: [
      "Sustained concentration",
      "Fewer intrusive thoughts",
      "Quicker decisions",
      "More present conversations",
    ],
  },
  {
    id: "02",
    timing: "Month 2",
    icon: Aim,
    category: "Sleep · Restored",
    title: "The Sleep Sage",
    description:
      "The struggle with night begins to soften. Rest comes with less resistance and the nervous system settles more naturally.",
    keyPoints: [
      "Falls asleep with ease",
      "Night anxiety loosens",
      "Wakes feeling calmer",
      "Early mood improvement",
    ],
  },
  {
    id: "03",
    timing: "Month 6",
    icon: Group,
    category: "Emotions · Mastered",
    title: "Zen Warrior",
    description:
      "You continue to feel deeply, but your emotions no longer decide every response.",
    keyPoints: [
      "Stress recovery improves",
      "Anger passes faster",
      "Responds instead of reacting",
      "Stable under pressure",
    ],
  },
  {
    id: "04",
    timing: "Month 12",
    icon: Lotus,
    category: "Stillness · Embodied",
    title: "Calm Character",
    description:
      "Meditation is no longer something you practise occasionally. It becomes visible in the way you live and respond.",
    keyPoints: [
      "Calm becomes the default",
      "Gratitude feels natural",
      "Presence requires less effort",
      "Practice becomes identity",
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function LegendarySection() {
  return (
    <section className="relative overflow-hidden bg-[#F8FBF6] px-5 py-20 md:px-8 md:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-48 top-1/3 h-[430px] w-[430px] rounded-full bg-[#DDEFD7]/70 blur-[130px]" />
      <div className="pointer-events-none absolute -right-44 bottom-0 h-[460px] w-[460px] rounded-full bg-[#E8F1E4] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-[1240px]">
        {/* Heading */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <h2 className="font-season-medium text-[34px] sm:text-[40px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-[#0e0e0e] text-left">
              Every session is whole.
              <span className="block text-[#71AC61]">
                Time makes it transformative.
              </span>
            </h2>
          </div>

          <p className="font-dm paragraph-body text-[#4a4a4a] text-left">
            There is no perfect starting point. Show up consistently and the
            practice begins to reshape attention, sleep, emotional regulation
            and the way you move through everyday life.
          </p>
        </div>

        {/* Cards — all 4 visible simultaneously, no staggered reveal */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16 lg:gap-6">
          {cards.map((card, index) => (
            <LegendCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LegendCard({ card, index }) {
  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative overflow-hidden rounded-[28px] border border-[#e0e0e0] bg-white p-6 shadow-[0_8px_32px_rgba(43,65,39,0.05)] transition-all duration-400 hover:border-[#b8d0b0] hover:shadow-[0_20px_60px_rgba(57,91,48,0.10)] md:p-8"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#DCEFD6] blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-55" />

      <div className="relative z-10">
        {/* Top row */}
        <div className="flex items-start justify-between gap-6">
          <div className="pt-1 flex flex-col gap-1">
            <span className="inline-flex items-center rounded-full border border-[#c8e0c0] bg-[#f0f8ec] px-3 py-1 font-dm text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5a9650] w-fit">
              {card.timing}
            </span>
            <p className="font-dm text-[11px] uppercase tracking-[0.2em] text-[#4a4a4a] mt-1">
              {card.category}
            </p>
          </div>

          <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-[20px] border border-[#e0e0e0] bg-[#EEF6EB] transition-all duration-400 group-hover:-rotate-3 group-hover:border-[#91BF84] group-hover:bg-[#71AC61] group-hover:shadow-[0_12px_30px_rgba(113,172,97,0.22)] md:h-[76px] md:w-[76px]">
            <img
              src={card.icon}
              alt=""
              className="h-[30px] w-[30px] object-contain transition-all duration-400 group-hover:scale-110 group-hover:brightness-0 group-hover:invert md:h-[36px] md:w-[36px]"
            />
          </div>
        </div>

        {/* Main content */}
        <div className="mt-4">
          <h3 className="font-season-medium text-[22px] leading-[1.15] tracking-[-0.01em] text-[#0e0e0e]">
            {card.title}
          </h3>

          <p className="mt-2 max-w-[500px] font-dm text-[14px] leading-[1.65] text-[#4a4a4a]">
            {card.description}
          </p>
        </div>

        {/* Divider */}
        <div className="my-5 h-px w-full bg-[#e0e0e0]" />

        {/* Key points — always all visible */}
        <div className="grid gap-3 sm:grid-cols-2">
          {card.keyPoints.map((point) => (
            <div key={point} className="flex items-start gap-3">
              <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E6F2E2] text-[#659D55]">
                <Check size={12} strokeWidth={3} />
              </span>
              <span className="font-dm text-[13px] leading-[1.5] text-[#4a4a4a]">
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom hover accent */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#72B866] transition-all duration-500 group-hover:w-full" />
    </motion.article>
  );
}
