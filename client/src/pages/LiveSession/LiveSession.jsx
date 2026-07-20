import React from 'react'
import HeroSection from './HeroSection'
import LandingSidebar from '../LandingPage/LandingSidebar/LandingSidebar'
import StatsBar from './StatsBar'
import ScienceSection from './ScienceCards'
import ProgressSection from './ProgressSection'
import PracticeSection from './PracticeSection'
import LegendarySection from './LegendarySection'

import TestimonialCarousel from '../LandingPage/Testimonials/TestimonialCarousel'
import Footer from './Footer'
import VisionSection from './VisionSection'
import YearlyJourney from './YearlyJourney'
import BenefitsStageLife from './BenifitsStageLife'
import Pricing from './Pricing'

const LiveSession = () => {
  return (
    <>
    <section>
        <div className='sticky top-0 z-20'>
        <LandingSidebar className="z-40" />
      </div>
        <HeroSection />
        <StatsBar />
        <ScienceSection />
        <BenefitsStageLife />
        <ProgressSection />
        <PracticeSection />
        <LegendarySection />
        <VisionSection />
        <YearlyJourney />
        <TestimonialCarousel />
        <Pricing />
        <Footer />
    </section>
    </>
  )
}

export default LiveSession