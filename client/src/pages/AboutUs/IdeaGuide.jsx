import React from "react";

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
    <div className="min-h-screen flex items-center justify-center relative bg-white py-[100px] px-4 overflow-hidden">
      
      <div className="absolute inset-0 grid-pattern grid-fade-top pointer-events-none z-0" />

      <div className="max-w-5xl w-full text-center">
        
        <h1 className="text-4xl md:text-[56px] font-semibold text-primary font-season-medium mb-6">
          Four ideas guide everything we build.
        </h1>

        <p className="text-primary font-dm text-[20px] leading-[30px] max-w-[6xl] mx-auto mb-8">
          Avyakt combines two things most meditation programs keep separate: practice and understanding.
          We explain how attention works, how emotions show up in the body, and why consistency matters more than long sessions. 
          With that understanding, meditation becomes a simple daily practice you can improve over time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ideas.map((idea, index) => (
            <div
              key={index}
              className="bg-[#C2E0BA44] rounded-2xl p-6 shadow-sm text-left"
            >
              <h3 className="text-greenbase text-[20px] font-dm font-semibold mb-2 leading-[30px]">
                {idea.title}
              </h3>
              <p className="font-dm text-primary text-[18px] leading-[30px]">{idea.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}