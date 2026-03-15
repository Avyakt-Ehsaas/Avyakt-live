import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



gsap.registerPlugin(ScrollTrigger);

const System = ({data}) => {
    const sectionRef = useRef(null);
    const cards = useRef([]);

    const bgColors = [
        "#DDF4D7",
        "#CBEBC3",
        "#B6E2AA",
        "#8FC580",
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
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    cards.current.forEach((card, i) => {
      if (i === 0) return;

      tl.to(
        card,
        {
          y: -i * 220,
          ease: "none",
        },
        i * 0.3
      );
    });

  }, sectionRef);

  // 🔥 force refresh after layout
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);

  return () => ctx.revert();
}, []);

    return (
        <section
            ref={sectionRef}
            className="relative  overflow-hidden"
        >
            <div className="absolute inset-0 -z-10 bg-center bg-cover bg-no-repeat system-image max-h-[600px]" />

            <div className="absolute inset-0 -z-10 bg-white/60 backdrop-blur-[2px]" />

            <div className="max-w-7xl mx-auto grid grid-cols-2 gap-24 pt-32">

                <div className="sticky top-40  left-10 h-fit">
                    <h2 className="text-4xl w-lg font-semibold leading-[50px] font-season text-primary">
                      {data.title} <span className="text-greenbase">{data.greenTitle}</span> 
                        {data.postTitle}
                    </h2>

                    <p className="mt-2 text-primary text-lg max-w-2xl font-dm">
                        {data.description}
                    </p>
                </div>

                <div className="relative h-[600px]">

                    {data.cards.map((card, idx) => (
                        <div
                            key={idx}
                            ref={(el) => (cards.current[idx] = el)}
                            className={`absolute w-[360px] h-[230px] p-6 rounded-lg shadow-xl `}
                            style={{ top: `${idx * 240}px`, backgroundColor: bgColors[idx] }}
                        >
                            <img
                                src={card.image}
                                alt="card icon"
                                className="inline-block size-14 rounded-full"
                            />

                            <h3 className="text-xl font-medium font-season mt-4 text-primary">
                                {card.cardTitle}
                            </h3>

                            <p className="text-[15px] mt-3  font-dm text-primary">
                                {card.cardDescription}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default System;
