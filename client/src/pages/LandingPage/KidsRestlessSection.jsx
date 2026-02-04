import React from "react";

const KidsRestlessSection = () => {
  return (
    <section className="pt-[8rem] w-full bg-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl text-center">
        {/* Top pill */}
        <div className="flex justify-center">
          <h3 className="inline-flex items-center rounded-full bg-greenbase px-8 py-3 text-lg font-rubik text-[18px]">
            For Kids (6–12 years)
          </h3>
        </div>

        {/* Heading */}
        <h1 className="mt-1 font-medium text-[56px] leading-[70px] tracking-tight" >
          Feeling <span className="text-greenbase">restless</span> or
          <br />
          easily <span className="text-greenbase">distracted?</span>
        </h1>

        {/* Body */}
        <p className="mt-4 text-gray-700 text-base " style={{ fontFamily: "DM Sans, sans-serif" }}>
          Screens, constant stimulation, and early pressure are shaping
          <br className="hidden sm:block" />
          young minds faster than they can process.
          <br />
          Many children struggle with focus, emotional regulation, and
          <br className="hidden sm:block" />
          anxiety — not because they’re difficult, but because their
          <br className="hidden sm:block" />
          nervous systems are overwhelmed.
        </p>

        {/* Link */}
        <a
          href="#"
          className="mt-6 inline-block text-sm  text-gray-900 underline underline-offset-4 decoration-1 decoration-black"
        >
          See what we mean
        </a>
      </div>
    </section>
  );
};

export default KidsRestlessSection;