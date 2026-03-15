import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import brainIcon from "../../assets/brainicon.png";
import graph from "../../assets/graph.png";
import watch from "../../assets/watch.png";
import wyoga from "../../assets/wyoga.png";


gsap.registerPlugin(ScrollTrigger);

const System = () => {
    const sectionRef = useRef(null);
    const cards = useRef([]);

    const bgColors = [
        "#DDF4D7",
        "#CBEBC3",
        "#B6E2AA",
        "#8FC580",
    ];

    const cardData = [
        {
            title: "Neuroscience-Inspired Meditation Experience",
            desc: "Guided practices built on how the brain regulates attention, emotions, and stress.",
            icon: brainIcon,
        },
        {
            title: "Live Meditation Workshops",
            desc: "Structured group sessions designed to build focus and emotional balance.",
            icon: wyoga,
        },
        {
            title: "Personalized Trackers",
            desc: "Track progress and develop consistent mindfulness habits.",
            icon: graph,
        },
        {
            title: "Community Support",
            desc: "A supportive environment for growth and shared learning.",
            icon: watch,
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=1500",
                    scrub: true,
                    pin: true,
                },
            });

            cards.current.forEach((card, i) => {
                if (i === 0) return;

                tl.to(
                    card,
                    {
                        y: -i * 220,
                        ease: "none",
                        boxShadow: 'shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'
                    },
                    i * 0.3
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen overflow-hidden"
        >
            <div className="absolute inset-0 -z-10 bg-center bg-cover bg-no-repeat system-image max-h-[600px]" />

            <div className="absolute inset-0 -z-10 bg-white/60 backdrop-blur-[2px]" />

            <div className="max-w-7xl mx-auto grid grid-cols-2 gap-24 pt-32">

                <div className="sticky top-40 h-fit">
                    <h2 className="text-4xl font-semibold leading-tight">
                        A <span className="text-green-600">Structured System</span> —
                        <br />
                        Not Just Random Sessions
                    </h2>

                    <p className="mt-4 text-gray-700 max-w-md">
                        Avyakt Student Programs are built on three integrated pillars:
                    </p>
                </div>

                <div className="relative h-[600px]">

                    {cardData.map((card, idx) => (
                        <div
                            key={idx}
                            ref={(el) => (cards.current[idx] = el)}
                            className={`absolute w-[380px] h-[220px] p-6 rounded-lg shadow-xl`}
                            style={{ top: `${idx * 240}px`, backgroundColor: bgColors[idx] }}
                        >
                            <img
                                src={card.icon}
                                alt=""
                                className="inline-block size-14 rounded-full ring-white outline -outline-offset-1 outline-black/5"
                            />

                            <h3 className="text-xl font-semibold mt-4">
                                {card.title}
                            </h3>

                            <p className="text-sm mt-3">
                                {card.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default System;