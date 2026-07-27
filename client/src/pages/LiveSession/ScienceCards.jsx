import React from "react";
import {
  Focus,
  HeartPulse,
  Pause,
  Activity,
  MoonStar,
  Network,
  ArrowUpRight,
} from "lucide-react";

import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const scienceCards = [
  {
    number: "01",
    icon: Focus,
    title: "Attention Network",
    duration: "13 min/day",
    desc: "Strengthens the brain's attention networks, improving focus, working memory and reducing mind wandering.",
    research: "Dr. Amishi Jha • Wendy Suzuki",
  },
  {
    number: "02",
    icon: HeartPulse,
    title: "Emotional Brain",
    duration: "10–20 min/day",
    desc: "Reduces amygdala reactivity while strengthening prefrontal control, helping you stay calm under pressure.",
    research: "Sara Lazar • Richard Davidson",
  },
  {
    number: "03",
    icon: Pause,
    title: "Response Control",
    duration: "10–15 min/day",
    desc: "Strengthens inhibitory control, creating a mental pause between an impulse and your response.",
    research: "Numerous mindfulness & cognitive control studies",
  },
  {
    number: "04",
    icon: Activity,
    title: "Stress & Recovery",
    duration: "10–20 min/day",
    desc: "Lowers physiological stress, supporting healthier cortisol regulation and faster recovery from daily pressure.",
    research: "Jon Kabat-Zinn • MBSR Research",
  },
  {
    number: "05",
    icon: MoonStar,
    title: "Sleep System",
    duration: "10–20 min/day",
    desc: "Calms mental hyperarousal, helping you fall asleep more easily and improving sleep quality.",
    research: "JAMA Internal Medicine Mindfulness Trials",
  },
  {
    number: "06",
    icon: Network,
    title: "Brain Plasticity",
    duration: "~8 Weeks",
    desc: "Increases gray matter in regions involved in learning, memory and self-awareness while reducing stress-related brain changes.",
    research: "Sara Lazar (Harvard)",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -45,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 45,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardsContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardAnimation = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function ScienceCard({ item }) {
  const Icon = item.icon;

  return (
    <motion.article
      variants={cardAnimation}
      whileHover={{
        y: -8,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      }}
      className="
        group relative flex h-full min-h-[360px] flex-col overflow-hidden
        rounded-[24px] border border-[#163F2C]/[0.08] bg-white
        p-6 transition-all duration-500
        hover:border-[#72B866]/30
        hover:shadow-[0_24px_60px_rgba(31,74,48,0.10)]
        lg:p-7
      "
    >
      {/* Animated background glow */}
      <motion.div
        className="
          pointer-events-none absolute -right-16 -top-16
          h-40 w-40 rounded-full bg-[#CDE8C6]/35 blur-3xl
        "
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top */}
      <div className="relative z-10 flex items-start justify-between">
        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.08,
          }}
          className="
            flex h-12 w-12 items-center justify-center
            rounded-[16px]
            border border-[#72B866]/15
            bg-[#F2F8F0]
            transition-all duration-300
            group-hover:bg-[#EAF5E7]
          "
        >
          <Icon
            size={21}
            strokeWidth={1.7}
            className="text-[#5DA652]"
          />
        </motion.div>

        <span className="font-dm text-[12px] font-medium tracking-[0.18em] text-[#163F2C]/35">
          {item.number}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-3 flex-1">
        <h3 className="font-season font-smbold card-title  text-primary">
          {item.title}
        </h3>

        {/* Duration */}
        <div className="mt-2 inline-flex items-center rounded-full bg-[#EEF7EB] px-4 py-2">
          <span className="font-dm text-[12px] font-med uppercase tracking-wide text-[#5DA652]">
            {item.duration}
          </span>
        </div>

        {/* Description */}
        <p className="mt-2 font-dm paragraph-secondary text-left text-gray">
          {item.desc}
        </p>
      </div>

      {/* Research */}
      <div className="relative z-10 mt-2 border-t border-[#163F2C]/10 pt-5">
        <p className="font-dm text-[12px] font-semibold uppercase tracking-[0.2em] text-[#5DA652]">
          Research
        </p>

        <p className="mt-2 font-dm text-base text-left text-[#163F2C]/70">
          {item.research}
        </p>
      </div>

      {/* Hover Line */}
      <div
        className="
          absolute bottom-0 left-0 h-[3px] w-0
          bg-[#72B866]
          transition-all duration-500
          group-hover:w-full
        "
      />
    </motion.article>
  );
}

export default function ScienceSection() {
  return (
    <section className="relative overflow-hidden bg-[#F6F9F4] py-20 lg:py-28 ">
      {/* Animated decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, -25, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-160px] top-20 h-[360px] w-[360px] rounded-full bg-[#C9E5C3]/25 blur-[110px]"
        />

        <motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 30, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-[-140px] h-[420px] w-[420px] rounded-full bg-[#DDEDD8]/40 blur-[120px]"
        />

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 0.35,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 1.2,
          }}
          className="
            absolute inset-0
            [background-image:linear-gradient(rgba(22,63,44,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(22,63,44,0.035)_1px,transparent_1px)]
            [background-size:70px_70px]
          "
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1180px] px-5 md:px-8">
        {/* Header */}
        <div className="grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
          >
            <div className="mb-5 flex items-center gap-3">
              <motion.span
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: 32,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                }}
                className="h-px bg-[#72B866]"
              />

              <p className="font-dm text-[12px] font-medium uppercase tracking-[0.24em] text-[#5D9F53] md:text-[13px]">
                The Science of Sitting Still
              </p>
            </div>

            <h2 className="max-w-[650px] font-season-medium text-[40px] leading-[1.04] tracking-[-0.03em] text-primary sm:text-[48px] md:text-[58px]">
              Stillness changes how your brain responds.
            </h2>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className="max-w-[520px] lg:ml-auto"
          >
            <p className="font-dm text-[16px] leading-8 text-gray md:text-[18px]">
              Meditation is not simply about feeling relaxed. Consistent
              practice trains the neural systems behind attention, emotional
              balance, recovery, sleep and conscious decision-making.
            </p>

            <div className="mt-7 flex items-center gap-4 border-t border-[#163F2C]/10 pt-5">
              <div className="flex -space-x-2">
                {[Focus, HeartPulse, Network].map((Icon, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -15,
                      scale: 0.7,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: 0.55 + index * 0.12,
                    }}
                    whileHover={{
                      y: -5,
                      scale: 1.08,
                      zIndex: 10,
                    }}
                    className="
                      flex h-9 w-9 items-center justify-center
                      rounded-full border-2 border-[#F6F9F4]
                      bg-white shadow-sm
                    "
                  >
                    <Icon
                      size={14}
                      strokeWidth={1.7}
                      className="text-[#65A95A]"
                    />
                  </motion.div>
                ))}
              </div>

              <motion.p
                variants={fadeUp}
                className="font-dm text-[13px] leading-5 text-[#163F2C]/60"
              >
                Six interconnected systems.
                <br />
                One daily practice.
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Desktop cards */}
        <motion.div
          variants={cardsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="mt-16 hidden grid-cols-2 gap-5 md:grid lg:mt-20 lg:grid-cols-3"
        >
          {scienceCards.map((item) => (
            <ScienceCard key={item.title} item={item} />
          ))}
        </motion.div>

        {/* Mobile swiper */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="mt-12 md:hidden"
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1.08}
            spaceBetween={14}
            centeredSlides={false}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2800,
              disableOnInteraction: false,
            }}
            loop
            className="science-swiper !overflow-visible !pb-14"
          >
            {scienceCards.map((item) => (
              <SwiperSlide key={item.title} className="h-auto">
                <ScienceCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Bottom statement */}
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
            amount: 0.5,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-12 flex flex-col gap-4
            border-t border-[#163F2C]/10 pt-7
            sm:flex-row sm:items-center sm:justify-between
            lg:mt-16
          "
        >
          <p className="max-w-[700px] font-season-medium text-[20px] leading-8 text-primary md:text-[24px]">
            The brain changes through repetition, not intensity.
          </p>

          <motion.p
            animate={{
              opacity: [0.45, 0.8, 0.45],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="font-dm text-[13px] uppercase tracking-[0.16em] text-[#163F2C]/65"
          >
            A few minutes. Practised daily.
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom transition */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[80px] w-full bg-gradient-to-b from-transparent to-white/80" />

      <style jsx>{`
        .science-swiper .swiper-pagination {
          bottom: 0 !important;
          text-align: left;
          padding-left: 4px;
        }

        .science-swiper .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          margin: 0 4px !important;
          background: #a9cfa2;
          opacity: 0.55;
          transition: all 0.3s ease;
        }

        .science-swiper .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 999px;
          background: #62a657;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}