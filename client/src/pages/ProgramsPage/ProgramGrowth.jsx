import React from "react";


function ProgramGrowth ({data}) {

  return (
    <div className="mt-30 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#9ca3af12_1px,transparent_1px),linear-gradient(to_bottom,#9ca3af12_1px,transparent_1px)] bg-[size:60px_60px]" />
      <section className="w-full py-24 flex flex-col items-center px-6">

        {/* Heading */}
        <div className="flex flex-col items-center gap-6 max-w-7xl">
          <h1 className="font-[580] text-5xl font-season-medium text-center leading-[50px]">
            {data.title}{" "}
            <span className="text-greenbase">{data.greenTitle}</span> {data.postTitle}
          </h1>

          <p className="text-center font-dm text-[20px] text-primary leading-[30px] max-w-5xl" style={{ fontWeight: 500 }}>
           {data.description}
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-7 max-w-7xl w-full">
          {data.cards.map((program, index) => (
            <div
              key={index}
              className="bg-[#C2E0BA33] p-8 rounded-3xl flex flex-col gap-[0.5px] shadow-sm"
            >
              {/* Icon */}
              <div className="bg-white rounded-full w-[80px] h-[80px] flex items-center justify-center relative z-10">
                <img src={program.image} alt={program.title} className="rounded-full "/>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold font-dm text-[22px] mt-4">
                {program.cardTitle}
              </h3>

              {/* Description */}
              <p className="text-primary text-[16px] font-dm" style={{fontWeight: 400}}>
                {program.cardDescription}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-3">
                {program.keyPoints.map((tag, i) => (
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
