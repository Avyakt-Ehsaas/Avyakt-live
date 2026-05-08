import React from "react";
import { Star } from "lucide-react";

function ProgramCard({
  tag,
  rating,
  topText,
  totalTime,
  title,
  time,
  category,
  level,
  keyPoint,
  image,
}) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      
      {/* Image */}
      <div className="relative w-full">
        <img
          src={image}
          alt="program"
          className="w-full h-[220px] md:h-48 object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        
        {/* Top Row */}
        <div className="flex items-center flex-wrap gap-2 text-sm text-primary font-dm paragraph-body">
          <span className="flex items-center gap-1 font-medium font-med">
            {rating}
            <Star
              size={14}
              fill="currentColor"
              className="text-yellow-500"
            />
          </span>

          <span>{topText}</span>

          <span>• {totalTime}</span>
        </div>

        {/* Title */}
        <h3 className="mt-2 font-med card-title text-primary font-dm leading-snug">
          {title}
        </h3>

        {/* Sub Info */}
        <p className="caption-text font-dm text-greenbase mt-1">
          {time} • {category} • {level}
        </p>

        {/* Tag Pill */}
        <div className="mt-4">
          <span className="inline-block bg-[#C2E0BA33] text-greenbase font-dm paragraph-secondary px-3 py-1 rounded-full">
            {keyPoint}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProgramCard;