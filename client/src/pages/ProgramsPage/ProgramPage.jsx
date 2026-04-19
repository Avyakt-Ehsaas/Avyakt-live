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

const ProgramPage = () => {

  const [activeTab, setActiveTab] = useState("school");

  const data = programsTabData[activeTab];

  return (
    <>
      <div className='sticky top-0 z-20'>
        <LandingSidebar className="z-40" />
      </div>
      <Programs />
      <AvyaktSystem />
      <div key={activeTab}>
        <ProgramSections
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          data={data.firstPage}
        />
        <FirstProgramComponent data={data.secondPage} index={"01"} />
        <SecondProgramComponent data={data.thirdPage} index={"02"} />
        <FirstProgramComponent data={data.fourthPage} index={"03"} />
        <SecondProgramComponent data={data.fifthPage} index={"04"} />

        <ResearchShows data={data.researchShows} />

        <ProgramFooter data={data.footer} />

      </div>

    </>
  )
}

export default ProgramPage
