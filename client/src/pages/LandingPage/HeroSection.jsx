
import React,{ useEffect, useRef } from 'react'
import HeroImage from '../../assets/images/HeroImage.svg'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    try {
      navigate("/dashboard");
       } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  }

  return (
   <>
  <div className="relative w-full h-screen overflow-hidden">
 
      <img
        // src={heroSectionImage}
        src={HeroImage}
        alt="Hero"
        className='absolute bottom-0 md:-bottom-0 lg:-bottom-0 xl:-bottom-10 right-0 bg-[#191919] w-auto h-auto min-w-full min-h-full object-cover z-0'
      />
      <div className=" z-10"></div>
    
      <div className="absolute inset-0 flex items-center justify-center z-40">

        <div className="text-white font-season-medium text-center md:mt-[1rem]">
              <h1 className='mb-3 mx-18 md:mx-0 md:text-5xl 3xl:text-6xl text-3xl/12'>Discover Your {" "}
                <span className='text-greenbase-light'>Avyakt Potential</span> 
                <br />
                Through <span className='text-greenbase-light'>Meditation</span></h1>
                <p className='text-lg mb-4 font-medium font-dm'>Whether you want to stay focused, feel calmer, or simply feel better we <br /> help you build a healthier relationship with your mind.</p>
                <p className='text-greenbase-light text-[1.1rem] font-medium font-dm'>Join the 21-Day Live Meditation Journey</p>
                <button 
                onClick={handleClick}
                className='bg-greenbasebg mb-2 text-white font-semibold font-dm mt-4 px-4 py-3 rounded-full'>Start Your Journey</button>
                <div className='flex justify-center'>
                 <div className=" flex justify-center items-center">
          {[1, 2, 3].map((i) => (
            <img
              key={i}
              src={`https://randomuser.me/api/portraits/${i % 2 ? "women" : "men"}/${i}.jpg`}
              alt={`user${i}`}
              className="w-8 h-8 rounded-full"
              style={{ marginLeft: i > 0 ? '-5px' : '0' }}
            />
          ))}
        </div>                
                  <p className='ml-2 mt-2 font-medium font-dm'>Trusted by 500+ users on their wellness journey</p>
                </div>
        </div>
      </div>
    </div>
   </>
  ) 
 }


export default HeroSection 