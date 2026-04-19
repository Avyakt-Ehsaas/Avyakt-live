import React from "react";
import ProgramBg from "../../assets/images/ProgramBg.png";
import ProgramBgImage from '../../assets/images/ProgramBgImage.png'

const Programs = () => {
  return (
    <div className="relative w-full min-h-[110vh] 2xl:min-h-screen overflow-hidden overflow-y-auto z-1 flex justify-center items-center">

      {/* Background Image */}
      <img        
      src={ProgramBgImage}
      alt="Hero"
      className='absolute bottom-0 right-0 w-auto h-auto min-w-full min-h-full object-cover z-0'
      />
      {/* Light Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-transparent"></div>
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-6xl font-season">
          {/* Heading */}
          <h1 className="heading-main font-season font-med text-primary">
            A base program. Built for your problem.
          </h1>
          {/* Subtext */}
          <p className="mt-2 max-w-5xl text-center text-primary font-dm paragraph-body font-med">
           Every Avyakt program starts from the same rigorous foundation, structured meditation grounded in published neuroscience. Then we layer what your specific audience actually needs on top of it. <br />Same science. Different problem. Different program.
          </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center px-8 mt-6">
              <button
                className="bg-greenbasebg  w-full sm:w-[300px] text-white font-semibold font-dm px-4 py-4 rounded-full hover:scale-105 transition-all duration-300"
              >
                Talk to us about your context
              </button>

              <button
                className="bg-transparent border w-full sm:w-[260px] text-white font-semibold font-dm px-4 py-4 rounded-full hover:scale-105 transition-all duration-300"
              >
                See Programs
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Programs;