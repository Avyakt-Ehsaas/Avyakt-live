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
    <div className="max-w-[1180px] h-[350px] mx-auto bg-white border border-gray-200 rounded-[20px]
     shadow-sm flex flex-col md:flex-row gap-6 mt-[20px] ">

      {/* Left Image */}
      <div className="w-full md:w-[220px] h-[350px] overflow-hidden" style={{borderRadius : "16px 0 0 16px"}}>
        <img
          src={image}
          alt="program"
          className="w-[220px] h-[350px] object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col justify-start py-6 mx-4">
        <div>
          <div className="mt-2">
            <h3 className="font-dm  text-[22px] leading-[30px] text-primary" 
            style={{fontWeight: "580"}}>
              {title}
            </h3>

            <p className="mt-2 font-dm text-[20px] font-medium leading-[24px] text-primary">
              {description}
            </p>
          </div>

          {/* Bullet Points */}
          <ul className="font-dm font-medium mt-4 space-y-2 text-[20px] leading-[16px] text-primary">
            {points.map((point, index) => (
              <li key={index}>• {point}</li>
            ))}
          </ul>

          <p className="mt-4 font-dm font-medium text-[20px] leading-[24px] text-primary">
            {footerText}
          </p>
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
