import React from "react";
import { Brain, Link2, Shield, Eye, Timer, Heart } from "lucide-react";

const scienceCards = [
  {
    icon: Brain,
    title: "Focus & memory",
    desc: "13 minutes daily enhanced sustained attention and working memory after just 8 weeks.",
  },
  {
    icon: Link2,
    title: "Emotional regulation",
    desc: "Meditation reduces amygdala reactivity, the brain's alarm system, making you less triggered.",
  },
  {
    icon: Shield,
    title: "Immune resilience",
    desc: "Personal practice built around your life, your emotions, and your pace.",
  },
  {
    icon: Eye,
    title: "Self-Awareness",
    desc: "Improved meta-consciousness allows you to observe thoughts without being consumed by them.",
  },
  {
    icon: Timer,
    title: "Impulse Control",
    desc: "Consistent practice builds the cognitive ‘gap’ between a stimulus and your response.",
  },
  {
    icon: Heart,
    title: "Gratitude",
    desc: "Rewiring the brain's reward centers to notice and appreciate the present moment more clearly.",
  },
];

export default function ScienceSection() {
  return (
    <section className="relative min-h-screen bg-[#C2E0BA33] py-24 lg:pb-36">

    

      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-greenbase font-dm text-[14px] md:text-[20px] tracking-widest mb-2 uppercase">
            The Science of Sitting Still
          </p>

          <h2 className="px-2 md:px-0 font-season-medium text-primary heading-main">
            What a few minutes a day actually does
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {scienceCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-[14px] bg-white px-6 py-6 shadow-[0_12px_35px_rgba(0,0,0,0.10)]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-[7px] bg-[#C2E0BA33]">
                  <Icon size={16} strokeWidth={1.8} className="text-[#72B866]" />
                </div>
 
                <h3 className="text-primary font-season-medium card-title text-left font-smbold">
                  {item.title}
                </h3>

                <p className="text-gray font-dm paragraph-secondary text-left">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

       <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-[80px] w-full bg-gradient-to-b from-transparent via-white/80 to-white" />
    </section>
  );
}