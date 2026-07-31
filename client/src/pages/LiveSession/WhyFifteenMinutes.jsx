import React from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Brain,
  MessageCircle,
  Moon,
  Sparkles,
  Target,
  Timer,
  Waves,
} from "lucide-react";

const benefits = [
  {
    number: "01",
    title: "Better attention",
    description: "Stay present with what truly matters.",
    icon: Target,
    position:
      "lg:absolute lg:left-[5%] lg:top-[17%] lg:w-[245px]",
    animation: { x: -45, y: -15 },
  },
  {
    number: "02",
    title: "Lower stress",
    description: "Create space between pressure and response.",
    icon: Waves,
    position:
      "lg:absolute lg:right-[5%] lg:top-[17%] lg:w-[245px]",
    animation: { x: 45, y: -15 },
  },
  {
    number: "03",
    title: "Better decisions",
    description: "Think clearly instead of reacting quickly.",
    icon: Brain,
    position:
      "lg:absolute lg:left-[1%] lg:bottom-[17%] lg:w-[245px]",
    animation: { x: -45, y: 15 },
  },
  {
    number: "04",
    title: "Better conversations",
    description: "Listen deeply and respond with intention.",
    icon: MessageCircle,
    position:
      "lg:absolute lg:right-[1%] lg:bottom-[17%] lg:w-[245px]",
    animation: { x: 45, y: 15 },
  },
];

const WhyFifteenMinutes = () => {
  return (
    <section className="relative overflow-hidden bg-[#F8F8F3] px-5 py-10 sm:px-8 sm:py-24 lg:py-32">
      {/* Ambient background */}
      <div className="pointer-events-none absolute left-1/2 top-[45%] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DDE8D8]/55 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-medium tracking-[-0.045em] text-primary heading-main font-season ">
            Just Fifteen minutes can shape
            <span className="block text-greenbase">
              the rest of your day.
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl font-dm paragraph-body text-gray">
            A small daily pause improves how you focus, respond, connect and
            recover throughout the remaining 1,425 minutes.
          </p>
        </motion.div>

        {/* Desktop visual journey */}
        <div className="relative mx-auto mt-12 hidden h-[620px] max-w-6xl lg:block">
          {/* Circular orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#BFCFBA]"
          />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2"
          >
            <span className="absolute left-1/2 top-[-6px] h-3 w-3 -translate-x-1/2 rounded-full bg-[#75946C] shadow-[0_0_0_8px_rgba(117,148,108,0.12)]" />

            <span className="absolute bottom-[-6px] left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#A8BFA1]" />
          </motion.div>

          {/* Connecting SVG lines */}
          <svg
            viewBox="0 0 1100 620"
            className="pointer-events-none absolute inset-0 h-full w-full"
            fill="none"
          >
            <motion.path
              d="M250 145 C360 150, 405 225, 465 265"
              stroke="#B8C9B3"
              strokeWidth="1.5"
              strokeDasharray="5 7"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />

            <motion.path
              d="M850 145 C740 150, 695 225, 635 265"
              stroke="#B8C9B3"
              strokeWidth="1.5"
              strokeDasharray="5 7"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4 }}
            />

            <motion.path
              d="M230 470 C350 470, 405 400, 465 355"
              stroke="#B8C9B3"
              strokeWidth="1.5"
              strokeDasharray="5 7"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.6 }}
            />

            <motion.path
              d="M870 470 C750 470, 695 400, 635 355"
              stroke="#B8C9B3"
              strokeWidth="1.5"
              strokeDasharray="5 7"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.8 }}
            />
          </svg>

          {/* Central circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              type: "spring",
              stiffness: 90,
            }}
            className="absolute left-1/2 top-1/2 flex h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/80 bg-white/70 text-center shadow-[0_30px_100px_rgba(47,77,44,0.13)] backdrop-blur-xl"
          >
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#E9F0E6]"
            >
              <Timer className="h-6 w-6 text-[#688460]" strokeWidth={1.5} />
            </motion.div>

            <span className="font-dm font-med uppercase paragraph-body text-greenbase">
              Daily practice
            </span>

            <div className="mt-2 font-season font-med text-[72px] leading-none tracking-[1px] text-primary">
              15
            </div>

            <span className="mt-1 paragraph-body text-primary font-dm">minutes</span>
          </motion.div>

          {/* Benefit cards */}
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                initial={{
                  opacity: 0,
                  x: benefit.animation.x,
                  y: benefit.animation.y,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.75,
                  delay: 0.25 + index * 0.16,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={benefit.position}
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="group rounded-[26px] border border-[#DDE5DA] bg-white/65 p-5 shadow-[0_14px_45px_rgba(48,70,45,0.06)] backdrop-blur-xl transition-all duration-300 hover:border-[#C5D5C0] hover:bg-white"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EDF2EA] transition-transform duration-300 group-hover:scale-105">
                      <Icon
                        className="h-5 w-5 text-greenbase"
                        strokeWidth={1.6}
                      />
                    </div>

                    <span className="caption-text font-med text-gray font-season">
                      {benefit.number}
                    </span>
                  </div>

                  <h3 className="mt-4 font-smbold tracking-[-0.02em] text-primary font-season caption-text">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray font-dm">
                    {benefit.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Sleep bridge */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.9 }}
            className="absolute bottom-[-10px] left-1/2 w-[270px] -translate-x-1/2"
          >
            <div className="flex items-center justify-center gap-3 rounded-full border border-[#D9E4D5] bg-white/75 px-5 py-3 shadow-sm backdrop-blur-lg">
              <Moon className="h-4 w-4 text-greenbase" strokeWidth={1.8} />

              <span className="text-sm font-medium text-greenbase ">
                Better sleep completes the cycle
              </span>
            </div>
          </motion.div>
        </div>

        {/* Mobile layout */}
        <div className="mx-auto mt-12 grid max-w-xl gap-4 lg:hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[30px] bg-[#1D3823] p-7 text-center"
          >
            <div className="absolute right-[-50px] top-[-60px] h-40 w-40 rounded-full bg-[#91AD88]/20 blur-3xl" />

            <Timer className="mx-auto h-7 w-7 text-[#BFD0BA]" />

            <div className="mt-4 text-6xl font-medium tracking-[-0.02em] text-white font-season">
              15
            </div>

            <p className="mt-1 text-sm uppercase tracking-[0.2em] text-white/90 font-dm">
              intentional minutes
            </p>
          </motion.div>

          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -25 : 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center gap-4 rounded-2xl border border-[#E0E7DD] bg-white/70 p-4 backdrop-blur-lg"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EDF2EA]">
                  <Icon
                    className="h-5 w-5 text-greenbase"
                    strokeWidth={1.6}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-primary font-season caption-text">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray font-dm">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}

          <div className="flex justify-center py-2">
            <ArrowDown className="h-5 w-5 text-[#91A58C]" />
          </div>
        </div>

      </div>

      {/* Bottom section fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 md:h-24 bg-gradient-to-b from-transparent to-white/50" />
    </section>
  );
};

export default WhyFifteenMinutes;