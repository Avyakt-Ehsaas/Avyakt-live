import React from "react";

const ResearchShows = ({ data }) => {
  if (!data) return null;

  return (
    <section className="relative w-full h-[90vh] md:h-screen overflow-hidden">

      {/*  Background Image */}
    <div className="absolute inset-0 z-0 w-full h-full">
          <img
        src={data.image}
        alt="background"
        className="absolute w-full h-full object-contain opacity-80"
      />
    </div>


      {/*  Content */}
      <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col items-center justify-center px-6 md:px-12">

         <p className="text-greenbase font-dm text-center font-medium tracking-widest text-[14px] text-[20px] uppercase ">
                  {data.tag}
          </p>

        {/* Heading */}
        <h1 className="heading-main font-med leading-tight max-w-4xl text-primary">
          {data.heading}
        </h1>


        {/* Cards */}
        <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-6">

          {data.cards?.map((card, i) => (
            <div
              key={i}
              className="bg-white backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/20 transition shadow-xl cursor-pointer"
            >

                {card.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {card.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="text-greenbase font-dm paragraph-body rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

              <h3 className="heading-large font-med text-left mb-4">
                {card.title}
              </h3>

              <p className="text-primary font-dm paragraph-secondary mt-2 text-left">
                {card.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default ResearchShows;