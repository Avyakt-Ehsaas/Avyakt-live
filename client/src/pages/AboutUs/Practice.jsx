import React from "react"
import meditationImg from "../../assets/images/MeditationPractice.png"
import "./gridPattern.css"

const Practice = () => {

    return (
     <section className="relative bg-white py-16 px-4 md:px-8 min-h-[820px] md:min-h-[720px]">
      <div className="max-w-[1100px] mx-auto text-center ">
        <div className="absolute inset-0 grid-pattern grid-fade-top pointer-events-none z-0" />
        
        {/* Heading */}
        <h1 className="text-[32px] md:text-[56px] font-season-medium text-primary leading-snug">
          A meditation practice you can{" "}
          <span className="text-greenbase">understand</span>,<br />
          not just follow.
        </h1>

        {/* Subtext */}
        <p className="mt-4 text-primary text-base font-dm md:text-[20px] max-w-7xl mx-auto leading-relaxed">
          Aryakt combines two things most meditation programs keep separate:
          practice and understanding. We explain how attention works, how emotions
          show up in the body, and why consistency matters more than long
          sessions. With that understanding, meditation becomes a simple daily
          practice you can improve over time.
        </p>

        {/* Image */}
        <div className="mt-10">
          <img
            src={meditationImg}
            alt="Meditation"
            className="w-[400px] h-[300px] md:w-full md:h-full object-cover rounded-2xl shadow-md"
          />
        </div>
      </div>
    </section>
    )
}

export default Practice