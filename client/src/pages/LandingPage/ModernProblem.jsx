import React, { useState } from "react";
import Earth from "../../assets/images/earth.png";
import Group24 from "../../assets/images/Group 24.svg"
import Group26 from "../../assets/images/Group 26.svg"
import Group27 from "../../assets/images/Group 27.svg"



const ModernProblem = () => {
  const [showCards, setShowCards] = useState(false);

  return (
    <section className="w-full h-[110vh] bg-white overflow-hidden flex items-center">
      <div className="relative mx-auto w-full grid grid-cols-2 h-full">

        {/* LEFT SIDE */}
        <div className=" overflow-hidden ">
          <div
            className={`max-w-[520px] bg-green-50 rounded-3xl h-60 border-green-300 ml-16 border-1
              transition-all duration-700
              ${showCards ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none"}`}
          >
            <div className="flex items-center gap-4 pr-4">

              {/* LEFT IMAGE */}
              <img
                src="https://images.unsplash.com/photo-1761839258045-6ef373ab82a7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"   // replace with your image
                alt="Stimulation"
                className="w-40 h-60 rounded-2xl object-cover shrink-0"
              />

              {/* RIGHT TEXT */}
              <div className="">
                <h3 className="font-semibold text-xl leading-tight text-right">
                  Growing Minds Under Constant Stimulation
                </h3>
                <p className="text-lg text-gray-600 mt-4 text-right">
                  Young nervous systems are overloaded before they learn to regulate themselves.
                </p>
              </div>
            </div>
          </div>
         {showCards && <div className="absolute left-[28%] top-[15%]">
            <img src={Group24} className="h-80" />
          </div>}
          <img
            src={Earth}
            alt="Earth"
            className="max-w-none object-cover"
          />

          {/* LEFT CARD */}
        </div>

        {/* RIGHT SIDE */}
        <div className="text-right px-8 relative">
          <div
            className={`max-w-[520px] bg-green-50 rounded-3xl h-60 border-green-300 ml-32 border-1
              transition-all duration-700
              ${showCards ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none"}`}
          >
            <div className="flex items-center gap-4 pr-4">

              {/* LEFT IMAGE */}
              <img
                src="https://images.unsplash.com/photo-1761839258045-6ef373ab82a7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"   // replace with your image
                alt="Stimulation"
                className="w-40 h-60 rounded-2xl object-cover shrink-0"
              />

              {/* RIGHT TEXT */}
              <div className="">
                <h3 className="font-semibold text-xl leading-tight text-right">
                  Growing Minds Under Constant Stimulation
                </h3>
                <p className="text-lg text-gray-600 mt-4 text-right">
                  Young nervous systems are overloaded before they learn to regulate themselves.
                </p>
              </div>
            </div>
          </div>
          <h1 className="text-6xl leading-[1.05] text-[#0F172A] mt-8">
            Modern life overwhelms <br />
            <span className="text-[#16A34A]">every mind.</span>
          </h1>

          <p className="mt-8 text-lg text-gray-600 leading-relaxed">
            From early childhood to adulthood, constant stimulation, pressure,
            and emotional overload are affecting focus, wellbeing, and inner calm.
          </p>

          {/* BUTTON */}
          <button
            onClick={() => setShowCards(!showCards)}
            className="mt-6 inline-flex items-center gap-2 text-base font-medium underline
                       hover:scale-105 transition-all duration-300"
          >
            {showCards ? "Hide details" : "See what we mean"}
          </button>
          <div className="flex justify-end w-full mt-16">
            <div
              className={`max-w-[520px] bg-green-50 rounded-3xl h-60 border-green-300 border-1
              transition-all duration-700
              ${showCards ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none"}`}
            >
              <div className="flex items-center gap-4 pr-4">

                {/* LEFT IMAGE */}
                <img
                  src="https://images.unsplash.com/photo-1761839258045-6ef373ab82a7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"   // replace with your image
                  alt="Stimulation"
                  className="w-40 h-60 rounded-2xl object-cover shrink-0"
                />

                {/* RIGHT TEXT */}
                <div className="">
                  <h3 className="font-semibold text-xl leading-tight text-right">
                    Growing Minds Under Constant Stimulation
                  </h3>
                  <p className="text-lg text-gray-600 mt-4 text-right">
                    Young nervous systems are overloaded before they learn to regulate themselves.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
       {showCards &&<> <div className="absolute left-[38%] top-[20%]">
          <img src={Group26} className="h-90" />
        </div>
        <div className="absolute left-[45%] top-[52%]">
          <img src={Group27} className="h-70" />
        </div></>}
      </div>
    </section>
  );
};

export default ModernProblem;