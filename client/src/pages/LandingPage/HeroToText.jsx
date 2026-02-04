import React from "react";

const HeroText = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center w-[732px]">
        <h1 className="font-[600] text-[56px] leading-[70px] text-center font-rubik ">
          Build <span className="text-[#71AC61]">focus.</span> Build{" "}
          <span className="text-[#71AC61]">calm.</span>
          <br />
          Build a <span className="text-[#71AC61]">stronger mind.</span>
        </h1>
        <p className="mt-4 text-gray-700 text-base " style={{ fontFamily: "DM Sans, sans-serif" }}>
          Guided sessions and mental workouts that help you stay sharp, <br />
          centered, and resilient through everyday challenges.
        </p>
      </div>
    </div>
  );
};

export default HeroText;