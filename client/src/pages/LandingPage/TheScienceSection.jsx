import React from "react";
import TheScience from '../../assets/images/TheScience.png'

const ScienceCard = ({ title, description }) => {
  return (
    <div className="bg-white bg-opacity-95 rounded-2xl p-6 text-left">
      <h3 className="text-greenbase font-dm font-semibold text-lg mb-3 pr-4">
        {title}
      </h3>
      <p className="text-primary font-dm text-lg leading-relaxed pr-4">
        {description}
      </p>
    </div>
  );
};

export default function TheScienceSection() {
  const scienceCards = [
    {
      title: "The prefrontal cortex grows stronger",
      description:
        "fMRI studies show structural increases in grey matter and activation in the brain's attention control region after 8 weeks of daily meditation, even in those with no prior experience.",
    },
    {
      title: "Morning cortisol drops measurably",
      description:
        "8 weeks of meditation lowers cortisol (a biological marker of stress) measurably. Improves sleep and mindfulness in novice practitioners.",
    },
    {
      title: "The amygdala quiets down",
      description:
        "Mindfulness training over 8 weeks decreases amygdala activity and improves its connectivity with the prefrontal cortex.",
    },
  ];

  return (
    <section
      className="relative px-4 bg-cover bg-center"
      style={{
        backgroundImage: `url(${TheScience})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay (BEHIND CONTENT) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 15%, rgba(255,255,255,0.6) 35%, rgba(255,255,255,0) 80%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto py-48">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-greenbase text-sm font-season-medium tracking-widest uppercase mb-4">
            THE SCIENCE
          </p>

          <h2 className="text-4xl md:text-5xl font-season-medium text-primary leading-[50px] md:leading-[60px] mb-6">
            What 8 weeks of structured <br />
            meditation actually does.
          </h2>

          <p className="text-primary font-dm font-medium text-sm md:text-lg max-w-3xl mx-auto leading-relaxed">
            fMRI studies. Randomized controlled trials. Cortisol assays. This is
            not wellness marketing, these are documented, replicable changes in
            the brain and body.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-14 sm:gap-6 mt-12">
          {scienceCards.map((card, index) => (
            <ScienceCard
              key={index}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
