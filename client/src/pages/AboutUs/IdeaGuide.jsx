import React from "react";
import AboutPillars from '../../assets/images/AboutPillars.png';

export default function IdeaGuide() {

  const ideas = [
    {
      title: "A little every day beats a lot once in a while",
      description:
        "Short daily practice creates deeper change than occasional long sessions.",
    },
    {
      title: "Notice before you fix",
      description:
        "Understanding how your mind works comes before trying to control it.",
    },
    {
      title: "Experience teaches best",
      description:
        "Participants observe their own attention and discover patterns through practice.",
    },
    {
      title: "Same foundation, different lives",
      description:
        "Students, professionals, and seniors follow the same approach, adapted to their context.",
    },
  ];

  return (
    <div className="relative bg-white overflow-hidden min-h-screen">
        
     <div className="relative">
            <img src={AboutPillars} alt="programbg" className='h-24 w-full' /> 
              <div className="absolute inset-0 pointer-events-none 
        bg-gradient-to-b from-transparent via-white/60 to-[#FAFAFA]" />
            </div>

      <div className="flex justify-center items-center px-4 py-12">
        <div className="absolute inset-0 grid-pattern grid-fade-top pointer-events-none z-0" />

      <div className="max-w-5xl w-full text-center">
        
        <h1 className="text-4xl md:text-[56px] font-semibold text-primary font-season-medium mb-4 md:mb-6">
          Four ideas guide everything we build.
        </h1>

        <p className="text-primary font-dm text-base md:text-[20px] md:leading-[30px] max-w-[6xl] mx-auto mb-8">
          Avyakt combines two things most meditation programs keep separate: practice and understanding.
          We explain how attention works, how emotions show up in the body, and why consistency matters more than long sessions. 
          With that understanding, meditation becomes a simple daily practice you can improve over time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ideas.map((idea, index) => (
            <div
              key={index}
              className="bg-[#C2E0BA44] rounded-2xl p-4 md:p-6 shadow-sm text-left"
            >
              <h3 className="text-greenbase text-[20px] font-dm font-medium md:font-semibold mb-2 leading-[30px]">
                {idea.title}
              </h3>
              <p className="font-dm text-primary text-base md:text-[18px] leading-[24px] md:leading-[30px]">{idea.description}</p>
            </div>
          ))}
        </div>

      </div></div>
      
    </div>
  );
}