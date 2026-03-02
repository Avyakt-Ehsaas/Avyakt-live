import React, { useState } from "react";
import Earth from "../../assets/images/earth.png";
import Globe from "../../assets/images/Globe.png";
import Group24 from "../../assets/images/Group 24.svg"
import Group26 from "../../assets/images/Group 26.svg"
import Group27 from "../../assets/images/Group 27.svg"
import GlobeCard1 from "../../assets/images/GlobeCard1.png"
import GlobeCard2 from "../../assets/images/GlobeCard2.png"
import GlobeCard3 from "../../assets/images/GlobeCard3.png"


const ModernProblem = () => {
  const [showCards, setShowCards] = useState(false);
  
  const cards = [
    {
      title: "Growing Minds Under Constant Stimulation",
      description: "Young nervous systems are overloaded before they learn to regulate themselves.",
      image: GlobeCard1,
      style: { top: "-4rem", left: "47px" }  
    },{
      title: "Carrying Stress everyday",
      description: "Stress accumulates faster than it’s released. Peace becomes harder to access with age.",
      image: GlobeCard2 ,
      style: { top: "-5px", right: "11%" }
    },{
      title: "Minds That Never Switch Off",
      description: "Mental noise has become the new normal. The stress, pressure creates anxiety and decision fatigue. ",
      image: GlobeCard3,
      style: { bottom: "-33px", right: "5%" }
    }
  ];

  return (
  <>
    <div className="min-h-screen py-10 overflow-hidden">
      <div className="mt-[2rem] h-[480px] w-[1280px] px-[2rem] mx-auto rounded-3xl relative">
        <div className="flex justify-around relative">
          <div className="w-[45%]">
            <div className=" absolute top-30 left-[5%] scale-140 ">
              <img src={Earth} alt="earth image"  className="h-[320px] w-[380px]"/>
            </div>
          </div>
          <div className="w-[55%] px-4 ">
              <div className="w-[100%] mt-[10rem] px-8 text-right">
                <h1 className="text-[48px] font-season leading-[1.05] text-primary">
                  Modern life overwhelms <br />
                  <h1 className=""><span className="text-greenbase">every mind.</span></h1>
                </h1>
              <div>
                <p className="mt-2 font-dm text-lg text-primary leading-[20px]">
                  From early childhood to adulthood, constant stimulation, pressure,
                  and emotional overload are affecting focus, wellbeing, and inner calm.
                </p>
                  <div className="text-right">
                  <button
                  onClick={() => setShowCards(!showCards)}
                  className="mt-2 font-dm  text-right  font-medium underline hover:scale-105 transition-all duration-300 "
                >
                  {showCards ? " Hide" : "See what we mean"}
                </button>
                  </div>
              </div>
              </div>
          </div>
        </div>
      {showCards && (
        <>
          <div className="absolute rotate-[20deg] left-[26%] top-[2%]"> 
            <img src={Group24} className="h-42" />
          </div>
          <div className="absolute rotate-[8deg] left-[34%] top-[7%]"> 
            <img src={Group26} className="h-69" />
          </div>  
          <div className="absolute left-[41%] top-[65%]">
            <img src={Group27} className="h-50" />
          </div>
        </>
      )}

      {showCards && (
        <>
          {cards.map((card, index) => (
            <Card 
              key={index}
              title={card.title}
              description={card.description}
              image={card.image}
              style={card.style}
            />
          ))}
        </>
        )
        }

      </div>
    </div>

  </>
  );
};


const Card = ({ title, description, image, style }) => {
  return (
    <div className="absolute w-[370px] bg-[#C2E0BA]/40 rounded-lg shadow-lg" style={style}>  
      <div className="flex">
        <div className="w-[30%]" >
          <img src={image} alt={title} className="h-[135px]"/>
        </div>
      <div className="text-right w-[70%] pr-4"> 
         <h2 className="text-lg font-semibold mb-4 mt-4">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p></div>
      </div>

    </div>
  );
} 


export default ModernProblem;