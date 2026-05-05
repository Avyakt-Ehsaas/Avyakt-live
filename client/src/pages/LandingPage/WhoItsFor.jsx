import AboutStage0 from "../../assets/images/AboutStage0.png";
import AboutStage1 from "../../assets/images/AboutStage1.png";
import AboutStage2 from "../../assets/images/AboutStage2.png";
import AboutStage3 from "../../assets/images/AboutStage3.png";

const audienceCards = [
  {
    img: AboutStage0,
    tags: "Exam anxiety · Peer pressure · Study focus",
    title: "Schools",
    desc: "Age-appropriate sessions for students, exam anxiety, peer pressure, and focus.",
  },
  {
    img: AboutStage1,
    tags: "Burnout · Pre-meeting · Decision fatigue",
    title: "Organizations",
    desc: "Corporate wellness, burnout recovery, and pre-meeting calm, credentialed by team.",
  },
  {
    img: AboutStage2,
    tags: "Sleep Growth · Stress · Heartbreak",
    title: "Individuals",
    desc: "Personal practice built around your life, your emotions, and your pace.",
  },
  {
    img: AboutStage3,
    tags: "Gentle breath · Isolation · Memory",
    title: "Senior Communities",
    desc: "Gentle, thoughtful sessions for older adults, connection, grief, and peaceful ageing.",
  },
];

export default function WhoItsFor() {
  return (
    <section className="w-full bg-[#F4FAF2] py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-greenbase font-dm text-[14px] md:text-[20px] tracking-widest mb-2 uppercase">
          Who It’s For
        </p>

        <h2 className="px-2 md:px-0 font-season-medium text-primary heading-main">
          Meditation designed for every{" "}
          <span className="text-[#6BAD5F]">stage of life</span>
        </h2>

        <p className="max-w-3xl mx-auto mt-1 text-gray font-dm paragraph-body">
          Different contexts need different content, and different credentials.
          Each category has its own library, its own structure, and its own
          community.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9">
          {audienceCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-left shadow-[0px_12px_35px_rgba(0,0,0,0.10)] hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-20 h-20 rounded-full object-cover mb-5"
              />

              <p className="font-dm text-greenbase paragraph-secondary font-medium text-left leading-[60px] mb-2">
                {card.tags}
              </p>

              <h3 className="font-dm text-primary card-title font-med ">
                {card.title}
              </h3>

              <p className="font-dm paragraph-secondary text-gray mt-1 text-left font-med">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}