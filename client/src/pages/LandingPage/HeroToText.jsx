import React from "react";

const HeroText = () => {
  return (
    <div className="py-[18rem] h-[60vh] md:h-[70vh]  flex items-center justify-center bg-white">
      <div className="text-center w-[732px]">
        <h1 className="font-[600] mx-15 md:text-6xl md:mx-1 text-4xl leading-[70px] text-center font-rubik ">
          Build <span className="text-[#71AC61]">focus.</span> Build{" "}
          <span className="text-[#71AC61]">calm.</span>
          <br />
          Build a <span className="text-[#71AC61]">stronger mind.</span>
        </h1>
        <p className="mt-4 mx-20 md:mx-0 text-sm  text-gray-700 md:text-base " style={{ fontFamily: "DM Sans, sans-serif" }}>
          Guided sessions and mental workouts that help you stay sharp, <br />
          centered, and resilient through everyday challenges.
        </p>
      </div>
    </div>
  );
};

export default HeroText;