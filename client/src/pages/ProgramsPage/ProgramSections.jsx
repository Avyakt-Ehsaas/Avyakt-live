import React, { useState } from "react";
import ProgramSectionsImage from "../../assets/images/ProgramSectionBg.png";

const ProgramSections = ({activeTab,setActiveTab,data}) => {

  // const [activeTab, setActiveTab] = useState("school");

  const tabs = [
    { id: "school", label: "For school" },
    { id: "organisation", label: "For Organisation" },
    { id: "senior", label: "For Senior Club" },
    { id: "individual", label: "Individual" },
  ];

  return (
    <section className="relative bg-[#F8F9F8] overflow-hidden">

      {/* Light Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto px-6 pt-10 text-center">

        {/* Tabs */}
        <div className="flex font-dm justify-center gap-8 text-sm md:text-base font-medium mb-6">

          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-2 transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
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

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-season-medium font-medium text-primary leading-tight max-w-4xl mx-auto">
          {data.title}
        </h2>

        <p className="mt-6 font-dm text-primary text-base md:text-lg max-w-3xl mx-auto">
          {data.description}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-greenbase-primary font-dm text-white px-8 py-4 rounded-full hover:scale-102 transition-all duration-300 shadow-md cursor-pointer">
            {data.buttonText}
          </button>

          <button className="border font-dm border-greenbase text-greenbase px-8 py-4 rounded-full cursor-pointer hover:scale-102  transition-all duration-300">
            Download Brochure
          </button>
        </div>

      </div>

      {/* Image Section */}
      <div className="relative flex justify-center max-h-[480px]">
        <img
          src={data.image}
          alt="program tab image"
          className="w-full max-w-4xl object-contain"
        />
      </div>

    </section>
  );
};

export default ProgramSections;