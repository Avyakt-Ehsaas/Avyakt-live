import React from "react";

const StudentPressureSection = () => {
  return (
    <section className="relative bg-[#F7F8F7] pt-28 pb-20 overflow-hidden">

      {/* Subtle Grid Background */}
     <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-8">

        {/* Heading Block */}
        <div className="max-w-4xl">

          <h2 className="text-[42px] md:text-6xl font-season font-medium leading-[1.15] text-[#111111]">
            India’s Students Are Under
            <br />
            <span className="text-greenbase">
              Unprecedented Pressure
            </span>
          </h2>

          <p className="mt-4 text-[18px] text-primary font-dm leading-relaxed max-w-3xl">
            Academic stress, exam anxiety, digital distraction, and emotional overload 
            are affecting students across age groups. Research from India shows:
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">

          {/* Card 1 */}
          <div className="bg-[#C2E0BA]/30 rounded-[20px] p-8">
            <h4 className="text-[18px] font-semibold text-primary mb-4">
              Academic Stress
            </h4>

            <div className="text-[56px] font-season text-greenbase mb-4 leading-none">
              78%
            </div>

            <p className="text-[16px] text-primary font-dm leading-relaxed">
              Students reporting high level of exam stress and anxiety
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#E9F3E6] rounded-[20px] p-8">
            <h4 className="text-[18px] font-semibold text-primary mb-4">
              Digital Distraction
            </h4>

            <div className="text-[56px] font-season text-greenbase mb-4 leading-none">
              65%
            </div>

            <p className="text-[16px] text-primary font-dm leading-relaxed">
              Reduction in sustained attention span over the last decade.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#E9F3E6] rounded-[20px] p-4">
            <h4 className="text-[18px] font-semibold text-primary mb-4">
              Mental Health Gap
            </h4>

            <div className="text-[56px] font-season text-greenbase mb-4 leading-none">
              1 in 5
            </div>

            <p className="text-[16px] text-primary font-dm leading-relaxed">
              Students require professional emotional support but lacks access 
              to institutional resources.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default StudentPressureSection;