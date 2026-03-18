import React from "react";

export default function IdeaGuide() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full text-center">

        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
          Four ideas guide everything we build.
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          Avyakt combines two things most meditation programs keep separate...
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card */}
          <div className="bg-green-50 rounded-2xl p-6 shadow-sm text-left">
            <h3 className="text-green-700 font-semibold mb-2">
              A little every day beats a lot once in a while
            </h3>
            <p>Short daily practice creates deeper change...</p>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 shadow-sm text-left">
            <h3 className="text-green-700 font-semibold mb-2">
              Notice before you fix
            </h3>
            <p>Understanding how your mind works comes before trying...</p>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 shadow-sm text-left">
            <h3 className="text-green-700 font-semibold mb-2">
              Experience teaches best
            </h3>
            <p>Participants observe their own attention...</p>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 shadow-sm text-left">
            <h3 className="text-green-700 font-semibold mb-2">
              Same foundation, different lives
            </h3>
            <p>Students, professionals, and seniors follow...</p>
          </div>

        </div>
      </div>
    </div>
  );
}