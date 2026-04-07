import ProgramLower from "../../assets/images/ProgramLower.png";

import AboutAvyaktIcon1 from "../../assets/images/AboutAvyaktIcon1.png";
import AboutAvyaktIcon2 from "../../assets/images/AboutAvyaktIcon2.png";
import AboutAvyaktIcon3 from "../../assets/images/AboutAvyaktIcon3.png";
import AboutAvyaktIcon4 from "../../assets/images/AboutAvyaktIcon4.png";
import AboutAvyaktIcon5 from "../../assets/images/AboutAvyaktIcon5.png";


const AvyaktSystem = () => {
  const steps = [
    {
      icon: AboutAvyaktIcon1,
      title: "Discovery conversation",
      desc: "30 minutes. We ask about your audience, the problems you're seeing, and what success looks like to you.",
    },
    {
      icon: AboutAvyaktIcon2,
      title: "Cognitive baseline",
      desc: "We design the right pre-program assessment, the specific metrics that matter for your context. This becomes the measuring stick.",
    },
    {
      icon: AboutAvyaktIcon3,
      title: "Program customisation",
      desc: "The foundation program gets the contextual layer, sessions, sequencing, and exercises shaped by what we found.",
    },
    {
      icon: AboutAvyaktIcon4,
      title: "Live delivery",
      desc: "Sai Amrit delivers every session. The program designer, live, reading the room every single week.",
    },
     {
      icon: AboutAvyaktIcon5,
      title: "Impact report",
      desc: "Before-and-after data and cohort insights — a document you can share, not just a certificate of participation.",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#F8F9F8]">

      {/* Top Background */}
     <div className="relative">
        <img src={ProgramLower} alt="programbg" className='h-32 w-full' /> 
          <div className="absolute inset-0 pointer-events-none 
    bg-gradient-to-b from-transparent via-white/40 to-[#FAFAFA]" />
        </div>



      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">

        {/* Heading */}
        <h1 className="font-season-medium heading-main text-primary">
          Before we build anything, we listen.
        </h1>

        <p className="mt-2 font-dm text-primary paragraph-body max-w-4xl mx-auto">
          Every engagement starts with a proper diagnostic, not a sales call. We want to understand the actual problem before we put a program in front of you.
        </p>

        {/* Steps */}
        <div className="relative mt-16">

  {/* Dashed Center Line */}
  <div className="hidden md:block  absolute top-[52px] left-[8.66%] right-[8.66%] border-t-2 border-dashed border-[#71ac61]/20 z-0"></div>

  <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

    {steps.map((step, index) => (
      <div key={index} className="flex flex-col items-center text-center">

        {/* Circle */}
        <div className="relative z-10 w-28 h-28 rounded-full bg-[#EAF4E6] flex items-center justify-center mb-6">
          <img
            src={step.icon}
            alt={step.title}
            className="w-18 h-18 object-contain"
          />
        </div>

        <h3 className="card-title font-dm font-semibold text-primary">
          {step.title}
        </h3>

        <p className="mt-3 font-dm text-primary paragraph-body text-center max-w-xs">
          {step.desc}
        </p>

      </div>
    ))}

  </div>
</div>

      </div>
    </div>
  );
};

export default AvyaktSystem;