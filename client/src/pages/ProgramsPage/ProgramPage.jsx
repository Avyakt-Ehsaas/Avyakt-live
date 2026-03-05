import React from 'react'
import LandingSidebar from '../LandingPage/LandingSidebar/LandingSidebar'
import Programs from './Programs'
import AvyaktSystem from './AvyaktSystem'
import ProgramSections from './ProgramSections'
import StudentPressureSection from './StudentPressureSection'
import StructureProgram from './StructureProgram'

const ProgramPage = () => {
  return (
    <>
        <div className='sticky top-0 z-20'>
            <LandingSidebar className="z-40"/>
        </div>
        <Programs />
        <AvyaktSystem />
        <ProgramSections />
        <StudentPressureSection />
        <StructureProgram />
    </>
  )
}

export default ProgramPage