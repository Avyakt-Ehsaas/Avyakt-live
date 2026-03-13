import React,{act, useState} from 'react'
import LandingSidebar from '../LandingPage/LandingSidebar/LandingSidebar'
import Programs from './Programs'
import AvyaktSystem from './AvyaktSystem'
import ProgramSections from './ProgramSections'
import StudentPressureSection from './StudentPressureSection'
import StructureProgram from './StructureProgram'
import ProgramGrowth from './ProgramGrowth'
import ProgramFooter from './ProgramFooter'
import DhyanLabs from './DhyanLabs'

import programsTabData from './ProgramData.js'

const ProgramPage = () => {

  const [activeTab,setActiveTab] = useState("school");

  const data = programsTabData[activeTab];
  console.log(data)
  return (
    <>
        <div className='sticky top-0 z-20'>
            <LandingSidebar className="z-40"/>
        </div>
        <Programs />
        <AvyaktSystem />
        <ProgramSections 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          data={data.firstPage}
        />
        <StudentPressureSection data={data.secondPage} />
        <ProgramGrowth data={data.fourthPage} />
        <StructureProgram data={data.fifthPage} />
        <DhyanLabs data={data.sixthPage} />
        <ProgramFooter />
    </>
  )
}

export default ProgramPage