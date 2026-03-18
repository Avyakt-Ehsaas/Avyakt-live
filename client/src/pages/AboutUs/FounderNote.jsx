// FounderNote.jsx
import React from "react";
import founderImg from "../../assets/images/FounderNote.png"; 

export default function FounderNote() {
  return (
    <section className="bg-[#f7f5f2] py-20 px-5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        
        {/* Image */}
        <div>
          <img
            src={founderImg}
            alt="Founder"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Content */}
        <div className="bg-[#a8c5a2] p-10 rounded-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold mb-5">
            A note from our{" "}
            <span className="text-green-700">founder</span>
          </h2>

          <p className="text-gray-800 mb-4 leading-relaxed">
            Many people are encouraged to meditate, but the practice often
            remains abstract.
          </p>

          <p className="font-semibold text-gray-900 mb-4">
            The mind can be trained like any other skill.
          </p>

          <p className="text-gray-800 leading-relaxed">
            Small, consistent practice gradually changes how we focus, respond
            to stress, and understand our inner experience. Avyakt combines
            meditation with learning and experimentation so people can explore
            how their mind works.
          </p>
        </div>

      </div>
    </section>
  );
}