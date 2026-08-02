import React from "react";
import { motion } from "framer-motion";

const journeyData = [
  {
    id: "01",
    quarter: "Quarter One",
    label: "The Grounding",
    title: "Foundation & Stabilisation",
    description:
      "Build the internal conditions for calmness and establish a more regulated baseline.",
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
      "Create more space between stimulus and response while building emotional stability.",
    points: [
      "Emotional regulation",
      "Thought observation",
      "Nervous system resilience",
    ],
    duration: "Months 04–06",
  },
  {
    id: "03",
    quarter: "Quarter Three",
    label: "The Expansion",
    title: "Depth & Performance",
    description:
      "Move beyond basic practice into deeper silence, clarity and intentional flow.",
    points: [
      "Cognitive performance",
      "Deep states of silence",
      "Flow-state entry",
    ],
    duration: "Months 07–09",
  },
  {
    id: "04",
    quarter: "Quarter Four",
    label: "The Integration",
    title: "Integration & Awareness",
    description:
      "Meditation becomes a natural way of moving through everyday life.",
    points: [
      "Continuous mindfulness",
      "Compassion and equanimity",
      "Freedom from reactivity",
    ],
    duration: "Months 10–12",
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.96,
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: index * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const YearlyJourney = () => {
  return (
    <section
      id="working-steps"
      className="relative overflow-hidden bg-[#F8FAF5] py-20 lg:py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-[380px] w-[380px] rounded-full bg-[#DCECD6]/60 blur-[120px]" />

        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#E4EFE0]/70 blur-[130px]" />

        <div
          className="
            absolute inset-0 opacity-30
            [background-image:linear-gradient(rgba(31,42,32,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(31,42,32,0.035)_1px,transparent_1px)]
            [background-size:72px_72px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        {/* Header — two-column: heading left, description right */}
        <div className="grid items-end gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="heading-main font-season-medium text-[#0e0e0e] text-left">
              A year of returning
              <span className="block text-[#6FA55E]">to yourself.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-dm paragraph-body text-[#4a4a4a] text-left">
              Four progressive phases that gradually transform meditation into a
              more natural and embodied way of living.
            </p>
          </motion.div>
        </div>

        {/* Desktop roadmap */}
        <div className="relative mt-0 hidden lg:block">
          <div className="grid grid-cols-4 gap-5">
            {journeyData.map((item, index) => (
              <JourneyCard
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Mobile and tablet roadmap */}
        <div className="relative mt-6 lg:hidden">
          <div className="absolute bottom-8 left-[22px] top-8 w-px bg-[#D0DFC9]" />

          <motion.div
            initial={{
              scaleY: 0,
            }}
            whileInView={{
              scaleY: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute bottom-8 left-[22px] top-8 w-px origin-top bg-gradient-to-b from-[#79AD66] via-[#A5CD97] to-[#79AD66]"
          />

          <div className="space-y-6">
            {journeyData.map((item, index) => (
              <div
                key={item.id}
                className="relative pl-14"
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.5,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  className="
                    absolute left-[11px] top-7 z-10
                    flex h-[23px] w-[23px]
                    items-center justify-center
                    rounded-full border border-[#9DC691]
                    bg-[#F8FAF5]
                    shadow-[0_0_0_6px_rgba(248,250,245,0.95)]
                  "
                >
                  <span className="h-[7px] w-[7px] rounded-full bg-[#78AB64]" />
                </motion.div>

                <JourneyCard
                  item={item}
                  index={index}
                  mobile
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-8 text-center lg:mt-10"
        >
          <p className="font-dm text-gray paragraph-body whitespace-nowrap">
            Each phase builds on the last, turning small daily practices into lasting inner change.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const JourneyCard = ({ item, index, mobile = false }) => {
  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      whileHover={
        !mobile
          ? {
              y: -8,
              transition: {
                duration: 0.3,
              },
            }
          : undefined
      }
      className={`
        group relative overflow-hidden
        rounded-[24px]
        border border-[#e0e0e0]
        bg-white
        shadow-[0_8px_28px_rgba(39,63,34,0.05)]
        transition-all duration-400
        hover:border-[#b8d0b0]
        hover:shadow-[0_20px_55px_rgba(39,63,34,0.10)]
        ${mobile ? "p-6" : "mt-[58px] min-h-[380px] p-6"}
      `}
    >
      {/* Desktop timeline marker */}
      {!mobile && (
        <motion.div
          initial={{
            scale: 0,
          }}
          whileInView={{
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.45,
            delay: 0.25 + index * 0.1,
          }}
          className="
            absolute left-1/2 top-[-44px]
            flex h-[30px] w-[30px]
            -translate-x-1/2
            items-center justify-center
            rounded-full
            border border-[#9DC691]
            bg-[#F8FAF5]
            shadow-[0_0_0_7px_rgba(248,250,245,0.95)]
          "
        >
          <span className="h-[8px] w-[8px] rounded-full bg-[#78AB64]" />
        </motion.div>
      )}

      {/* Glow */}
      <div
        className="
          pointer-events-none absolute
          -right-16 -top-16
          h-40 w-40
          rounded-full
          bg-[#DDEDD7]/60
          opacity-0 blur-3xl
          transition-opacity duration-500
          group-hover:opacity-100
        "
      />

      <div className="relative z-10">
        {/* Top row */}
        <div className="flex items-center justify-between gap-3">
          <span
            className="
              inline-flex items-center
              rounded-full
              border border-[#c8e0c0]
              bg-[#f0f8ec]
              px-3 py-[7px]
              font-dm text-[9px]
              font-semibold uppercase
              tracking-[0.18em]
              text-[#5a9650]
            "
          >
            {item.quarter}
          </span>

          <span className="font-dm text-[10px] uppercase tracking-[0.14em] text-[#4a4a4a]/60">
            {item.duration}
          </span>
        </div>

        {/* Heading */}
        <div className="mt-6">
          <p className="font-dm text-[11px] uppercase tracking-[0.12em] text-[#71AC61]">
            {item.label}
          </p>

          <h3 className="mt-2 font-season-medium text-[#0e0e0e] text-[19px] leading-[1.25] font-semibold">
            {item.title}
          </h3>
        </div>

        {/* Description */}
        <p className="mt-2 font-dm text-[14px] leading-[1.6] text-[#4a4a4a]">
          {item.description}
        </p>

        <div className="my-5 h-px w-full bg-[#e0e0e0]" />

        {/* Points */}
        <ul className="space-y-3">
          {item.points.map((point, pointIndex) => (
            <motion.li
              key={point}
              initial={{
                opacity: 0,
                x: -8,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.4,
                delay: 0.2 + pointIndex * 0.07,
              }}
              className="flex items-start gap-3 font-dm text-[12px] leading-5 text-[#4a4a4a]"
            >
              <span className="mt-[4px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full bg-[#EAF4E6]">
                <span className="h-[5px] w-[5px] rounded-full bg-[#76AA62]" />
              </span>

              <span>{point}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Hover accent */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#72B866] transition-all duration-500 group-hover:w-full" />
    </motion.article>
  );
};

export default YearlyJourney;