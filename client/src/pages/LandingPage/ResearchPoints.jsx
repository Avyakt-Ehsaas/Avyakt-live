import meditationIllustration from "../../assets/images/meditationIllustration.png";

const researchPoints = [
  {
    no: "01",
    title: "Structure removes decision fatigue",
    desc: 'A pre-planned session removes the "what should I do today?" loop. You show up, we guide.',
  },
  {
    no: "02",
    title: "Context-matching increases retention",
    desc: "Sessions matched to what you're going through feel relevant, and relevant content gets used. Generic content gets abandoned.",
  },
  {
    no: "03",
    title: "Community accountability works",
    desc: "Even passive community cues, streaks, shared sessions, category cohorts, measurably increase habit adherence over solo practice.",
  },
];

export default function ResearchPoints() {
  return (
    <section className="w-full bg-white py-24 px-6 mt-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 items-center gap-16">
        
<div className="flex justify-center lg:justify-start relative">
  
<div className="absolute top-6 h-104 w-80 bg-greenbase-primary rounded-lg opacity-20 blur-3xl" >
</div>

  {/* Image */}
  <img
    src={meditationIllustration}
    alt="Meditation illustration"
    className="w-[360px] md:w-[430px] object-contain relative z-10"
  />
</div>

        {/* Right Content */}
        <div className="lg:col-span-2">
          <p className="text-greenbase font-dm text-[14px] md:text-[20px] tracking-widest mb-2 uppercase text-center md:text-left">
            What the research actually says
          </p>

          <h2 className="px-4 md:px-4 font-season-medium text-primary heading-main text-center-left">
            Meditation works. Decades of published studies confirm it.
          </h2>

          <div className="mt-11 space-y-7">
            {researchPoints.map((item) => (
              <div key={item.no} className="flex gap-5">
                <span className="text-greenbase font-dm text-3xl font-light leading-none min-w-[42px] mt-8">
                  {item.no}
                </span>

                <div>
                  <h3 className="text-primary card-title font-dm font-med">
                    {item.title}
                  </h3>

                  <p className="text-gray font-dm paragraph-body text-left">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}