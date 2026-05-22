import React, { useEffect, useState } from "react";
import Schools from "../../assets/images/Schools.png";
import Individual from "../../assets/images/Individual.png";
import Employees from "../../assets/images/Employees.png";
import Seniors from "../../assets/images/Seniors.png";


const cards = [
  {
    title: "Students",
    desc: "Enhance academic performance through improved focus, reduced exam anxiety, and better memory retention.",
    img: Schools,
  },
  {
    title: "Professionals",
    desc: "Build calm productivity, emotional balance, and deeper clarity during demanding workdays.",
    img: Employees,
  },
  {
    title: "Parents",
    desc: "Create patience, presence, and mindful responses for everyday family life.",
    img: Individual,
  },
  {
    title: "Seniors",
    desc: "Support emotional well-being, peaceful sleep, and gentle mental clarity.",
    img: Seniors,
  },
];

export default function BenefitsStageLife() {
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setLeaving(true);

      setTimeout(() => {
        setActive((prev) => (prev + 1) % cards.length);
        setLeaving(false);
      }, 650);
    }, 2600);

    return () => clearInterval(timer);
  }, []);

  const getCardIndex = (index) => {
    return (index - active + cards.length) % cards.length;
  };

  return (
    <section className="min-h-screen bg-white flex items-center overflow-hidden px-6 py-30">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-20 lg:grid-cols-[0.9fr_1.2fr]">
        <div>
          <p className="text-greenbase font-dm text-[14px] md:text-[20px] tracking-widest mb-2 uppercase">
            Tailored Stillness
          </p>

          <h2 className="font-season-medium text-primary heading-main text-left mb-2">
            Benefits for every stage of life
          </h2>

          <p className="text-gray font-dm paragraph-body text-left">
            Different contexts need different content, and different
            credentials. Each category has its own library, its own structure,
            and its own community.
          </p>
        </div>

        <div className="relative h-[430px] w-full">
          <div className="relative h-[395px] w-[520px]">
            {cards.map((card, index) => {
              const pos = getCardIndex(index);
              const isFront = pos === 0;

              return (
                <div
                  key={card.title}
                  className={`absolute inset-0 overflow-hidden rounded-[14px] shadow-[0_22px_50px_rgba(0,0,0,0.22)] transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
                    isFront && leaving ? "card-leave" : ""
                  }`}
                  style={{
                    zIndex: cards.length - pos,
                    transform:
                      pos === 0
                        ? "translateX(0px) translateY(0px) scale(1) rotate(0deg)"
                        : pos === 1
                        ? "translateX(-34px) translateY(18px) scale(0.95) rotate(-2deg)"
                        : pos === 2
                        ? "translateX(-64px) translateY(36px) scale(0.9) rotate(-4deg)"
                        : "translateX(-90px) translateY(54px) scale(0.85) rotate(-6deg)",
                    opacity: pos > 3 ? 0 : 1,
                    filter: pos === 0 ? "blur(0px)" : "blur(2px)",
                  }}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute bottom-7 left-7 right-7 text-white">
                    <h3 className="font-serif text-[28px] leading-none">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-6">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .card-leave {
          transform: translateX(70px) translateY(-95px) scale(1.05) rotate(7deg) !important;
          opacity: 0 !important;
          filter: blur(3px) !important;
        }
      `}</style>
    </section>
  );
}