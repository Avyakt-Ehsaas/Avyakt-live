import React from "react";
import "../AboutUs/gridPattern.css";

const ResearchSection = () => {
  return (
    <section className="relative w-full bg-white py-16 px-6 overflow-hidden min-h-[80vh] md:min-h-screen 2xl:min-h-fit flex items-center justify-center">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern  grid-fade-top pointer-events-none z-0" />

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Top Label */}
        <p className="text-greenbase font-dm text-medium md:text-lg tracking-widest mb-4 uppercase ">
          What the research actually says
        </p>

        {/* Heading */}
        <h1 className="heading-main font-season-medium  text-primary leading-[50px] px-12 md:px-0">
          Meditation works. Decades of published studies confirm it. The failure
          point is never the practice, it's the{" "}
          <span className="text-greenbase">
            absence of structure, community, and feedback
          </span>{" "}
          around it.
        </h1>

        {/* Description */}
        <p className="mt-6 text-primary font-dm font-medium paragraph-body max-w-4xl mx-auto">
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