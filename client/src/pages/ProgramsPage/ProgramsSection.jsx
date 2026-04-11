import React, { useEffect, useRef } from "react";
import Card from "./Card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProgramsSection({ program = [] }) {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        if (!program.length) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: `+=${program.length * 700}`,
                    scrub: true,
                    pin: true,
                },
            });

            cardsRef.current.forEach((card, i) => {
                if (i === 0) return;

                tl.to(
                    card,
                    {
                        y: -i * 540,
                        ease: "none",
                    },
                    i * 0.3
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [program]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen py-24"
        >
            <div
                className="max-w-6xl mx-auto px-4 py-20 relative min-h-full">
                {program.map((p, index) => (
                    <div
                        key={index}
                        ref={(el) => (cardsRef.current[index] = el)}
                        className="absolute w-full"
                        style={{
                            top: `${index * 600}px`,
                        }}
                    >
                        <Card
                            badge={p.weeks}
                            title={p.title}
                            description={p.subtitle}
                            list={p.activities}
                            chips={p.tags}
                            image={p.image}
                            imageSide={index % 2 === 0 ? "right" : "left"}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}