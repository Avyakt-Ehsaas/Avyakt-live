import React from "react";
import AboutStage1 from "../../assets/images/AboutStage0.png"
import AboutStage2 from "../../assets/images/AboutStage1.png"
import AboutStage3 from "../../assets/images/AboutStage2.png"
import AboutStage4 from "../../assets/images/AboutStage3.png"



const stages = [
  {
    title: "Schools",
    description:
      "Programs that help students understand their mind and build attention habits early.",
    image: AboutStage1,
  },
  {
    title: "Workplaces",
    description:
      "Structured sessions that support focus, stress management, and sustained attention.",
    image: AboutStage2,
  },
  {
    title: "Individuals",
    description:
      "Personal practice for anyone building a consistent meditation habit.",
    image: AboutStage3
  },
  {
    title: "Senior Communities",
    description:
      "Accessible sessions designed for emotional wellbeing and cognitive engagement.",
    image: AboutStage4
  },
];

export default function StagesOfLife() {
  return (
    <section className="relative bg-white py-[100px] px-4 overflow-hidden min-h-screen flex items-center justify-center">

      {/* ✅ Grid Background */}
      <div className="absolute inset-0 grid-pattern grid-fade-top pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto text-center">

        {/* Heading */}
        <h1 className="text-4xl md:text-[56px] 2xl:text-[64px] md:leading-[50px] font-season-medium text-primary">
          Built for different{" "}
          <span className="text-greenbase">stages of life</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-2 md:mt-6 text-[18px] 2xl:text-xl text-primary font-dm max-w-[900px] mx-auto leading-[30px]">
          Avyakt adapts the same core approach, understanding + daily practice — to different environments.
        </p>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[24px]">
          {stages.map((item, index) => (
            <div
              key={index}
              className="bg-[#C2E0BA44] rounded-[20px] p-[24px] text-left hover:shadow-md transition"
            >
              {/* Image */}
              <div className="w-[64px] h-[64px] rounded-full overflow-hidden mb-[8px] md:mb-[16px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <h3 className="text-[20px] font-dm font-semibold text-primary leading-[28px] md:leading-[40px]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] md:text-[16px] text-primary font-dm leading-[24px] md:leading-[28px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}