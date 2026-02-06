import React from 'react'
import YouthSectionBg from '../../assets/images/YouthSectionBg.svg'

const YoungAdultSection = () => {
  return (
    <>
        <section className='min-h-screen md:pt-[4rem] pt-[2rem] relative bg-white overflow-hidden' >
            <div 
                className="absolute  inset-0 w-full h-full bg-no-repeat bg-center"
                style={{ 
                    backgroundImage: `url(${YouthSectionBg})`, 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                }}
            >
            </div>
            
            <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
                <div className="absolute left-[2rem] bottom-4 md:min-w-5xl text-left">
                    {/* Top pill */}
                    <div className="flex justify-start mb-2 ">
                        <h3 className="inline-flex items-center rounded-full bg-greenbase px-8 py-3 font-rubik text-[18px] text-[#191919]">
                            For young adults (12–25 years)
                        </h3>
                    </div>

                    {/* Heading */}
                    <h1 className="mt-3 font-semibold text-[45px] leading-[50px] tracking-tight text-[#191919]">
                        Your mind doesn't get a <span className='text-greenbase'> pause</span>
                        <br />
                     anymore right?
                    </h1>

                    {/* Body */}
                    <p className="mt-3 text-[#191919] text-[18px] leading-[30px] text-base" style={{ fontFamily: "DM Sans, sans-serif" }}>
                       Between expectations, comparison, and an always-on digital world, thinking never really stops. <br />Meditation here isn’t about fixing yourself — it’s about creating space to breathe, reset, and hear your own <br /> thoughts again.
                    </p>
                </div>
            </div>
        </section>
    </>
  )
}

export default YoungAdultSection