import React from 'react'
import JoinMeeting from './JoinMeeting'
import Room from './Room'

const SessionsAndRoom = () => {
  return (
    <div className="p-6 md:p-10 min-h-screen">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Meetings</h1>
          
          {/* Grid layout - responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Join Meeting Card */}
            <div className="w-full">
              <JoinMeeting />
            </div>
            
            {/* Room/Live Session Card */}
            <div className="w-full">
              <Room  />
            </div>
          </div>
        </div>
  )
}

export default SessionsAndRoom