import React from "react";
import ProblemBrain from "../../assets/images/ProblemBrain.png"

const ProblemSection = () => {
  return (
    <section className="bg-white pt-28 pb-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Header */}
        <header className="mb-12">
          <p className="text-greenbase font-season tracking-widest text-sm font-medium mb-1">
            THE PROBLEM
          </p>

          <h1 className="text-3xl md:text-5xl font-season-medium text-primary leading-[50px]">
            Six things happening to your mind right now.
          </h1>

          <p className="mt-4 text-primary font-dm  max-w-4xl mx-auto text-[18px]">
            Not metaphors. Documented, measurable changes, affecting students,
            working professionals, and 
            <br />seniors across India. Most people have
            no trained response to any of them.
          </p>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10">
          
          {/* Left Side */}
          <aside className="flex flex-col gap-12 items-center md:items-end">
            {[
              "Burnout is not an exception",
              "There is no good place to start",
              "People start meditating and quit",
            ].map((text, index) => (
              <div
                key={index}
                className="bg-[#C2E0BA33] text-greenbase px-6 py-3 rounded-full text-sm font-medium w-[75%]"
              >
                {text}
              </div>
            ))}
          </aside>

          {/* Center Image */}
          <figure className="-mt-12 flex justify-center items-start">
            <img
              src={ProblemBrain} 
              alt="Brain illustration"
              className="w-52 md:w-72 "
            />
          </figure>

          {/* Right Side */}
          <aside className="flex flex-col gap-12 items-center md:items-start">
            {[
              "Sleep is broken",
              "Attention is Collapsing",
              "Reactions happen before thought",
            ].map((text, index) => (
              <div
                key={index}
                className="bg-[#C2E0BA33] text-greenbase px-6 py-3 rounded-full text-sm font-medium w-[75%]"
              >
                {text}
              </div>
            ))}
          </aside>

        </div>
      </div>
    </section>
  );
};

export default ProblemSection;