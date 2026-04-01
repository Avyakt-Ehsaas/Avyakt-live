import React from "react";
import "../AboutUs/gridPattern.css";

const ResearchSection = () => {
  return (
    <section className="relative w-full bg-white py-16 px-6 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern grid-fade-top pointer-events-none z-0" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Top Label */}
        <p className="text-greenbase font-season text-sm tracking-widest font-semibold mb-2 uppercase">
          What the research actually says
        </p>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-season-medium leading-[50px] md:leading-[60px] text-primary">
          Meditation works. Decades of published studies confirm it. The failure
          point is never the practice, it's the{" "}
          <span className="text-greenbase">
            absence of structure, community, and feedback
          </span>{" "}
          around it.
        </h1>

        {/* Description */}
        <p className="mt-8 text-primary font-dm font-medium text-[18px] max-w-3xl mx-auto leading-relaxed">
          An 8-week structured program produces measurable changes in the
          prefrontal cortex, drops morning cortisol, and improves sustained
          attention, in people with zero prior experience. The science is
          settled. The delivery system is what's been missing.
        </p>
      </div>
    </section>
  );
};

export default ResearchSection;