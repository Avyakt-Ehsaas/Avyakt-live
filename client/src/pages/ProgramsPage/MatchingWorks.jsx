import React from "react";
import Brain from "../../assets/images/brain.png"

import MeditationWork1 from "../../assets/Icons/MeditationWork1.png"
import MeditationWork2 from "../../assets/Icons/MeditationWork2.png"
import MeditationWork3 from "../../assets/Icons/MeditationWork3.png"
import MeditationWork4 from "../../assets/Icons/MeditationWork4.png"


const MatchingWorks = () => {
  const sessions = [
    {
      icon: MeditationWork2,
      title: "Letting go — a guided release",
      time: "10 min",
      tag: "Life Events",
    },
    {
      icon: MeditationWork3,
      title: "Sleep body scan",
      time: "20 min",
      tag: "Body & rest",
    },
    {
      icon: MeditationWork4,
      title: "4–7–8 sleep breath",
      time: "7 min",
      tag: "Breathwork",
    },
  ];

  const points = [
    {
      number: "01",
      title: "Context over category",
      desc: `Most apps sort by "guided", "breathwork", "body scan". We sort by what you're going through. Format is a secondary filter, not the entry point.`,
    },
    {
      number: "02",
      title: "Format adapts to intensity",
      desc: `Short sessions for immediate relief, longer ones for deeper processing.`,
    },
    {
      number: "03",
      title: "Structured progression",
      desc: `Build attention, emotional awareness, and resilience over time.`,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24 px-6">
      {/* Background Illustration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img src={Brain} alt="brainimage" className="w-full h-full object-contain" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <p className="text-greenbase font-dm text-medium text-[14px] md:text-[20px] tracking-widest uppercase mb-6 md:mb-0 ">
            How Matching Works
          </p>

          <h2 className="px-12 md:px-0 heading-main font-semibold text-primary font-season-med">
            You tell us where you are.
            <br />
            We find what fits.
          </h2>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Card */}
          <div className="bg-white border border-greenbase rounded-[50px] p-8 shadow-sm max-w-[580px]">
            
            {/* User Text */}
            <div className="flex items-start gap-2">
              <div className="w-8 h-10 rounded-full flex items-center justify-center text-xl">
                <img src={MeditationWork1} alt="icons" className="mt-6" />
              </div>

              <div>
                <p className="text-primary card-title font-dm font-med ">You say:</p>

                <h3 className="text-primary font-dm card-title font-med">
                  I'm going through a breakup and can't sleep
                </h3>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-[1px] bg-[#706E6E]" />
              <span className="font-dm paragraph-body text-gray ">
                Context Matching
              </span>
              <div className="flex-1 h-[1px] bg-[#706E6E]" />
            </div>

            {/* Sessions */}
            <div className="text-greenbase font-dm paragraph-secondary text-left my-3">YOUR SUGGESTED PATH</div>
            <div className="space-y-6">
              {sessions.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img src={item.icon} alt={item.title} className="mt-1" />
                    {/* <div className="text-xl">{item.icon}</div> */}

                    <h4 className="text-primary caption-text font-med font-dm ">
                      {item.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="paragraph-secondary font-dm text-primary ">
                      {item.time}
                    </span>

                    <span className="bg-[#C2E0BA33] text-greenbase paragraph-secondary font-dm px-4 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-4">
            {points.map((item, index) => (
              <div key={index} className="flex gap-6">
                
                {/* Number */}
                <div className="heading-large text-greenbase font-season-medium font-med mt-10">
                  {item.number}
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-primary font-dm card-title font-med">
                    {item.title}
                  </h3>

                  <p className="text-gray paragraph-body text-left  font-dm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default MatchingWorks;