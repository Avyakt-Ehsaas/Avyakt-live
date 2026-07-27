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
        {/* Header */}
        <motion.div
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
          <div className="mb-3 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-[#7BAD69]" />

            <p className="font-dm text-[12px] uppercase tracking-[0.28em] text-[#6FA55E] md:text-[14px]">
              Your Yearly Journey
            </p>

            <span className="h-px w-8 bg-[#7BAD69]" />
          </div>

          <h2 className="heading-main font-season-medium text-[#1F2A20]">
            A year of returning
            <span className="block text-[#6FA55E]">to yourself.</span>
          </h2>

          <p className="mx-auto mt-3 max-w-[630px] font-dm paragraph-body text-gray">
            Four progressive phases that gradually transform meditation into a
            more natural and embodied way of living.
          </p>
        </motion.div>

        {/* Desktop roadmap */}
        <div className="relative mt-2 hidden lg:block">
          {/* Journey line */}
          <div className="absolute left-[12.5%] right-[12.5%] top-[29px] h-px bg-[#D0DFC9]" />

          <motion.div
            initial={{
              scaleX: 0,
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-[12.5%] right-[12.5%] top-[29px] h-px origin-left bg-gradient-to-r from-[#79AD66] via-[#9DC78F] to-[#79AD66]"
          />

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
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto mt-14 max-w-[720px] border-t border-[#1F2A20]/10 pt-7 text-center lg:mt-16"
        >
          <p className="font-dm text-gray paragraph-body">
            Each phase builds on the last, turning small daily practices into
            lasting inner change.
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
        border border-[#DCE6D7]
        bg-white/90
        shadow-[0_18px_50px_rgba(39,63,34,0.06)]
        backdrop-blur-xl
        transition-all duration-500
        hover:border-[#B8D3AE]
        hover:shadow-[0_24px_65px_rgba(39,63,34,0.11)]
        ${mobile ? "p-6" : "mt-[58px] min-h-[390px] p-6"}
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

      {/* Number */}
      <span
        className="
          pointer-events-none absolute
          bottom-2 right-3
          select-none
          font-season-medium
          text-[100px] leading-none
          text-[#E4ECE0]/65
        "
      >
        {item.id}
      </span>

      <div className="relative z-10">
        {/* Top row */}
        <div className="flex items-center justify-between gap-3">
          <span
            className="
              inline-flex items-center
              rounded-full
              border border-[#BBD6B1]
              bg-[#F3F8F1]
              px-3 py-[7px]
              font-dm text-[9px]
              font-semibold uppercase
              tracking-[0.18em]
              text-[#649C52]
            "
          >
            {item.quarter}
          </span>

          <span className="font-dm text-[10px] uppercase tracking-[0.14em] text-[#969D94]">
            {item.duration}
          </span>
        </div>

        {/* Heading */}
        <div className="mt-6">
          <p className="font-dm text-[12px] uppercase tracking-[0.06em] text-[#80A775]">
            {item.label}
          </p>

          <h3
            className={`
              mt-2 font-season-medium text-[#202A21] text-[20px] font-smbold
            `}
          >
            {item.title}
          </h3>
        </div>

        {/* Description */}
        <p className="mt-2 font-dm text-[14px] text-[#70776F]">
          {item.description}
        </p>

        <div className="my-5 h-px w-full bg-gradient-to-r from-[#D7E4D2] to-transparent" />

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
              className="flex items-start gap-3 font-dm text-[12px] leading-5 text-[#5E665D]"
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
      <div
        className="
          absolute bottom-0 left-0
          h-[3px] w-full
          origin-left scale-x-0
          bg-gradient-to-r
          from-[#72A95E] to-transparent
          transition-transform duration-500
          group-hover:scale-x-100
        "
      />
    </motion.article>
  );
};

export default YearlyJourney;