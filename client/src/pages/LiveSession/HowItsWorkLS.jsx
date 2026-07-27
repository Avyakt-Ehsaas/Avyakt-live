import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Sparkles,
} from "lucide-react";

import TheScienceBottom from "../../assets/images/TheScienceBottom.png";

const stepsIndividual = [
  {
    title: "Join a free live session",
    description:
      "Experience the practice live and understand how the daily sessions work.",
  },
  {
    title: "Practice daily with the community",
    description:
      "Build consistency through guided sessions and the support of a shared practice.",
  },
  {
    title: "Receive your before & after report",
    description:
      "See measurable changes in your attention, stress and overall wellbeing.",
  },
  {
    title: "Continue with the 12-month program",
    description:
      "Progress through a structured journey designed for deeper, lasting change.",
  },
];

const containerAnimation = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

const stepAnimation = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const StepItem = ({ number, title, description, isLast }) => {
  return (
    <motion.li
      variants={stepAnimation}
      className="group relative grid grid-cols-[44px_1fr] gap-4"
    >
      {/* Timeline */}
      <div className="relative flex justify-center">
        <motion.div
          whileHover={{
            scale: 1.08,
          }}
          className="
            relative z-10 flex h-10 w-10 shrink-0
            items-center justify-center rounded-full
            border border-[#8FBE80]/45 bg-[#F1F8EE]
            font-dm text-[12px] font-semibold text-[#629E52]
            shadow-[0_8px_22px_rgba(75,125,61,0.08)]
            transition-colors duration-300
            group-hover:border-[#78AF67]
            group-hover:bg-[#E8F4E4]
          "
        >
          {String(number).padStart(2, "0")}
        </motion.div>

        {!isLast && (
          <div className="absolute bottom-[-28px] top-10 w-px overflow-hidden bg-[#D7E7D2]">
            <motion.div
              initial={{
                scaleY: 0,
              }}
              whileInView={{
                scaleY: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.25,
              }}
              className="h-full w-full origin-top bg-gradient-to-b from-[#7FB36D] to-[#C9DFC2]"
            />
          </div>
        )}
      </div>

      {/* Step content */}
      <div
        className={`
          pb-2
          ${!isLast ? "border-b border-[#183E2C]/[0.07]" : ""}
        `}
      >
        <h4 className="font-dm text-[16px] font-semibold leading-5 text-[#203629] md:text-[17px]">
          {title}
        </h4>

        <p className="mt-0.5 max-w-[500px] font-dm text-[13px] leading-6 text-[#6D786F] md:text-[14px]">
          {description}
        </p>
      </div>
    </motion.li>
  );
};

export default function HowItWorkLS() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#FAFCF8] py-20 md:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-[380px] w-[380px] rounded-full bg-[#DCEED7]/50 blur-[120px]" />

        <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#E5F0E1]/70 blur-[130px]" />

        <div
          className="
            absolute inset-0 opacity-[0.28]
            [background-image:linear-gradient(rgba(24,62,44,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(24,62,44,0.035)_1px,transparent_1px)]
            [background-size:76px_76px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-[1180px] px-5 md:px-8">
        {/* Header */}
        <motion.header
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-[760px] text-center"
        >
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-[#72AC61]" />

            <p className="font-dm text-[11px] font-medium uppercase tracking-[0.26em] text-[#669F56] md:text-[13px]">
              How It Works
            </p>

            <span className="h-px w-8 bg-[#72AC61]" />
          </div>

          <h2 className="heading-main font-season-medium leading-[1.05] text-primary">
            Here is exactly
            <span className="block text-greenbase">what happens next.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[620px] font-dm text-[15px] leading-7 text-gray md:text-[17px]">
            Begin with one live session, build a consistent daily practice and
            track the changes you experience along the way.
          </p>
        </motion.header>

        {/* Main card */}
        <motion.div
          initial={{
            opacity: 0,
            y: 45,
            scale: 0.98,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative mx-auto mt-2 grid max-w-[1040px]
            overflow-hidden rounded-[30px]
            border border-[#183E2C]/[0.08]
            bg-white shadow-[0_28px_90px_rgba(37,72,42,0.08)]
            md:mt-18 lg:grid-cols-[0.8fr_1.2fr]
          "
        >
          {/* Left visual */}
          <div className="relative min-h-[330px] overflow-hidden bg-[#EAF4E6] p-7 md:p-9 lg:min-h-[560px]">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/70 blur-[70px]" />

            <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#BFDDB6]/55 blur-[80px]" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-center justify-between gap-4">
                <span
                  className="
                    inline-flex items-center gap-2 rounded-full
                    border border-[#75AC64]/20 bg-white/70
                    px-4 py-2 backdrop-blur-md
                  "
                >
                 
                  <span className="font-dm text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5F9650]">
                    For Individuals
                  </span>
                </span>

                <span className="font-dm text-[11px] uppercase tracking-[0.15em] text-[#4E7552]/65">
                  Four steps
                </span>
              </div>

              <div className="mt-9 max-w-[380px]">
                <p className="font-dm text-[11px] uppercase tracking-[0.2em] text-[#6C9B61]">
                  Your starting journey
                </p>

                <h3 className="mt-3 font-season-medium text-[32px] leading-[1.08] text-[#1D3827] md:text-[42px]">
                  Your first
                  <span className="block text-[#69A357]">
                    24 days and beyond.
                  </span>
                </h3>

                <p className="mt-5 font-dm text-[14px] leading-7 text-[#55705A] md:text-[15px]">
                  A guided beginning that helps you experience the practice,
                  build consistency and understand your progress.
                </p>
              </div>

              {/* Info card */}
              <div
                className="
                  relative z-20 mt-8 rounded-[20px]
                  border border-white/65 bg-white/55 p-5
                  shadow-[0_16px_40px_rgba(38,73,40,0.06)]
                  backdrop-blur-md lg:mt-auto
                "
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-white">
                    <CalendarDays
                      size={18}
                      strokeWidth={1.7}
                      className="text-[#66A155]"
                    />
                  </div>

                  <div>
                    <p className="font-dm text-[12px] text-[#6B786D]">
                      Initial guided journey
                    </p>

                    <p className="font-dm text-[15px] font-semibold text-[#263E2C]">
                      24 days of live practice
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  {["Live guidance", "Progress report"].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 font-dm text-[12px] text-[#56705A]"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E5F1E1]">
                        <Check
                          size={11}
                          strokeWidth={2}
                          className="text-[#65A253]"
                        />
                      </span>

                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right timeline */}
          <div className="relative p-7 md:p-10">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="font-dm text-[12px] uppercase tracking-[0.2em] text-[#75A66A]">
                  The process
                </p>

                <h3 className="mt-2 font-season heading-large font-med text-left text-primary">
                  From your first session
                  <span className="block text-greenbase">
                    to lasting practice.
                  </span>
                </h3>
              </div>

              <ArrowUpRight
                size={22}
                strokeWidth={1.5}
                className="hidden text-[#75A66A] sm:block"
              />
            </div>

            <motion.ul
              variants={containerAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className="space-y-7"
            >
              {stepsIndividual.map((step, index) => (
                <StepItem
                  key={step.title}
                  number={index + 1}
                  title={step.title}
                  description={step.description}
                  isLast={index === stepsIndividual.length - 1}
                />
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-b from-transparent to-white/70" />
    </section>
  );
}