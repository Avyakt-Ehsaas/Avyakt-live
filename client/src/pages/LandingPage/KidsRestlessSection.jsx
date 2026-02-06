import React, { useState } from "react";
import Kid1 from '../../assets/images/Kid1.svg'
import Kid2 from '../../assets/images/Kid2.svg'
import Kid3 from '../../assets/images/Kid3.svg'
import Kid4 from '../../assets/images/Kid4.svg'
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { EyeOff } from "lucide-react";

const KidsRestlessSection = () => {
  const [isToggled , setIsToggled] = useState(false)

  const handleToogle = () => {
    try {
      setIsToggled(!isToggled)
    } catch (error) {
      console.log(error)
    }
  }

  const Card = ({ image, title, description, position }) => (
    <div className={`bg-[#C2E0BA]/20 w-[22rem] rounded-xl shadow-sm border border-gray-100 text-[#1c1c1c] hover:shadow-md transition-shadow duration-300 ${
      position === 'left' ? 'rounded-r-none' : 'rounded-l-none'
    }`}>
      <div className="flex items-start space-x-4 ">
        <div className="flex-shrink-0 w-[6rem]  rounded-lg flex items-center justify-evenly">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mr-2 mt-[1rem] flex flex-col self-center">
          <p className="text-gray-600 text-[12px] leading-relaxed font-inter">
            {description}
          </p>
          <h3 className="text-sm font-semibold text-gray-900 mb-2 font-inter mt-2">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );

  return (
    <>
    <section className="relative h-[60vh] md:min-h-screen pt-[8rem] w-full bg-white flex items-center justify-center px-6 py-16 overflow-hidden">
     {/* animated cards */}
    
    <AnimatePresence>
          {isToggled && (
            <motion.div
              initial={{ x: -400, y: -200, opacity: 0 }}
              animate={{ x: -210, y: -200, opacity: 1 }}
              exit={{ x: -400, y: -200, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="mt-8"
            >
             <div className="absolute">
               <Card 
                image={Kid1} 
                title="Shortened Attention Span" 
                description="Constant screen exposure (short videos, fast visuals) which can make sustained focus difficult in school"
                position="left"
              />
             </div>
            </motion.div>
          )}
        </AnimatePresence>


        <AnimatePresence>
          {isToggled && (
            <motion.div
              initial={{ x: -400 , y: 50, opacity: 0 }}
              animate={{ x: -210,y: 50, opacity: 1 }}
              exit={{ x: -400, y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="mt-8"
            >
             <div className="absolute">
               <Card 
                image={Kid3} 
                title="Emotional Dysregulation" 
                description="Kids feel big emotions but don't have tools to name or process them which leads to meltdowns, withdrawal, or aggression"
                position="left"
              />
             </div>
            </motion.div>
          )}
        </AnimatePresence>

          <AnimatePresence>
          {isToggled && (
            <motion.div
              initial={{ x: 750, y: -280, opacity: 0, }}
              animate={{ x: 620, y: -280, opacity: 1 }}
              exit={{ x: 750, y: -280, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              
              className="mt-8"
            >
             <div className="absolute">
               <Card 
                image={Kid2} 
                title="Reduced Body Awareness" 
                description="Less outdoor play, more passive consumption. Disconnection from breath and bodily signals"
                position="right"
              />
             </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isToggled && (
            <motion.div
              initial={{ x: 750, y: 50, opacity: 0 }}
              animate={{ x: 620, y: 50, opacity: 1 }}
              exit={{ x: 750, y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="mt-8"
            >
             <div className="absolute">
               <Card 
                image={Kid4} 
                title="Increased Anxiety & Fearfulness" 
                description="Exposure to adult stress, news, performance pressure. Lack of emotional safety and grounding"
                position="right"
              />
             </div>
            </motion.div>
          )}
        </AnimatePresence>

      <div className="w-full max-w-3xl text-center">
        {/* Top pill */}
        <div className="flex justify-center">
          <h3 className="inline-flex items-center rounded-full bg-greenbase px-8 py-3 text-lg font-rubik">
            For Kids (6–12 years)
          </h3>
        </div>

        {/* Heading */}
        <h1 className="mt-1 font-medium text-[36px] md:text-[56px] leading-[60px] md:leading-[70px] tracking-tight" >
          Feeling <span className="text-greenbase">restless</span> or
          <br />
          easily <span className="text-greenbase">distracted?</span>
        </h1>

        {/* Body */}
        <p className="mt-4 text-[12px] md:text-[16px] text-gray-700 text-base " style={{ fontFamily: "DM Sans, sans-serif" }}>
          Screens, constant stimulation, and early pressure are shaping
          <br className="hidden sm:block" />
          young minds faster than they can process.
          <br />
          Many children struggle with focus, emotional regulation, and
          <br className="hidden sm:block" />
          anxiety — not because they’re difficult, but because their
          <br className="hidden sm:block" />
          nervous systems are overwhelmed.
        </p>

        {/* Link */}
        <button
          onClick={() => handleToogle()}
          className="mt-6 inline-block text-sm  text-gray-900 underline underline-offset-4 decoration-1 decoration-black"
        >
          {isToggled ?( 
            <div className="flex gap-3"> <EyeOff size={16} className="mt-[1px]" /> Hide me</div>
            ) 
            : "See what we mean"}
        </button>
      </div>
    </section>
          </>
  );
};

export default KidsRestlessSection;