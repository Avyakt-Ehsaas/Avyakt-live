import React from "react";

function ProgramCard({
  title,
  description,
  points = [],
  footerText,
  buttonText,
  image,
  // programData: { title, description, points, footerText, buttonText },


}) {
  return (
    <div className="max-w-[1180px] h-[380px] mx-auto bg-white border border-gray-200 rounded-[20px]
     shadow-sm flex flex-col md:flex-row gap-6 mt-[20px] hover:scale-[1.02] transition-transform duration-300 ease-in-out">

      {/* Left Image */}
      <div className="w-full md:w-[260px] h-[380px] overflow-hidden" style={{borderRadius : "16px 0 0 16px"}}>
        <img
          src={image}
          alt="program"
          className="w-[260px] h-[380px] object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col justify-start py-8 mx-4">
        <div>
          <div className="mt-2">
            <h3 className="font-dm font-semibold text-[22px] leading-[30px] text-primary">
              {title}
            </h3>

            <p className="mt-2 font-dm text-[16px] leading-[24px] text-primary">
              {description}
            </p>
          </div>

          {/* Bullet Points */}
          <ul className="font-dm mt-4 space-y-2 text-[16px] leading-[16px] text-primary">
            {points.map((point, index) => (
              <li key={index}>• {point}</li>
            ))}
          </ul>

          <p className=" mt-8 font-dm  text-[16px] leading-[24px] text-primary">
            {footerText}
          </p>
        </div>

        {/* CTA Button */}
        <button className="w-fit mt-4 font-dm bg-greenbasebg text-white text-[16px] font-medium px-6 py-3 rounded-full hover:opacity-90 transition tracking-wide">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ProgramCard;
