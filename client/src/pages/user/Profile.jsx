import React, { useEffect, useState } from 'react';
import { FiUser, FiMail, FiPhone, FiCalendar, FiClock as FiClockIcon, FiAward, FiTrendingUp, FiActivity, FiZap, FiSmile } from 'react-icons/fi';
import { GiTreeGrowth, GiMeditation, GiSoulVessel, GiCalendar, GiDuration } from 'react-icons/gi';
import API from '../../utils/api';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// --- Animation Variants ---
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
};

const statCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 10 } },
};

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);
  const [avgSeconds, setAvgSeconds] = useState(0);
  const [sessions,setSessions] = useState([])
  const [avgMeditationDuration,setAvgMeditationDuration] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  const [treeAge,setTreeAge] = useState("");
  const treeStage = [
    "Seedling","Sprout","Baby Plant","Plant","Tree"
  ]

  // --- Utility Functions ---
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

useEffect(()=>{
  const fetchUserMeetHistory = async() => {
    try {
   const res = await API.get("/meetings/history")

    const session =  res?.data.data;
    if (Array.isArray(session)) {
      setSessions(session);
      // Ensure session[0] exists before accessing properties
      setAttendance(session.length > 0 ? session.length : 0);
    }
    } catch (error) {
      toast.error("failed to fetch user meeting sessions")
    }
  }
    if(user){
      fetchUserMeetHistory()
    }
},[])

const calculateTotalDuration = (sessionArr) => {
  
    if (!sessionArr || sessionArr.length === 0) {
        console.log("Input array is empty or invalid.");
        return 0;
    }
    
    let total = 0;
    let sessionWithDur = 0;


    sessionArr.forEach(meeting => {
        const attendeesRecord = meeting?.session?.attendees
               
        if (attendeesRecord && typeof attendeesRecord.duration === "number") {
            total += attendeesRecord.duration;
            sessionWithDur++;
       
        }
    });

    if (sessionWithDur === 0) {
        console.log("No valid duration found.");
        return 0;
    }
    
    const avg = total / sessionWithDur;
    console.log("Calculated Average:", avg);
    
     return avg.toFixed(2);
};


useEffect(() => {
     if(sessions.length > 0){
      const avg = calculateTotalDuration(sessions);
    setAvgMeditationDuration(avg);
     }else{
      setAvgSeconds(0);
     }
},[sessions])
 
console.log(sessions)

  useEffect(() => {
    if (user?.currentStreak) {
      setTreeAge(treeStage[5%user?.currentStreak]);
    }
  },[user])
 

  // --- Component Render ---
  return (
    <motion.div className="min-h-screen pt-15 md:pt-32 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden text-gray-800 px-4 sm:px-6 lg:px-8 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
            className="flex items-center space-x-6 mb-12" 
            initial="hidden" 
            animate="visible" 
            variants={itemVariants}
        >
          <div className="group relative p-4 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <FiUser className="w-10 h-10" />
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient bg-300">
                {user?.name?.split(' ')[0].substring(0,1).toUpperCase()}{user?.name?.split('@')[0].substring(1)}'s Profile 
            </h1>
            <p className="mt-2 text-lg text-gray-600 font-light">Your personal meditation journey</p>
          </div>
        </motion.div>

        {/* User Info Card */}
        <motion.div 
            className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 p-8 mb-12" 
            variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8">
              {/* Avatar & Tree Info */}
              <div className='flex flex-col items-center space-y-4'>
                  <div className="group/avatar relative h-36 w-36 rounded-2xl border-4 border-gradient-to-r from-purple-400 to-pink-400 overflow-hidden bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300"></div>
                      {user?.profilePicture ? (
                          <img src={user.profilePicture} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                          <div className="relative z-10 text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{user?.name?.charAt(0)}</div>
                      )}
                  </div>
                  
                  {/* Status Badge */}
                  <div className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-full text-sm font-semibold shadow-lg">
                      🌿 Active Member
                  </div>
              </div>
              
              {/* Details */}
              <div className="flex-1 space-y-4">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{ user?.name?.split(' ')[0].substring(0,1).toUpperCase()}{user?.name?.split('@')[0].substring(1)|| 'User Profile'}</h2>
                  <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-white/40 backdrop-blur-sm rounded-xl border border-white/30">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                              <FiMail className="w-4 h-4 text-white" />
                          </div>
                          <div>
                              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Email</p>
                              <p className="text-sm font-medium text-gray-800">{user?.email || 'N/A'}</p>
                          </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/40 backdrop-blur-sm rounded-xl border border-white/30">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                              <FiPhone className="w-4 h-4 text-white" />
                          </div>
                          <div>
                              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Phone</p>
                              <p className="text-sm font-medium text-gray-800">{user?.phone || 'N/A'}</p>
                          </div>
                      </div>
                      {user?.createdAt && (
                          <div className="flex items-center gap-3 p-3 bg-white/40 backdrop-blur-sm rounded-xl border border-white/30">
                              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                                  <GiCalendar className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Member Since</p>
                                  <p className="text-sm font-medium text-gray-800">{formatDate(user.createdAt)}</p>
                              </div>
                          </div>
                      )}
                      {user?.location && (
                          <div className="flex items-center gap-3 p-3 bg-white/40 backdrop-blur-sm rounded-xl border border-white/30">
                              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                              </div>
                              <div>
                                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Location</p>
                                  <p className="text-sm font-medium text-gray-800">{user.location}</p>
                              </div>
                          </div>
                      )}
                  </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={{
                visible: { transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            animate="visible"
        >
            {/* Current Streak */}
            <motion.div className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 p-6 hover:scale-105" variants={statCardVariants}>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                    <div className="flex items-center">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-lg mr-4">
                            <FiZap className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Current Streak</p>
                            <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                {user?.currentStreak || 0}
                            </p>
                            <p className="text-sm font-medium text-orange-600">days</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Total Sessions Attended */}
            <motion.div className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 p-6 hover:scale-105" variants={statCardVariants}>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                    <div className="flex items-center">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg mr-4">
                            <GiSoulVessel className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Sessions</p>
                            <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                {sessions?.length || 0}
                            </p>
                            <p className="text-sm font-medium text-pink-600">sessions</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Total Meditation Time */}
            <motion.div className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 p-6 hover:scale-105" variants={statCardVariants}>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                    <div className="flex items-center">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-purple-400 to-blue-400 text-white shadow-lg mr-4">
                            <GiMeditation className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Time</p>
                            <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                {(avgMeditationDuration * sessions?.length || 0)}
                            </p>
                            <p className="text-sm font-medium text-purple-600">minutes</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Average Meditation Time */}
            <motion.div className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 p-6 hover:scale-105" variants={statCardVariants}>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-lime-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                    <div className="flex items-center">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-green-400 to-lime-400 text-white shadow-lg mr-4">
                            <FiClockIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Avg Duration</p>
                            <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent">
                                {Math.ceil(avgMeditationDuration)}
                            </p>
                            <p className="text-sm font-medium text-green-600">minutes</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Current Tree Stage */}
            <motion.div className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 p-6 col-span-full sm:col-span-2 hover:scale-105" variants={statCardVariants}>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                    <div className="flex items-center">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-lg mr-4">
                            <GiTreeGrowth className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Tree Status</p>
                            <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                {treeStage[5%user?.currentStreak]}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 space-y-3 text-sm text-gray-600 border-t border-gray-200 pt-4">
                        <div className='flex justify-between items-center'>
                            <span className="font-medium">Age:</span>
                            <span className='font-bold text-gray-800'>{user?.currentStreak} days</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span className="font-medium">Forest Size:</span>
                            <span className='font-bold text-gray-800'>{user?.forest?.length || 0} trees</span>
                        </div>
                        {user?.currentTree?.progress !== undefined && (
                            <div className='pt-2'>
                                <p className='mb-2 font-medium'>Stage Progress ({user.currentTree.progress}%):</p>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div 
                                        className="h-3 rounded-full transition-all duration-500" 
                                        style={{ 
                                            width: `${user.currentTree.progress || 0}%`, 
                                            backgroundImage: 'linear-gradient(to right, #10b981, #34d399)'
                                        }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
            
            {/* Best Streak */}
            <motion.div className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 p-6 hover:scale-105" variants={statCardVariants}>
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-pink-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                    <div className="flex items-center">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-red-400 to-pink-400 text-white shadow-lg mr-4">
                            <FiAward className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Best Streak</p>
                            <p className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                                {user?.longestStreak || 0}
                            </p>
                            <p className="text-sm font-medium text-red-600">days</p>
                        </div>
                    </div>
                </div>
            </motion.div>
            
            {/* Last Session Date */}
            <motion.div className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 p-6 hover:scale-105" variants={statCardVariants}>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                    <div className="flex items-center">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-400 to-blue-400 text-white shadow-lg mr-4">
                            <FiCalendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Last Session</p>
                            <p className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                               {formatDate(user?.lastMeetingDate)}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

        </motion.div>

        {/* Emotion History Section */}
        <motion.div className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 p-6 mt-8" variants={itemVariants}>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
                <div className="flex items-center mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-green-400 to-blue-400 text-white shadow-lg mr-4">
                        <FiSmile className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Recent Emotional States</h3>
                </div>
                <div className="space-y-4">
                    {sessions.slice(0, 5).map((session, index) => (
                        <div key={session._id || index} className="group/item bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 p-4 hover:bg-white/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-gray-800">
                                        {new Date(session.session?.startTime || session.date).toLocaleDateString('en-US', { 
                                            weekday: 'short', 
                                            year: 'numeric', 
                                            month: 'short', 
                                            day: 'numeric' 
                                        })}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Session duration: {session.session?.attendees?.[0]?.duration || 0} min
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-gray-500 font-medium">Emotional State</div>
                                    <div className="text-sm font-bold text-green-600 flex items-center gap-1">
                                        improving
                                        <span className="text-green-400">✨</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {sessions.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiSmile className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-lg font-medium text-gray-600">No emotion data available yet.</p>
                            <p className="text-sm mt-2 text-gray-500">Complete meditation sessions with feedback to see your emotional trends.</p>
                        </div>
                    )}
                </div>
                <div className="mt-6 text-center">
                    <button
                      onClick={() => navigate('/user/emotion-analytics')}
                      className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
                    >
                      <FiTrendingUp className="mr-2 group-hover:translate-y-[-2px] transition-transform duration-300" />
                      View Detailed Analytics
                    </button>
                </div>
            </div>
        </motion.div>

      </div>
      
      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
        
        .bg-300 {
          background-size: 300% 300%;
        }
      `}</style>
    </motion.div>
  );
};

export default Profile;