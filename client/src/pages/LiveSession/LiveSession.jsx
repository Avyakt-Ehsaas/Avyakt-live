import React from 'react'
import HeroSection from './HeroSection.jsx'
import LandingSidebar from '../LandingPage/LandingSidebar/LandingSidebar'
import ScienceSection from './ScienceCards'
import WhyFifteenMinutes from './WhyFifteenMinutes.jsx'
import ProgressSection from './ProgressSection'
import LegendarySection from './LegendarySection'
import MarqueeStrip from './MarqueeStrip.jsx'

import TestimonialCarousel from '../LandingPage/Testimonials/TestimonialCarousel'
import Footer from './Footer'
import YearlyJourney from './YearlyJourney'
import Pricing from './Pricing'
import PersonYouBecomeSection from './PersonYouBecomeSection.jsx'
import HowItWorkLS from './HowItsWorkLS.jsx'
import QRLeadModal from '../../components/ui/Modal/QRLeadModal.jsx'

const LiveSession = () => {
  return (
    <>
    <section>
        <div className='sticky top-0 z-20'>
        <LandingSidebar className="z-40" />
      </div>
        <HeroSection />
        <MarqueeStrip />
        <ScienceSection />
        <WhyFifteenMinutes />
        <PersonYouBecomeSection />
        <HowItWorkLS />
        <ProgressSection />
        <LegendarySection />
        <YearlyJourney />
        <TestimonialCarousel />
        <Pricing />
        <Footer />
        <QRLeadModal />
    </section>
    </>
  )
}

export default LiveSession