import React from "react";

function ProgramCard({
  tag,
  title,
  description,
  points = [],
  buttonText,
  image,
}) {
  return (
<div className="max-w-[1080px] mx-auto bg-white border border-gray-200 rounded-[20px]
shadow-sm flex flex-col md:flex-row mt-[20px] overflow-hidden">

     {/* Left Image */}
<div className="w-full md:w-[280px]" style={{borderRadius: "16px 0 16px 0"}}>
  <img
    src={image}
    alt="program"
    className="w-full h-full md:h-[380px]  object-cover"
  />
</div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col  justify-start py-6 px-6 bg-[#C2E0BA33] pl-12">
        <div>
          <div className="mt-2">

       <span className="inline-block w-fit font-season bg-[#C2E0BA33] text-greenbase px-4 py-2 rounded-full text-sm font-medium mb-4">
            {tag}
          </span>

            <h3 className="font-season text-[32px] leading-[40px] text-primary mb-1" 
            style={{fontWeight: "500"}}>
              {title}
            </h3>

            <p className="mt-2 max-w-xl font-dm text-[18px] font-medium leading-[28px] text-primary">
              {description}
            </p>
          </div>

          {/* Bullet Points */}
          <ul className="flex gap-2 font-dm font-medium mt-[20px] space-y-2 text-[20px] leading-[30px] text-primary">
            {points.map(
              (item, i) => (
                <span
                  key={i}
                  className="px-4 py-2 border border-greenbase text-greenbase rounded-full text-sm"
                >
                  {item}
                </span>
              )
            )}
          </ul>

        </div>

        {/* CTA Button */}
        <button className="w-fit mt-4 font-dm bg-greenbasebg text-white text-[18px] font-medium px-6 py-3 rounded-full hover:opacity-90 transition tracking-wide hover:scale-101">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ProgramCard;
