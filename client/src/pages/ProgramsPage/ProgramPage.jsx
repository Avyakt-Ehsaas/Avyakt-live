import React, { act, useState } from 'react'
import LandingSidebar from '../LandingPage/LandingSidebar/LandingSidebar'
import Programs from './Programs'
import AvyaktSystem from './AvyaktSystem'
import ProgramSections from './ProgramSections'
import FirstProgramComponent from './FirstProgramComponent.jsx'

import ProgramFooter from './ProgramFooter'

import programsTabData from './ProgramData.js'

import SecondProgramComponent from './SecondProgramComponent.jsx'
import ResearchShows from './ResearchShows.jsx'
import MeditationLayout from './Organized.jsx'
import MatchingWorks from './MatchingWorks.jsx'
import { Library } from 'lucide-react'
import LibrarySection from './Library.jsx'

const ProgramPage = () => {

  const [activeTab, setActiveTab] = useState("school");

  const data = programsTabData[activeTab];

  return (
    <>
      <div className='sticky top-0 z-20'>
        <LandingSidebar className="z-40" />
      </div>
      <Programs />
        <MeditationLayout />
        <MatchingWorks />
        <LibrarySection />
        <ProgramFooter data={data.footer} />

    </>
  )
}

export default ProgramPage
