import React from "react";
import AboutMeditationSection from '../../assets/images/AboutMeditationSection.png'

export default function MeditationSection() {


    const cardsData = [
        {
            title: "Practice without awareness is no improvement.",
            description: `If you don’t know what your attention is doing, where it goes, what triggers it, how long it actually holds, you have no way to know if anything is changing. You’re sitting, but you’re not training. Awareness of your own mind is not a side effect of meditation. It’s the point.`,
        },
        {
            title: "Practice without structure is blind faith.",
            description: `A random collection of sessions doesn’t build a skill. Week one should lay a foundation. Week three should build on it. Week six should feel measurably different from week one. Without progression and sequencing, you’re not developing, you’re repeating. Repetition without direction is not a practice. It’s a habit with no destination.`,
        },
        {
            title: "Practice without scientific knowledge is still just belief.",
            description: `When you understand what the prefrontal cortex does, why cortisol spikes under chronic stress, how the amygdala fires before you even consciously decide to react — meditation stops being a ritual and becomes training. You stop following instructions on faith and start working with your brain. That shift changes everything about how consistently people practice.`,
        },
    ];

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center py-16 sm:py-20 md:py-24 lg:py-28">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center "
                style={{
                    backgroundImage:
                        `url('${AboutMeditationSection}')`,
                }}
            />
            {/* Overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 15%, rgba(255,255,255,0.6) 35%, rgba(255,255,255,0) 80%)",
                }}
            />


            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 text-center">
                {/* Heading */}
                <p className="text-greenbase text-[14px] md:text-[16px] font-season tracking-[0.2em] font-semibold mb-3 sm:mb-4">
                    WHAT WE BELIEVE
                </p>

                <h1 className="font-season-medium text-primary leading-[28px] md:leading-[40px] mb-4 sm:mb-6
          text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                    Meditation is often suggested as the answer. It can work. But most
                    people try it for a few days, see no clear progress, and stop. That’s
                    not a failure of meditation, it’s a failure of
                    <span className="text-greenbase"> method.</span>
                </h1>


                <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
                    {cardsData.map((card, index) => (
                        <InfoCard
                            key={index}
                            title={card.title}
                            description={card.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}


const InfoCard = ({ title, description }) => {
    return (
        <div className="bg-white/99 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-md p-4 md:p-5 text-left">
            <h3 className="text-greenbase font-dm font-semibold text-sm mb-2">
                {title}
            </h3>
            <p className="text-primary font-dm text-[14px] leading-relaxed">
                {description}
            </p>
        </div>
    );
};