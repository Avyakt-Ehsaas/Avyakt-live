import React, { useState, useEffect ,useRef} from 'react';
import { motion } from 'framer-motion';
import API from '../../utils/api';
import { Video, Phone, Settings, Users, Clock, Calendar, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';


const Room = () => {
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [roomId, setRoomId] = useState(`AvyaktEhsaas-${Math.floor(Math.random() * 100000)}`);
  const [isMeetingStarted, setIsMeetingStarted] = useState(false);

  const jitsiContainerRef = useRef(null);

const loadJitsiScript = () => {
  return new Promise((resolve) => {
    if (window.JitsiMeetExternalAPI) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};



useEffect(() => {
  if (!isMeetingStarted) return;

  let api;

  const startMeeting = async () => {
    await loadJitsiScript(); // wait until script loads

    const domain = "meet.jit.si";

   const options = {
  roomName: roomId,
  width: "100%",
  height: 600,
  parentNode: jitsiContainerRef.current,
  userInfo: {
    displayName: user?.name || "Anonymous User",
    email: user?.email || undefined
  },

  configOverwrite: {
    prejoinPageEnabled: false, 
    enableWelcomePage: false,
    startWithAudioMuted: false,
    startWithVideoMuted: false,
    enableLobby: false, 
    requireDisplayName: false,
    enableLobbyChat: false,disableDeepLinking: true, disableInviteFunctions: true, disableRecordAudioNotification: true, disableRemoteMute: true, disableRemoteVideoMute: true, disableModeratorIndicator: true, disableProfile: true, disableCalendarIntegration: true, disableClosePage: true, disableTileView: false, enableClosePage: false, enableTileView: true, hideLobbyButton: true, hideConferenceSubject: true, hideMeetingPassword: true, hideInviteMoreHeader: true, hideInviteMoreFooter: true, hideParticipantsStats: true, hideRecordingLabel: true, hideReactions: true, hideShareAudioHelper: true, hideShareVideoHelper: true, hideShortcutsHint: true, hideWatermark: true, showBrandWatermark: false,
showJitsiWatermark: false
  },

  interfaceConfigOverwrite: {
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
  }
};


    api = new window.JitsiMeetExternalAPI(domain, options);
  };

  startMeeting();

  return () => {
    if (api) api.dispose();
  };
}, [isMeetingStarted, roomId, user]);



  const joinMeeting = () => {
  setIsMeetingStarted(true);
};


  return (
    // <motion.div
    //   initial={{ opacity: 0, scale: 0.95 }}
    //   animate={{ opacity: 1, scale: 1 }}
    //   whileHover={{ y: -8 }}
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    //   className='bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 h-full'
    // >
    //   {/* Header with gradient */}
    //   <div className='relative h-40 md:h-48 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 overflow-hidden'>
    //     {/* Video Icon Background */}
    //     <div className='absolute inset-0 flex items-center justify-center opacity-10'>
    //       <Video size={100} className='text-white' />
    //     </div>

    //     {/* Live Badge */}
    //     <motion.div
    //       animate={{ scale: [1, 1.1, 1] }}
    //       transition={{ duration: 2, repeat: Infinity }}
    //       className='absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-red-300/50'
    //     >
    //       <div className='w-2 h-2 bg-white rounded-full animate-pulse'></div>
    //       <span className='text-xs font-semibold'>Live Now</span>
    //     </motion.div>

    //     {/* Title Overlay */}
    //     <div className='absolute inset-0 flex flex-col justify-end p-4 md:p-6 bg-gradient-to-t from-black/40 to-transparent'>
    //       <h2 className='text-xl md:text-3xl font-bold text-white mb-1 md:mb-2'>Meeting Title</h2>
    //       <p className='text-blue-100 text-xs md:text-sm'>Hosted by Avyakt-Ehsaas</p>
    //     </div>
    //   </div>

    //   {/* Content Section */}
    //   <div className='p-4 md:p-6 space-y-4'>
    //     {/* Meeting Info Grid */}
    //     <div className='grid grid-cols-2 gap-2 md:gap-4'>
    //       <div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 md:p-4 border border-blue-200'>
    //         <div className='flex items-center gap-2 mb-1 md:mb-2'>
    //           <Calendar size={16} className='text-blue-600 hidden sm:block' />
    //           <span className='text-xs text-gray-600 uppercase font-semibold'>Date</span>
    //         </div>
    //         <p className='text-gray-800 font-semibold text-sm md:text-base'>Date</p>
    //       </div>

    //       <div className='bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 md:p-4 border border-purple-200'>
    //         <div className='flex items-center gap-2 mb-1 md:mb-2'>
    //           <Clock size={16} className='text-purple-600 hidden sm:block' />
    //           <span className='text-xs text-gray-600 uppercase font-semibold'>Time</span>
    //         </div>
    //         <p className='text-gray-800 font-semibold text-sm md:text-base'>Start time</p>
    //       </div>

    //       <div className='bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 md:p-4 border border-green-200'>
    //         <div className='flex items-center gap-2 mb-1 md:mb-2'>
    //           <Users size={16} className='text-green-600 hidden sm:block' />
    //           <span className='text-xs text-gray-600 uppercase font-semibold'>Attendees</span>
    //         </div>
    //         <p className='text-gray-800 font-semibold text-sm md:text-base'>Attendees Count</p>
    //       </div>

    //       <div className='bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3 md:p-4 border border-orange-200'>
    //         <div className='flex items-center gap-2 mb-1 md:mb-2'>
    //           <Clock size={16} className='text-orange-600 hidden sm:block' />
    //           <span className='text-xs text-gray-600 uppercase font-semibold'>Duration</span>
    //         </div>
    //         <p className='text-gray-800 font-semibold text-sm md:text-base'>Duration</p>
    //       </div>
    //     </div>

    //     {/* Meeting ID */}
    //     <div className='bg-gray-100 rounded-xl p-3 md:p-4 border border-gray-300'>
    //       <p className='text-xs text-gray-500 uppercase font-semibold mb-1'>Meeting ID</p>
    //       <p className='text-gray-800 font-mono font-bold text-sm md:text-lg'>Meet id</p>
    //     </div>

    //     {/* Action Buttons */}
    //     <div className='flex gap-2 md:gap-3 pt-2'>
    //       <motion.button
    //         whileHover={{ scale: 1.05 }}
    //         whileTap={{ scale: 0.95 }}
    //         onClick={joinMeeting}
    //         disabled={isJoining}
    //         className='flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-2.5 md:py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm md:text-base'
    //       >
    //         <Video size={18} />
    //         <span className='hidden sm:inline'>{isJoining ? 'Joining...' : 'Join Now'}</span>
    //         <span className='sm:hidden'>{isJoining ? 'Joining...' : 'Join'}</span>
    //       </motion.button>

    //       <motion.button
    //         whileHover={{ scale: 1.05 }}
    //         whileTap={{ scale: 0.95 }}
    //         className='px-3 md:px-4 py-2.5 md:py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-all'
    //       >
    //         <Settings size={18} />
    //       </motion.button>
    //     </div>

    //     {/* Footer Info */}
    //     <div className='text-center text-xs text-gray-500 pt-2 border-t border-gray-200'>
    //       <p className='hidden sm:block'>Meeting in progress • participants</p>
    //       <p className='sm:hidden'>Live people</p>
    //     </div>
    //   </div>
    // </motion.div>
     <>
    {!isMeetingStarted ? (
      <motion.div>
        {/* Your Premium Card UI */}
        <button onClick={joinMeeting}>
          Join Now
        </button>
      </motion.div>
    ) : (
      <div ref={jitsiContainerRef} />
    )}
  </>
  );
};

export default Room;