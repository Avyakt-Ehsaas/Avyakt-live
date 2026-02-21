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
    <div className="max-w-[1118px] mx-auto bg-white border border-gray-200 rounded-[20px]
     shadow-sm p-6 flex flex-col md:flex-row gap-6 mt-[20px] ">

      {/* Left Image */}
      <div className="w-full md:w-[280px] h-[380px] overflow-hidden rounded-[16px]">
        <img
          src={image}
          alt="program"
          className="w-[280px] h-[380px] object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col justify-between mx-4">
        <div>
          <div className="mt-5">
            <h3 className="font-rubik text-[24px] font-[400] leading-[40px] text-[#191919]">
              {title}
            </h3>

            <p className="mt-0 text-[16px] leading-[26px] text-gray-600">
              {description}
            </p>
          </div>

          {/* Bullet Points */}
          <ul className="font-dm mt-7 space-y-2 text-[16px] leading-[20px] text-gray-800">
            {points.map((point, index) => (
              <li key={index}>• {point}</li>
            ))}
          </ul>

          <p className="mt-8 text-[15px] leading-[24px] text-gray-600">
            {footerText}
          </p>
        </div>

        {/* CTA Button */}
        <button className="w-fit bg-greenbasebg text-white text-[16px] font-medium px-6 py-3 rounded-full hover:opacity-90 transition">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ProgramCard;