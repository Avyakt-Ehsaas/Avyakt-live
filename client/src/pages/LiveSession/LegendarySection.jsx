import React, { useState } from "react";
import { Check, ChevronRight } from "lucide-react";

import LegendSleep from "../../assets/Icons/LegendSleep.png";
import Group from "../../assets/Icons/Group.png";
import Lotus from "../../assets/Icons/Lotus.png";
import Aim from "../../assets/Icons/Aim.png";

const cards = [
  {
    id: "01",
    label: "Unlocks · Week 3",
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
    label: "Unlocks · Month 2",
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
    label: "Unlocks · Month 6",
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
    label: "Unlocks · Month 12",
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

export default function LegendarySection() {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#F8FBF6] px-5 py-20 md:px-8 md:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-48 top-1/3 h-[430px] w-[430px] rounded-full bg-[#DDEFD7]/70 blur-[130px]" />

      <div className="pointer-events-none absolute -right-44 bottom-0 h-[460px] w-[460px] rounded-full bg-[#E8F1E4] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-[1240px]">
        {/* Heading */}
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-[#71AC61]" />

              <p className="font-dm text-[11px] font-medium uppercase tracking-[0.28em] text-[#71AC61] md:text-[13px]">
                What Consistent Practice Builds
              </p>
            </div>

            <h2 className="mt-5 max-w-[580px] font-season-medium text-[40px] leading-[1.08] text-[#202A21] md:text-[58px]">
              Every session is whole.
              <span className="block italic text-[#71AC61]">
                Time makes it transformative.
              </span>
            </h2>
          </div>

          <p className="max-w-[560px] font-dm text-[15px] leading-7 text-[#747B72] md:text-[17px] lg:justify-self-end">
            There is no perfect starting point. Show up consistently and the
            practice begins to reshape attention, sleep, emotional regulation
            and the way you move through everyday life.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-18 lg:gap-6">
          {cards.map((card, index) => (
            <LegendCard
              key={card.id}
              card={card}
              isActive={activeCard === index}
              onToggle={() =>
                setActiveCard((current) => (current === index ? -1 : index))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function LegendCard({ card, isActive, onToggle }) {
  return (
    <article
      onMouseEnter={onToggle}
      onMouseLeave={onToggle}
      onClick={onToggle}
      className={`group relative cursor-pointer overflow-hidden rounded-[30px] border p-6 transition-all duration-500 md:p-8 ${
        isActive
          ? "border-[#A8CEA0] bg-white shadow-[0_30px_90px_rgba(57,91,48,0.14)] md:-translate-y-2"
          : "border-[#DFE8DC] bg-white/75 shadow-[0_18px_55px_rgba(43,65,39,0.06)] hover:border-[#BED9B6]"
      }`}
    >
      {/* Glow */}
      <div
        className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#DCEFD6] blur-[80px] transition-opacity duration-500 ${
          isActive ? "opacity-80" : "opacity-0 group-hover:opacity-55"
        }`}
      />

      {/* Large faded number */}
      <span className="pointer-events-none absolute right-5 top-2 select-none font-season-medium text-[92px] leading-none text-[#E4EDE0] md:text-[110px]">
        {card.id}
      </span>

      <div className="relative z-10">
        {/* Top row */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-dm text-[10px] font-medium uppercase tracking-[0.2em] text-[#7FA675] md:text-[11px]">
              {card.label}
            </p>

            <p className="mt-3 font-dm text-[11px] uppercase tracking-[0.22em] text-[#979E95]">
              {card.category}
            </p>
          </div>

          <div
            className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[22px] border transition-all duration-500 md:h-[82px] md:w-[82px] ${
              isActive
                ? "rotate-3 border-[#91BF84] bg-[#71AC61] shadow-[0_18px_40px_rgba(113,172,97,0.28)]"
                : "border-[#D6E5D2] bg-[#EEF6EB] group-hover:-rotate-3"
            }`}
          >
            <img
              src={card.icon}
              alt=""
              className={`h-[34px] w-[34px] object-contain transition-all duration-500 md:h-[40px] md:w-[40px] ${
                isActive ? "scale-110 brightness-0 invert" : ""
              }`}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="mt-10">
          <h3 className="font-season-medium text-[30px] leading-tight text-[#202A21] md:text-[38px]">
            {card.title}
          </h3>

          <p className="mt-4 max-w-[500px] font-dm text-[14px] leading-7 text-[#70776F] md:text-[15px]">
            {card.description}
          </p>
        </div>

        <div className="my-7 h-px bg-gradient-to-r from-[#D5E3D0] via-[#D5E3D0] to-transparent" />

        {/* Key points */}
        <div
          className={`grid overflow-hidden transition-all duration-500 sm:grid-cols-2 ${
            isActive
              ? "max-h-[240px] gap-3 opacity-100"
              : "max-h-[48px] gap-3 opacity-80"
          }`}
        >
          {card.keyPoints.map((point, index) => (
            <div
              key={point}
              className={`flex items-start gap-3 transition-all duration-500 ${
                !isActive && index > 1
                  ? "translate-y-3 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
              style={{
                transitionDelay: isActive ? `${index * 70}ms` : "0ms",
              }}
            >
              <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E6F2E2] text-[#659D55]">
                <Check size={12} strokeWidth={3} />
              </span>

              <span className="font-dm text-[13px] leading-6 text-[#5E665D] md:text-[14px]">
                {point}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom action */}
        <div className="mt-7 flex items-center justify-between">
          <span className="font-dm text-[11px] uppercase tracking-[0.16em] text-[#969D94]">
            {isActive ? "Milestone revealed" : "Explore milestone"}
          </span>

          <span
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ${
              isActive
                ? "rotate-90 border-[#71AC61] bg-[#71AC61] text-white"
                : "border-[#D6E3D2] bg-[#F7FAF5] text-[#517449]"
            }`}
          >
            <ChevronRight size={17} />
          </span>
        </div>
      </div>
    </article>
  );
}