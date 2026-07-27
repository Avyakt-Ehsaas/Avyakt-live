import React from "react";
import {
    Sunrise,
    Brain,
    Feather,
    Compass,
    CircleUserRound,
    Heart,
    Sparkles,
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
        title: "You stop overthinking every little thing.",
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
        title: "You seek less external validation.",
        desc: "Your sense of worth becomes less dependent on approval from others.",
    },
    {
        number: "06",
        icon: Heart,
        title: "You become more present with people you love.",
        desc: "You listen more deeply, react less quickly, and connect more honestly.",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
        },
    },
};

const pointVariants = {
    hidden: {
        opacity: 0,
        x: 35,
        y: 15,
    },
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function PersonYouBecomeSection() {
    return (
        <section className="relative overflow-hidden bg-white py-20 md:py-28 lg:py-32">
            {/* Background elements */}
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                        scale: [1, 1.08, 1],
                    }}
                    transition={{
                        duration: 11,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute left-[-180px] top-[10%] h-[420px] w-[420px] rounded-full bg-[#DDEED8]/45 blur-[120px]"
                />

                <motion.div
                    animate={{
                        x: [0, -25, 0],
                        y: [0, 25, 0],
                    }}
                    transition={{
                        duration: 13,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-[-120px] right-[-130px] h-[380px] w-[380px] rounded-full bg-[#E7F3E3]/70 blur-[120px]"
                />

                <div className="absolute left-[7%] top-0 h-full w-px bg-gradient-to-b from-transparent via-[#163F2C]/[0.06] to-transparent" />
            </div>

            <div className="relative z-10 mx-auto max-w-[1180px] px-5 md:px-8">
                <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
                    {/* Left content */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -45,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{
                            once: true,
                            amount: 0.25,
                        }}
                        transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="lg:sticky lg:top-28 lg:self-start"
                    >
                        <div className="mb-5 flex items-center gap-3">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 32 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.7,
                                    delay: 0.2,
                                }}
                                className="h-px bg-[#72B866]"
                            />

                            <p className="font-dm text-[12px] font-medium uppercase tracking-[0.24em] text-[#5D9F53] md:text-[13px]">
                                The Person You Become
                            </p>
                        </div>

                        <h2 className="max-w-[520px] font-season-medium text-[42px] leading-[1.03] tracking-[-0.035em] text-primary sm:text-[50px] md:text-[60px]">
                            The change is subtle.
                            <span className="block text-[#6BAC60]">
                                Until it becomes you.
                            </span>
                        </h2>

                        <p className="mt-7 max-w-[480px] font-dm text-[16px] leading-8 text-gray md:text-[18px]">
                            Around 30 days of consistent practice, meditation begins to feel
                            less like something you do and more like a different way of
                            living.
                        </p>

                        {/* 30-day identity circle */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.85,
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                duration: 0.75,
                                delay: 0.25,
                            }}
                            className="relative mt-10 flex h-[190px] w-[190px] items-center justify-center rounded-full border border-[#72B866]/20"
                        >
                            <motion.div
                                animate={{
                                    rotate: 360,
                                }}
                                transition={{
                                    duration: 18,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute inset-3 rounded-full border border-dashed border-[#72B866]/25"
                            />

                            <div className="text-center">
                                <p className="font-season-medium text-[48px] leading-none text-primary">
                                    30
                                </p>

                                <p className="mt-2 font-dm text-[11px] font-medium uppercase tracking-[0.22em] text-[#5D9F53]">
                                    Days inward
                                </p>
                            </div>
                        </motion.div>

                        <div className="mt-8 border-l border-[#72B866]/35 pl-5">
                            <p className="max-w-[360px] font-dm paragraph-body text-left text-primary">
                                Not a new personality.
                                <span className="text-[#69A85E]">
                                    {" "}
                                    A calmer version of the person already within you.
                                </span>
                            </p>
                        </div>
                    </motion.div>

                    {/* Right transformation timeline */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.12,
                        }}
                        className="relative"
                    >
                        {/* Vertical timeline */}
                        <div className="absolute left-[22px] top-8 hidden h-[calc(100%-64px)] w-px bg-gradient-to-b from-[#72B866]/10 via-[#72B866]/35 to-[#72B866]/10 sm:block" />

                        <div className="space-y-4 md:space-y-3">
                            {transformationPoints.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <motion.article
                                        key={item.title}
                                        variants={pointVariants}
                                        whileHover={{
                                            x: 6,
                                            transition: {
                                                duration: 0.25,
                                            },
                                        }}
                                        className="
group relative overflow-hidden
rounded-2xl
border border-[#163F2C]/10
bg-white
px-5 py-4
transition-all duration-500
hover:border-[#72B866]/25
hover:shadow-[0_14px_40px_rgba(32,75,45,0.08)]
"
                                    >
                                        {/* Timeline dot */}
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
                                                duration: 0.4,
                                                delay: index * 0.1,
                                            }}
                                            className="
                        absolute -left-[43px] top-1/2 hidden h-[12px] w-[12px]
                        -translate-y-1/2 rounded-full border-[3px]
                        border-white bg-[#72B866] shadow-[0_0_0_1px_rgba(114,184,102,0.22)]
                        sm:block
                      "
                                        />

                                        <div className="pointer-events-none absolute -right-12 -top-14 h-36 w-36 rounded-full bg-[#DCEED7]/25 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:bg-[#DCEED7]/45" />

                                        <div className="relative z-10 flex gap-4">
                                            <motion.div
                                                whileHover={{
                                                    rotate: 7,
                                                    scale: 1.08,
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                }}
                                                className="
                          flex h-10 w-10 shrink-0 items-center justify-center
                          rounded-[15px] border border-[#72B866]/15
                          bg-white shadow-[0_8px_24px_rgba(31,74,48,0.05)]
                        "
                                            >
                                                <Icon
                                                    size={21}
                                                    strokeWidth={1.6}
                                                    className="text-[#61A456]"
                                                />
                                            </motion.div>

                                            <div className="flex-1">
                                            
                                                    <span className="font-dm text-[11px] tracking-[0.16em] text-[#163F2C]/25">
                                                        {item.number}
                                                    </span>
                                               

                                                <h3 className="mt-2 font-season-medium caption-text text-primary">
                                                    {item.title}
                                                </h3>

                                                <p className="mt-1 max-w-[540px] font-dm text-gray paragraph-secondary text-left">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            className="
                        absolute bottom-0 left-0 h-[2px] w-0
                        bg-[#72B866] transition-all duration-500
                        group-hover:w-full
                      "
                                        />
                                    </motion.article>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* Closing line */}
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
                        duration: 0.75,
                    }}
                    className="mt-16 flex flex-col gap-4 border-t border-[#163F2C]/10 pt-7 sm:flex-row sm:items-center sm:justify-between lg:mt-20"
                >
                    <p className="max-w-[720px] font-dm paragraph-body text-primary">
                        One day, you notice that life is the same
                        <span className="text-[#68A85D]"> but you are responding differently.</span>
                    </p>

                    <motion.p
                        animate={{
                            opacity: [0.4, 0.8, 0.4],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="font-dm text-[12px] uppercase tracking-[0.18em] text-[#163F2C]/65"
                    >
                        Practice becomes identity
                    </motion.p>
                </motion.div>
            </div>

            {/* Section transition */}
            <div className="pointer-events-none absolute bottom-0 left-0 h-[80px] w-full bg-gradient-to-b from-transparent to-[#F6F9F4]/80" />
        </section>
    );
}