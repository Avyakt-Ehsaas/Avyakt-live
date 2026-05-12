import React from "react";
import AboutMeditationSection from '../../assets/images/AboutMeditationSection.png'

export default function MeditationSection() {


    const cardsData = [
        {
            title: "Practice without awareness is no improvement.",
            description: `If you don’t know what your attention is doing, where it goes or how long it stays, you can’t measure change. Awareness isn’t a byproduct. It’s the practice.`,
        },
        {
            title: "Practice without structure is blind faith.",
            description: `Random sessions don’t build skill. Without progression, you’re repeating, not improving.`,
        },
        {
            title: "Practice without scientific knowledge is still just belief.",
            description: `Understanding how your brain works turns meditation from ritual into training. You stop following blindly and start improving deliberately.`,
        },
    ];

    return (
        <section className="relative w-full  md:min-h-[125vh] py-10">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center "
                style={{
                    backgroundImage:
                        `url('${AboutMeditationSection}')`,
                    backgroundPosition: "center 100%",
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
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 text-center lg:mt-[8rem]">
                {/* Heading */}
                <p className="text-greenbase font-dm text-medium text-[14px] md:text-[20px] tracking-widest uppercase mb-6 md:mb-3">
                    WHAT WE BELIEVE
                </p>

                <h1 className="font-season-medium text-primary leading-[36px] md:leading-[40px] mb-4 sm:mb-6
            heading-main font-med">
                    Meditation works, but the approach often doesn’t.
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
        <div className="bg-white/99 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-md p-4 text-left">
            <h3 className="text-greenbase card-title font-dm font-med ">
                {title}
            </h3>
            <p className="text-primary font-dm paragraph-secondary text-left leading-relaxed">
                {description}
            </p>
        </div>
    );
};