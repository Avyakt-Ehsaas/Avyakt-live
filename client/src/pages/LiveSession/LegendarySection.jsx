import React from "react";
import { Crosshair, Flower, PersonStanding } from "lucide-react";
import LegendSleep from "../../assets/Icons/LegendSleep.png"
import Group from "../../assets/Icons/Group.png"
import Lotus from "../../assets/Icons/Lotus.png"
import Aim from "../../assets/Icons/Aim.png"

const cards = [
  {
     label: "Unlocks · Week 3",
    icon: LegendSleep,
    hoverKey : "FOCUS · SHARPENED",
    hoverTitle: "Attention Ninja",
    hoverDesc:
      "Your mind stays where you put it. Distractions still arrive — but they no longer win.",
    keyPoints: ["Sustained concentration", "Fewer intrusive thoughts", "Decisions come quicker", "Present in conversation"], 
  },
  {
    label: "Unlocks · Month 2",
    icon: Aim,
     hoverKey : "SLEEP · RESTORED",
    hoverTitle: "The Sleep Sage",
    hoverDesc:
      "You've stopped fighting the night. Sleep arrives without the wrestling match.",
    keyPoints: ["Falls asleep with ease", "Night anxiety loosens", "Wakes less wired", "First mood shifts"], 
  },
  {
    label: "Unlocks · Month 6",
    icon: Group,
    hoverKey : "EMOTIONS · MASTERED",
    hoverTitle: "Zen Warrior",
    hoverDesc:
      "You still feel everything. But you're no longer at the mercy of it.",
    keyPoints: ["Anger arises and passes", "Stress recovery is fast", "Responds, doesn't react", "Stable under pressure"], 
  },
  {
    label: "Unlocks · Month 12",
    icon: Lotus,
    hoverKey : "STILLNESS · EMBODIED",
    hoverTitle: "Calm Character",
    hoverDesc:
      "This is no longer something you do. It is who you are. People notice before you say a word.",
    keyPoints: ["Calm is the default state", "Gratitude is spontaneous", "Presence without effort", "The practice is the person"], 
  },
];

export default function LegendarySection() {
  return (
    <section className="bg-[#C2E0BA33] px-6 py-24">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-16 lg:grid-cols-[420px_1fr]">
        {/* Left Content */}
        <div>
          <p className="text-greenbase font-dm text-[14px] md:text-[20px] tracking-widest mb-2 uppercase">
            What Consistent Practice Builds
          </p>

          <h2 className="font-season-medium text-primary heading-main text-left mb-2">
            Every session is whole.
            <br />
            Time makes you legendary.
          </h2>

          <p className="max-w-[440px] text-gray font-dm paragraph-body text-left">
            Join any night. There is no starting point you've missed. Show up
            consistently, and the practice builds a new version of you. These
            are the characters you unlock.
          </p>
        </div>

        {/* Right Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {cards.map((card, index) => (
            <HoverCard key={index} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HoverCard({ card }) {
  return (
    <div className="group relative h-[300px] overflow-hidden rounded-[18px] bg-[#C2E0BA33] p-8 ">
      {/* Default Content */}
      <div className="absolute inset-0 p-8 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
       
          <div className="flex h-full flex-col items-center justify-center">
            <p className="text-greenbase font-dm caption-text mb-4 font-smbold ">
              {card.label}
            </p>

            <div className="flex h-[105px] w-[105px] items-center justify-center rounded-full bg-[#6EAD5F] transition-all duration-500 group-hover:bg-white/20">
              {/* <Icon
                size={48}
                strokeWidth={2.3}
                className="text-white"
              /> */}
              <img src={card.icon} alt="" />
            </div>
          </div>
      </div>

      {/* Hover Content */}
      <div className="absolute inset-0 flex translate-y-5 flex-col justify-center p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-greenbase font-dm paragraph-secondary mb-2 uppercase text-left">
          {card.hoverKey}
        </p>

        <h3 className="text-primary font-season-medium heading-large font-med mb-2 text-left">
          {card.hoverTitle}
        </h3>

        <p className="max-w-[240px] text-primary font-dm body-secondary text-left mb-2">
          {card.hoverDesc}
        </p>

           <ul className="list-disc pl-5 space-y-1">
            {card.keyPoints.map((point, index) => (
              <li key={index} className="text-primary font-dm paragraph-secondary text-left">
                {point}
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
}      
