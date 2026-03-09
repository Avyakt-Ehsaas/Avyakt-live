import React from "react";

import TreeLeft from "../../assets/images/treeleft.png";
import TreeCenter from "../../assets/images/treemiddle.png";
import TreeRight from "../../assets/images/treeright.png";

function ProgramGrowth() {
  const programs = [
    {
      icon: TreeLeft,
      title: "Foundations (6–9 Years)",
      desc: "Playful stories and breathing games that build early calm, focus, and emotional awareness.",
      tags: ["Foundations", "Body awareness", "Emotional Expression"],
    },
    {
      icon: TreeCenter,
      title: "Growth (10–14 Years)",
      desc: "Guided meditation and brain-based activities that strengthen attention and emotional regulation.",
      tags: ["Focus building", "Stress awareness", "Habit formation"],
    },
    {
      icon: TreeRight,
      title: "Mastery (15–18 Years)",
      desc: "Advanced focus training and stress control for exam readiness and performance.",
      tags: ["Sustained focus", "Anxiety control", "Performance readiness"],
    },
  ];

  return (
    <div className="mt-30 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#9ca3af12_1px,transparent_1px),linear-gradient(to_bottom,#9ca3af12_1px,transparent_1px)] bg-[size:60px_60px]" />
      <section className="w-full py-24 flex flex-col items-center px-6">

        {/* Heading */}
        <div className="flex flex-col items-center gap-6 max-w-7xl">
          <h1 className="font-[580] text-[56px] font-season-medium text-center leading-[50px]">
            Designed for{" "}
            <span className="text-greenbase">Every Stage</span> of a Student’s Growth
          </h1>

          <p className="text-center font-dm text-[20px] text-primary leading-[30px] max-w-5xl" style={{ fontWeight: 500 }}>
            Each program adapts meditation practices, activities, and cognitive
            experiments to match <br />how children think, feel, and learn at different
            ages.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-7 max-w-7xl w-full">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-[#C2E0BA33] p-8 rounded-3xl flex flex-col gap-[0.5px] shadow-sm"
            >
              {/* Icon */}
              <div className="bg-white rounded-full w-[100px] h-[100px] flex items-center justify-center relative z-10">
                <img src={program.icon} alt={program.title} className="" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold font-dm text-[22px]">
                {program.title}
              </h3>

              {/* Description */}
              <p className="text-primary text-[16px] font-dm">
                {program.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-3">
                {program.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-greenbase-primary text-white px-4 py-2 rounded-full text-medium font-dm "
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}

export default ProgramGrowth;