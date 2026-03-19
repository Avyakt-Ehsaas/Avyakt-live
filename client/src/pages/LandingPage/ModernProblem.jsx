import React, { useState } from "react";
import GlobeCard1 from "../../assets/images/GlobeCard1.png";
import GlobeCard2 from "../../assets/images/GlobeCard2.png";
import GlobeCard3 from "../../assets/images/GlobeCard3.png";
import GlobeCard4 from "../../assets/images/GlobeCard4.png";

const ModernProblem = () => {
  const [showCards, setShowCards] = useState(false);

  const cards = [
    {
      title: "Growing Minds Under Constant Stimulation",
      description:
        "Young nervous systems are overloaded before they learn to regulate themselves.",
      image: GlobeCard1,
      style: { top: "60px", left: "80px" }
    },
    {
      title: "Carrying Stress everyday",
      description:
        "Stress accumulates faster than it’s released. Peace becomes harder to access with age.",
      image: GlobeCard2,
      style: { top: "60px", right: "120px" }
    },
    {
      title: "Constant Noise From the Digital World",
      description:
        "Notifications, screens, and endless information overload the brain and fragment attention throughout the day.",
      image: GlobeCard4,
      style: { bottom: "30px", left: "140px", paddingRight: "10px" }
    },
    {
      title: "Minds That Never Switch Off",
      description:
        "Mental noise has become the new normal. The stress and pressure create anxiety and decision fatigue.",
      image: GlobeCard3,
      style: { bottom: "60px", right: "140px" }
    }
  ];

  return (
    <div className="relative w-full min-h-[540px] md:min-h-[700px] md:flex md:items-center md:justify-center bg-white">
{/* <div className="relative w-full py-20 min-h-screen md:min-h-[700px] flex flex-col items-center bg-white">  */}
      {/* Center Content */}
      <div className="max-w-[900px] text-center z-10">

        <h1 className="text-[32px] md:text-[48px] font-season font-medium leading-[1.05] text-primary px-6 md:px-0">
          Modern life overwhelms <span className="text-greenbase">every mind.</span>
        </h1>

        <p className="px-6 mt-4 text-lg text-[#191919] font-medium font-dm">
          From early childhood to adulthood, constant stimulation, pressure,
          and emotional overload are <p>affecting focus, wellbeing, and inner calm.</p>
        </p>

        <button
          onClick={() => setShowCards(!showCards)}
          className="mt-4 font-medium font-dm underline hover:scale-101 transition"
        >
          {showCards ? "Hide" : "See what we mean"}
        </button>

      </div>

      {/* Cards */}
      {/* {showCards &&
        cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            image={card.image}
            style={card.style}
          />
        ))} */}

   {/* DESKTOP FLOATING CARDS */}
{showCards && (
  <div className="hidden lg:block">
    {cards.map((card, index) => (
      <Card
        key={index}
        title={card.title}
        description={card.description}
        image={card.image}
        style={card.style}
      />
    ))}
  </div>
)}

{/* MOBILE PREMIUM CARD SECTION */}
{showCards && (
  <div className="lg:hidden mt-14 px-6">
    <div className="flex flex-col gap-6">
      {cards.map((card, index) => (
        <MobileCard
          key={index}
          title={card.title}
          description={card.description}
          image={card.image}
        />
      ))}
    </div>
  </div>
)}
    </div>
  );
};

const Card = ({ title, description, image, style }) => {
  return (
    <div
      className="absolute w-[440px] bg-[#C2E0BA]/20 border border-[#C8E1C1] rounded-3xl pr-2 mb-10 shadow-md flex gap-4 transition-all duration-500"
      style={style}
    >
      <img
        src={image}
        alt={title}
        className="w-[120px] max-h-[200px] object-cover rounded-lg"
      />

      <div className="pb-4" >
        <h3 className="font-semibold mt-2 font-dm text-[18px] py-4 text-primary mb-0">
          {title}
        </h3>

        <p className="text-[16px] font-dm text-primary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const MobileCard = ({ title, description, image }) => {
  return (
    <div className="flex gap-4 bg-white rounded-2xl shadow-lg border border-gray-100">

      <img
        src={image}
        alt={title}
        className="w-[130px] h-[140px] rounded-xl object-cover"
      />

      <div className="flex flex-col justify-center p-2">
        <h3 className="text-[16px] font-semibold text-primary mb-1 font-dm">
          {title}
        </h3>

        <p className="text-[14px] text-gray-600 leading-relaxed font-dm">
          {description}
        </p>
      </div>

    </div>
  );
};
export default ModernProblem;