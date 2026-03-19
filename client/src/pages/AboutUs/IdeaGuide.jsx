import React from "react";

export default function IdeaGuide() {
  return (
    <div className="min-h-screen items-center justify-center relative bg-white py-[100px] px-4 overflow-hidden">
       <div className="absolute inset-0 grid-pattern grid-fade-top pointer-events-none z-0" />
      <div className="max-w-5xl w-full text-center">

        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
          Four ideas guide everything we build.
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          Avyakt combines two things most meditation programs keep separate: practice and understanding.
We explain how attention works, how emotions show up in the body, and why consistency matters more than long sessions.With that understanding, meditation becomes a simple daily practice you can improve over time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card */}
          <div className="bg-green-50 rounded-2xl p-6 shadow-sm text-left">
            <h3 className="text-green-700 font-semibold mb-2">
              A little every day beats a lot once in a while
            </h3>
            <p>Short daily practice creates deeper change than occasional long sessions.</p>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 shadow-sm text-left">
            <h3 className="text-green-700 font-semibold mb-2">
              Notice before you fix
            </h3>
            <p>Understanding how your mind works comes before trying to control it.</p>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 shadow-sm text-left">
            <h3 className="text-green-700 font-semibold mb-2">
              Experience teaches best
            </h3>
            <p>Participants observe their own attention and discover patterns through practice.</p>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 shadow-sm text-left">
            <h3 className="text-green-700 font-semibold mb-2">
              Same foundation, different lives
            </h3>
            <p>Students, professionals, and seniors follow the same approach, adapted to their context.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
