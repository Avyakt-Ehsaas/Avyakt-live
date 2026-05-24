import React from "react";
import RoadMap from "../../assets/Icons/RoadMap.png";

const journeyData = [
  {
    id: "1",
    quarter: "QUARTER 01",
    title: "Foundation & Stabilisation",
    description:
      "Initial neural pathways for calmness are established, reducing baseline stress.",
    points: [
      "Breath & body awareness",
      "Attention & focus training",
      "Sleep onset techniques",
    ],
    position: "top-[26px] left-[25%]",
    numberPosition: "top-[245px] left-[24%]",
  },

  {
    id: "2",
    quarter: "QUARTER 02",
    title: "Resilience & Regulation",
    description:
      "The ‘gap’ between stimulus and response widens, emotional volatility decreases.",
    points: [
      "Emotional regulation",
      "Thought observation",
      "Nervous system regulation",
      "Resilience building",
    ],
    position: "top-[360px] left-[18%]",
    numberPosition: "top-[425px] right-[35%]",
  },

  {
    id: "3",
    quarter: "QUARTER 03",
    title: "Depth & Performance",
    description:
      "Accessing flow states and deeper layers of internal silence on demand.",
    points: [
      "Peak cognitive performance",
      "Deep states of silence",
      "Flow state entry",
      "Advanced visualization",
    ],
    position: "top-[720px] left-[32%]",
    numberPosition: "top-[780px] left-[25.5%]",
  },

  {
    id: "4",
    quarter: "QUARTER 04",
    title: "Integration & Awareness",
    description:
      "Stillness becomes a trait rather than a state, integrated into every action.",
    points: [
      "24/7 mindfulness",
      "Compassion & equanimity",
      "Ego dissolution",
      "Embodied wisdom",
    ],
    position: "bottom-[20px] left-[45%]",
    numberPosition: "bottom-[245px] left-[52%]",
  },
];

const YearlyJourney = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-24">
      {/* Heading */}
      <div className="text-center px-5 md:px-6">
        <p className="text-greenbase font-dm text-[14px] md:text-[20px] tracking-widest mb-2 uppercase">
          Your Yearly Journey
        </p>

        <h2 className="font-season-medium text-primary heading-main mb-4">
          A roadmap through the year
        </h2>

        <p className="max-w-[800px] mx-auto text-gray font-dm paragraph-body">
          Each quarter builds on the last, creating structural changes in your
          mind through targeted neuro-cognitive training.
        </p>
      </div>

      {/* ================= MOBILE TIMELINE ================= */}
      <div className="relative mx-auto mt-14 flex max-w-[420px] flex-col gap-10 px-4 md:hidden">

        {/* Vertical Line */}
        <div className="absolute left-[38px] top-0 h-full w-[2px] bg-greenbase-primary mt-3" />

        {journeyData.map((item) => (
          <div key={item.id} className="relative flex gap-4">

            {/* Number Circle */}
            <div className="relative z-10 flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#8BC975] shadow-[0_10px_25px_rgba(139,201,117,0.35)] mt-2">
              <span className="text-white font-season-medium heading-large font-med ">
                {item.id}
              </span>
            </div>

            {/* Card */}
            <div className="flex-1 rounded-[26px] bg-[#C2E0BA66] p-5 shadow-[0_12px_35px_rgba(0,0,0,0.05)] border border-[#C2E0BA]">

              {/* Badge */}
              <div className="inline-flex items-center justify-center border border-[#7AC563] rounded-full px-4 py-1.5 mb-4">
                <span className="text-greenbase font-dm text-[11px] uppercase tracking-[0.18em]">
                  {item.quarter}
                </span>
              </div>

              {/* Title */}
              <h3 className="card-title font-dm font-med text-primary">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray font-dm paragraph-secondary text-left mt-1">
                {item.description}
              </p>

              {/* Points */}
              <ul className="space-y-2 pt-5">
                {item.points.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray font-dm paragraph-secondary text-left"
                  >
                    <span className="w-[4px] h-[4px] rounded-full bg-[#706E6E] mt-[10px]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP ROADMAP ================= */}
      <div className="relative mx-auto hidden md:block max-w-[1440px] h-[1250px]">
        
        {/* VECTOR IMAGE */}
        <img
          src={RoadMap}
          alt="Journey Path"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />

        {/* CONTENT */}
        {journeyData.map((item) => (
          <React.Fragment key={item.id}>
            
            {/* NUMBER */}
            <div
              className={`absolute ${item.numberPosition} z-20 w-[56px] h-[56px] rounded-full bg-[#8BC975] flex items-center justify-center shadow-xl`}
            >
              <span className="text-white font-season-medium heading-large font-med">
                {item.id}
              </span>
            </div>

            {/* CARD */}
            <div
              className={`absolute ${item.position} z-10 max-w-[580px]`}
            >
              {/* Badge */}
              <div className="inline-flex items-center justify-center border border-[#7AC563] rounded-full px-5 py-2 mb-3">
                <span className="text-greenbase font-dm paragraph-secondary uppercase text-[14px] tracking-widest">
                  {item.quarter}
                </span>
              </div>

              {/* Content */}
              <div className="grid md:grid-cols-2 gap-4">
                
                {/* Left */}
                <div>
                  <h3 className="card-title font-dm font-med">
                    {item.title}
                  </h3>

                  <p className="text-gray font-dm paragraph-secondary text-left mt-2">
                    {item.description}
                  </p>
                </div>

                {/* Right */}
                <ul className="space-y-4 pt-2">
                  {item.points.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray font-dm paragraph-secondary text-left"
                    >
                      <span className="w-[4px] h-[4px] rounded-full bg-[#706E6E] mt-[10px]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default YearlyJourney;