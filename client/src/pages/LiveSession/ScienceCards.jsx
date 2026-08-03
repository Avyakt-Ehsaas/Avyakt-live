import React from "react";
import {
  Focus,
  HeartPulse,
  Pause,
  Activity,
  MoonStar,
  Network,
} from "lucide-react";
import { motion } from "framer-motion";

const scienceCards = [
  {
    icon: Focus,
    title: "Attention Network",
    duration: "13 min / day",
    desc: "Strengthens the brain's attention networks, improving focus, working memory and reducing mind wandering.",
  },
  {
    icon: HeartPulse,
    title: "Emotional Brain",
    duration: "10–20 min / day",
    desc: "Reduces amygdala reactivity while strengthening prefrontal control, helping you stay calm under pressure.",
  },
  {
    icon: Pause,
    title: "Response Control",
    duration: "10–15 min / day",
    desc: "Strengthens inhibitory control, creating a mental pause between an impulse and your response.",
  },
  {
    icon: Activity,
    title: "Stress & Recovery",
    duration: "10–20 min / day",
    desc: "Lowers physiological stress, supporting healthier cortisol regulation and faster recovery from daily pressure.",
  },
  {
    icon: MoonStar,
    title: "Sleep System",
    duration: "10–20 min / day",
    desc: "Calms mental hyperarousal, helping you fall asleep more easily and improving sleep quality.",
  },
  {
    icon: Network,
    title: "Brain Plasticity",
    duration: "~8 Weeks",
    desc: "Increases gray matter in regions involved in learning, memory and self-awareness while reducing stress-related changes.",
  },
];

const fadeLeft = {
  hidden: { opacity: 0, x: -45 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 45 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function ScienceCard({ item }) {
  const Icon = item.icon;
  return (
    <article className="
      group relative flex flex-col overflow-hidden
      rounded-[22px] border border-[#e0e0e0] bg-white
      p-5 transition-all duration-400
      hover:border-[#b8d8b0] hover:shadow-[0_20px_50px_rgba(31,74,48,0.09)]
      w-full lg:w-[240px] lg:flex-shrink-0
    ">
      <motion.div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#CDE8C6]/30 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Top row: icon + duration */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-[#e0e0e0] bg-[#F2F8F0] transition-all duration-300 group-hover:bg-[#EAF5E7]">
          <Icon size={19} strokeWidth={1.7} className="text-[#5DA652]" />
        </div>
        <span className="font-dm text-[10px] font-medium uppercase tracking-[0.15em] text-[#0e0e0e]/40 pt-1">
          {item.duration}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-4 flex-1">
        <h3 className="font-season font-semibold text-[17px] leading-[1.25] tracking-[-0.01em] text-[#0e0e0e]">
          {item.title}
        </h3>
        <p className="mt-2 font-dm text-[13px] leading-[1.65] text-[#4a4a4a]">
          {item.desc}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#72B866] transition-all duration-500 group-hover:w-full" />
    </article>
  );
}

export default function ScienceSection() {
  const doubled = [...scienceCards, ...scienceCards];

  return (
    <section className="relative overflow-hidden bg-[#F6F9F4] py-12 lg:py-16">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ x: [0, 35, 0], y: [0, -25, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-160px] top-20 h-[360px] w-[360px] rounded-full bg-[#C9E5C3]/25 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -35, 0], y: [0, 30, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-[-140px] h-[420px] w-[420px] rounded-full bg-[#DDEDD8]/40 blur-[120px]"
        />
      </div>

      {/* ── All content constrained to page margins ── */}
      <div className="relative z-10 mx-auto max-w-[1180px] px-5 md:px-8">

        {/* Header */}
        <div className="grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="
              max-w-[650px] font-season-medium
              text-[38px] sm:text-[46px] md:text-[54px]
              leading-[1.06] tracking-[0.06em]
              text-[#0e0e0e] font-medium
            ">
              Stillness changes
              <span className="block text-[#5DA652]">your brain.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-[520px] lg:ml-auto"
          >
            <p className="font-dm text-[16px] leading-[1.75] text-[#4a4a4a] md:text-[17px]">
              Meditation is not simply about feeling relaxed. Consistent
              practice trains the neural systems behind attention, emotional
              balance, recovery, sleep and conscious decision-making.
            </p>
          </motion.div>
        </div>

        {/* Mobile: vertical grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
          {scienceCards.map((item, i) => (
            <ScienceCard key={`${item.title}-${i}`} item={item} />
          ))}
        </div>

        {/* Desktop: auto-scrolling marquee */}
        <div className="mt-8 hidden lg:block overflow-hidden rounded-[16px]">
          <div className="science-cards-track flex gap-4">
            {doubled.map((item, i) => (
              <ScienceCard key={`${item.title}-${i}`} item={item} />
            ))}
          </div>
        </div>

        {/* Centered editorial bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-center"
        >
          <p className="
            font-season-medium
            text-[17px]
            leading-[1.5] tracking-[-0.01em]
            text-[#0e0e0e]
          ">
            The brain changes through{" "}
            <em className="not-italic text-[#5DA652]">repetition,</em>
            {" "}not intensity.
          </p>
        </motion.div>

      </div>

      {/* Bottom transition */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[80px] w-full bg-gradient-to-b from-transparent to-white/80" />

      <style>{`
        .science-cards-track {
          animation: science-marquee 42s linear infinite;
          will-change: transform;
        }
        .science-cards-track:hover {
          animation-play-state: paused;
        }
        @keyframes science-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .science-cards-track {
            animation: none;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </section>
  );
}
