import React from 'react'
import LandingSidebar from '../LandingPage/LandingSidebar/LandingSidebar'
import Programs from './Programs'
import AvyaktSystem from './AvyaktSystem'
import ProgramSections from './ProgramSections'

const ProgramPage = () => {
  return (
    <>
        <div className='sticky top-0 z-10'>
            <LandingSidebar className="z-40"/>
        </div>
        <Programs />
        <AvyaktSystem />
        <ProgramSections />
    </>
  )
}

export default ProgramPage