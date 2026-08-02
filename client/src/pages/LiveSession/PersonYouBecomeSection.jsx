import React from "react";
import {
  Sunrise,
  Brain,
  Feather,
  Compass,
  CircleUserRound,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";

const transformationPoints = [
  {
    number: "01",
    icon: Sunrise,
    title: "You wake up feeling lighter.",
    desc: "Your mornings begin with less mental heaviness and more emotional space.",
  },
  {
    number: "02",
    icon: Brain,
    title: "You stop overthinking.",
    desc: "Thoughts still arise, but they no longer control your entire day.",
  },
  {
    number: "03",
    icon: Feather,
    title: "Small things stop bothering you.",
    desc: "Minor frustrations lose their power to disturb your inner balance.",
  },
  {
    number: "04",
    icon: Compass,
    title: "You trust your own decisions.",
    desc: "Clarity replaces hesitation, helping you act with greater confidence.",
  },
  {
    number: "05",
    icon: CircleUserRound,
    title: "You seek less validation.",
    desc: "Your sense of worth becomes less dependent on approval from others.",
  },
  {
    number: "06",
    icon: Heart,
    title: "You become more present.",
    desc: "You listen more deeply, react less quickly, and connect more honestly.",
  },
];

/* ─── sizing constants ─── */
const HALF_H = 170; // px — height of each content block (above/below)
const DOT_H  = 24;  // px — dot row height
const LINE_Y = HALF_H + DOT_H / 2; // px from top of timeline = 182

export default function PersonYouBecomeSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-180px] top-[10%] h-[420px] w-[420px] rounded-full bg-[#DDEED8]/45 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-120px] right-[-130px] h-[380px] w-[380px] rounded-full bg-[#E7F3E3]/70 blur-[120px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1180px] px-5 md:px-8">

        {/* ── Section heading ── */}
        <div className="grid items-end gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-season-medium text-[38px] sm:text-[46px] md:text-[54px] leading-[1.06] tracking-[-0.02em] text-[#0e0e0e] text-center">
              The change is subtle.
              <span className="block text-[#6BAC60]">Until it becomes you.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <p className="font-dm text-[16px] leading-[1.75] text-[#4a4a4a] md:text-[17px]">
              Around 30 days of consistent practice, meditation begins to feel
              less like something you do and more like a different way of living.
            </p>

            <div className="flex items-center gap-6">
              <div className="shrink-0 text-center">
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="font-season-medium text-[52px] leading-none text-[#0e0e0e]"
                >
                  30
                </motion.p>
                <p className="mt-1 font-dm text-[10px] font-medium uppercase tracking-[0.22em] text-[#5D9F53]">
                  Days inward
                </p>
              </div>

              <div className="border-l border-[#72B866]/35 pl-5">
                <p className="font-dm text-[15px] leading-[1.65] text-[#4a4a4a]">
                  Not a new personality.{" "}
                  <span className="text-[#69A85E]">
                    A calmer version of the person already within you.
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Desktop: horizontal alternating timeline (reference-matched) ── */}
        <div
          className="relative mt-14 hidden lg:block"
          style={{ height: HALF_H * 2 + DOT_H }}
        >
          {/* Static base line */}
          <div
            className="pointer-events-none absolute left-0 right-0 h-px bg-[#D4E2CE]"
            style={{ top: LINE_Y }}
          />
          {/* Animated green line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute left-0 right-0 h-px origin-left bg-gradient-to-r from-[#79AD66] via-[#9DC78F] to-[#79AD66]"
            style={{ top: LINE_Y }}
          />

          {/* 6-column grid */}
          <div className="grid grid-cols-6 h-full">
            {transformationPoints.map((item, index) => {
              const isAbove = index % 2 === 0; // 01,03,05 → number above; 02,04,06 → number below
              const Icon = item.icon;
              const delay = index * 0.1;

              return (
                <div key={item.title} className="flex flex-col items-center">

                  {/* ── UPPER BLOCK ── */}
                  <div
                    className="w-full flex flex-col items-center justify-center px-3 text-center"
                    style={{ height: HALF_H }}
                  >
                    {isAbove ? (
                      /* Number centered in upper half */
                      <motion.span
                        initial={{ opacity: 0, y: -18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
                        className="font-season-medium text-[52px] leading-none tracking-[-0.02em] text-[#5DA652] select-none"
                      >
                        {item.number}
                      </motion.span>
                    ) : (
                      /* Content at bottom of upper half — close to line */
                      <motion.div
                        initial={{ opacity: 0, y: -14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-auto pb-5 text-center"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2F8F0] border border-[#e0e0e0] mx-auto mb-2">
                          <Icon size={14} strokeWidth={1.6} className="text-[#5DA652]" />
                        </div>
                        <h3 className="font-season-medium text-[12.5px] leading-[1.3] text-[#0e0e0e]">
                          {item.title}
                        </h3>
                        <p className="mt-1 font-dm text-[11px] leading-[1.55] text-[#5a5a5a]">
                          {item.desc}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* ── DOT at the line ── */}
                  <div
                    className="relative flex items-center justify-center flex-shrink-0"
                    style={{ height: DOT_H }}
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.38, delay: 0.28 + delay }}
                      className="z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[#79AD66] bg-[#F8FAF5] shadow-[0_0_0_5px_rgba(248,250,245,0.95),0_0_0_6px_rgba(121,173,102,0.15)]"
                    >
                      <span className="h-[6px] w-[6px] rounded-full bg-[#72B866]" />
                    </motion.div>
                  </div>

                  {/* ── LOWER BLOCK ── */}
                  <div
                    className="w-full flex flex-col items-center justify-center px-3 text-center"
                    style={{ height: HALF_H }}
                  >
                    {!isAbove ? (
                      /* Number centered in lower half */
                      <motion.span
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
                        className="font-season-medium text-[52px] leading-none tracking-[-0.02em] text-[#5DA652] select-none"
                      >
                        {item.number}
                      </motion.span>
                    ) : (
                      /* Content at top of lower half — close to line */
                      <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-auto pt-5 text-center"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2F8F0] border border-[#e0e0e0] mx-auto mb-2">
                          <Icon size={14} strokeWidth={1.6} className="text-[#5DA652]" />
                        </div>
                        <h3 className="font-season-medium text-[12.5px] leading-[1.3] text-[#0e0e0e]">
                          {item.title}
                        </h3>
                        <p className="mt-1 font-dm text-[11px] leading-[1.55] text-[#5a5a5a]">
                          {item.desc}
                        </p>
                      </motion.div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile: vertical animated timeline ── */}
        <div className="mt-10 lg:hidden">
          <div className="relative pl-10">
            {/* Vertical line */}
            <div className="absolute left-[14px] top-4 bottom-4 w-px bg-[#D0DFC9]" />
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-[14px] top-4 bottom-4 w-px origin-top bg-gradient-to-b from-[#79AD66] via-[#A5CD97] to-[#79AD66]"
            />

            <div className="space-y-5">
              {transformationPoints.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    {/* Dot */}
                    <div className="absolute -left-10 top-5 z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full border border-[#9DC691] bg-[#F8FAF5] shadow-[0_0_0_5px_rgba(248,250,245,0.95)]">
                      <span className="h-[6px] w-[6px] rounded-full bg-[#78AB64]" />
                    </div>

                    <div className="rounded-[18px] border border-[#e8ede6] bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#b8d0b0] hover:shadow-[0_8px_24px_rgba(32,75,45,0.07)]">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#F2F8F0] border border-[#e5e5e5] flex items-center justify-center shrink-0">
                          <Icon size={13} strokeWidth={1.6} className="text-[#5DA652]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-season-medium text-[13.5px] leading-[1.3] text-[#0e0e0e]">
                              {item.title}
                            </h3>
                            <span className="font-season-medium text-[18px] leading-none text-[#5DA652]/60 shrink-0">
                              {item.number}
                            </span>
                          </div>
                          <p className="mt-1 font-dm text-[12.5px] leading-[1.6] text-[#4a4a4a]">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mt-10 border-t border-[#e8ede6] pt-6 text-center"
        >
          <p className="font-dm text-[16px] leading-[1.65] text-[#0e0e0e] md:text-[18px]">
            One day, you notice that life is the same
            <span className="text-[#68A85D]"> but you are responding differently.</span>
          </p>
        </motion.div>

      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-[80px] w-full bg-gradient-to-b from-transparent to-[#F8FAF5]/80" />
    </section>
  );
}
