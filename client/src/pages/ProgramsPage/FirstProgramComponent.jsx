import React from "react";
import SkeletonLoader from "../SkeletonLoading/SkeletonLoader";

const FirstProgramComponent = ({data, index}) => {
  // if(!data){
  //   return (
  //     <SkeletonLoader />
  //   );
  // }

  return (
    (data && 
    <section className="relative bg-white py-24 px-6 md:px-12 overflow-hidden">
      
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

          {/* Background Number */}
      <h1 className="absolute -top-28 font-season text-[220px] font-med text-[#C2E0BA99] -z-10">
        {index}
      </h1>
        
        {/* LEFT SIDE */}
        <div className="pt-18">
          <h2 className="heading-main font-season font-med text-primary text-left z-10">
            {data.title}
          </h2>

          <p className="mt-4 text-primary font-dm text-left paragraph-body font-med max-w-2xl">
           {data.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mt-6">
            {data.tags.map((tag, i) => (
              <span
                key={i}
                className="px-4 py-2 paragraph-secondary font-dm border border-greenbase text-greenbase rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Weeks Content */}
          <div className="mt-10 space-y-6">
           {data.weeks.map((item, i) => (
              <div key={i} className="border-b-2 border-greenbase pb-4">
                <h4 className="font-med text-left text-primary paragraph-body font-dm">{item.title}</h4>
                <p className="text-left leading-regular text-primary paragraph-secondary font-dm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          
          {/* Image */}
          <img
           src={data.image}
            alt="meditation"
            className="w-full h-full object-cover rounded-xl"
          />

          {/* Card */}
          <div className="bg-[#C2E0BA33] p-6 rounded-xl">
            <h3 className="paragraph-body font-dm font-med text-left text-greenbase">
              {data.customSection.title}
            </h3>

            <h3 className="card-title font-dm font-med text-primary leading-[28px] mt-2">
              {data.customSection.subtitle}
            </h3>

            <p className="text-primary paragraph-secondary text-left font-dm ">
              {data.customSection.description}
            </p>
            {/* Accordion Items */}
            <div className="mt-4 space-y-3 mt-4">
              {data.customSection.points.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 border rounded-lg px-4 py-4 bg-white cursor-pointer hover:bg-gray-50"
                >
                  <span className="text-primary paragraph-secondary font-dm">+</span>
                  <span className="paragraph-secondary font-dm text-left text-primary">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  ));
};

export default FirstProgramComponent;