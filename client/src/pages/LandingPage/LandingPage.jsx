import LandingSidebar from './LandingSidebar/LandingSidebar'
import React from 'react'
import { useEffect,useState } from 'react'
import HeroSection from './HeroSection.jsx'
import HeroText from './HeroToText.jsx'
import KidsRestlessSection from './KidsRestlessSection.jsx'
import LoginModal from '../../components/ui/Modal/LoginModal.jsx'
import YoungAdultSection from './YoungAdultSection.jsx'

const LandingPage = () => {
  return (
    <>
      <div className='bg-[#FFF6EF] min-h-screen'>
        <div>
            <div className='flex justify-around'>
            <LandingSidebar />
            <HeroSection />
             </div>
            <HeroText />
            <LoginModal />
            <KidsRestlessSection />
            <YoungAdultSection />
        </div>
      </div>
    </>
  )
}

export default LandingPage