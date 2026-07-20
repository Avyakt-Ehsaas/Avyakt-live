import React, { useState } from "react";

const ProgramSections = ({ activeTab, setActiveTab, data }) => {

  // const [activeTab, setActiveTab] = useState("school");

  const tabs = [
    { id: "school", label: "For school" },
    { id: "organisation", label: "For Organisation" },
    { id: "senior", label: "For Senior Club" },
    { id: "individual", label: "Individual" },
  ];

  return (
    <section className="relative bg-white overflow-hidden">

      <div className="relative">
        <img src={data.image} alt="programbg" className='h-full w-full rounded-t-[24rem]' />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/40 to-[#FAFAFA]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-6 pt-10 text-center">

        {/* Tabs */}
        <div className="flex font-dm justify-center gap-4 md:gap-8 text-primary text-sm md:text-base font-med mb-6">

          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-2 transition-all duration-300 cursor-pointer ${activeTab === tab.id
                  ? "text-greenbase"
                  : "text-primary hover:text-black"
                }`}
            >
              {tab.label}

              {/* Underline */}
              {activeTab === tab.id && (
                <span className="absolute left-0 bottom-0 w-full h-[3px] bg-greenbase-primary rounded-full"></span>
              )}
            </button>
          ))}

        </div>

        <p className="text-greenbase font-dm text-center font-medium tracking-widest text-[14px] md:text-[20px] uppercase ">
          {data.tag}
        </p>

        {/* Heading */}
        <h2 className="heading-large font-season font-med text-primary mt-4 max-w-7xl leading-tight text-center">
          {data.title}
        </h2>

        {/* Description */}
        <p className="text-primary font-dm text-center paragraph-body mx-auto mt-6 max-w-6xl font-medium">
          {data.description}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#71AC61] font-dm text-white px-8 py-4 rounded-full transition-all duration-300 shadow-md cursor-pointer hover:bg-[#4f7944]">
            {data.buttonText}
          </button>

          <button className="border font-dm border-greenbase text-[#71AC61] px-8 py-4 rounded-full cursor-pointer hover:bg-[#4F7944] transition-all duration-300 hover:text-white">
            Download Brochure
          </button>
        </div>

      </div>
    </section>
  );
};

export default ProgramSections;