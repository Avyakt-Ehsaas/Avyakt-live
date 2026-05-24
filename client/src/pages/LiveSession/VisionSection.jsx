import React from 'react'
import LiveSessionFounderBg from "../../assets/images/LiveSessionFounderBg.png";
import AmritFounder from "../../assets/images/AmritFounder.png";
import VisionMainBg from "../../assets/images/VisionMainBg.png";

const VisionSection = () => {

    const points = ["500+ consecutive live sessions","5+ years of consistent daily practice","Research affiliate, Mahindra University","MS — AI & Neuroscience","Gurugram, India"]


  return (
    <>
  <section className="relative w-full py-20 overflow-hidden bg-white">

  {/* Center Background Image */}
 <img
  src={VisionMainBg}
  alt="background shape"
  className="
    absolute
    left-1/2
    top-1/2
    z-0
    w-[320%]
    max-w-none
    -translate-x-1/2
    -translate-y-1/2
    opacity-90
    object-cover
    min-h-[100%]
    sm:w-[170%]
    md:w-full
  "
/>

<div className="pointer-events-none absolute left-0 top-0 z-[1] h-[320px] w-full bg-gradient-to-b from-white via-white/90 to-transparent" />

  {/* BOTTOM → TOP FADE */}
  <div className="pointer-events-none absolute bottom-0 left-0 z-[1] h-[280px] w-full bg-gradient-to-t from-white via-white/60 to-transparent" />

{/* Desktop Fade */}
<div className="hidden md:block pointer-events-none absolute left-0 top-0 z-[1] h-[320px] w-full bg-gradient-to-b from-white via-white/90 to-transparent" />

{/* Mobile Top → Bottom Fade */}
<div className="pointer-events-none absolute inset-0 z-[1] md:hidden bg-[linear-gradient(to_bottom,#ffffff_0%,rgba(255,255,255,1)_20%,rgba(255,255,255,0.72)_38%,rgba(255,255,255,0.18)_58%,transparent_78%)]" />


  {/* Optional soft blur glow */}
  <div className="pointer-events-none absolute bottom-[1px] left-1/2 z-[1] h-[280px] w-[120%] -translate-x-1/2 rounded-full bg-white blur-[120px]" />


  {/* Main Container */}
  <div className="relative z-10 max-w-[1280px] mx-auto px-6">
    
    <div className="flex items-center justify-center gap-8 flex-col lg:flex-row px-1 md:px-12">

      {/* Founder Image */}
      <div className="relative flex-1 flex justify-center items-center max-w-[480px]">
        <img
          src={AmritFounder}
          alt="Founder"
          className="w-full max-w-[420px] rounded-[32px] object-cover"
        />
      </div>

      {/* Right Content Card */}
      <div className="flex-1 w-full  md:max-w-[720px]">
        <div className="bg-white backdrop-blur-md rounded-[32px] p-8 shadow-lg border border-white/40">
          
          <span className="text-greenbase font-dm paragrapg-body font-med uppercase text-left">
            THE VISION
          </span>

          <h2 className="mt-2 text-primary font-season-medium heading-main text-left">
            "A researcher who meditates. A meditator who researches."
          </h2>

          <p className="mt-2 text-gray font-dm paragraph-body text-left">
            I came to meditation as a researcher, trained in AI and
neuroscience, curious about what was actually happening in
the brain. What I found went beyond the data.
          </p>

            <ul className="mt-4 space-y-2">
                 {points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <span className="h-2 w-2 mt-2 rounded-full bg-[#706E6E]" />
                        <p className="text-gray font-dm paragraph-secondary text-left"> 
                            {point}
                        </p>
                    </li>
                ))}
                </ul>

        </div>
      </div>

    </div>
  </div>


</section>
    </>
  )
}

export default VisionSection