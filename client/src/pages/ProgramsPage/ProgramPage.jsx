import React from 'react'
import LandingSidebar from '../LandingPage/LandingSidebar/LandingSidebar'
import Programs from './Programs'
import AvyaktSystem from './AvyaktSystem'

const ProgramPage = () => {
  return (
    <>
        <div className='sticky top-0 z-10'>
            <LandingSidebar />
        </div>
        <Programs />
        <AvyaktSystem />
    </>
  )
}

export default ProgramPage