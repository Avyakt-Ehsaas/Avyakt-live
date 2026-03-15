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
import System from './System.jsx'

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
<<<<<<< HEAD
        <ProgramFooter data={data.sixthPage} />
        {/* <DhyanLabs data={data.sixthPage} /> */}
=======
        <System/>
        <ProgramFooter data={data.sixthPage} />
        
>>>>>>> 15808f0ead9969943fce6b435b0b27f38868bf3e
    </>
  )
}

export default ProgramPage
