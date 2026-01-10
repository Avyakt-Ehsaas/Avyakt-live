import React, { use, useEffect, useState } from 'react';
import { FiUser, FiMail, FiPhone, FiCalendar, FiClock as FiClockIcon, FiAward, FiTrendingUp, FiActivity, FiZap, FiSmile } from 'react-icons/fi';
import { GiTreeGrowth, GiMeditation, GiSoulVessel, GiCalendar, GiDuration } from 'react-icons/gi';
import API from '../../utils/api';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';

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
    setSessions(session);
    setAttendance(session[0].length);
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
    // 🚨 LIGHT THEME BACKGROUND (White and Light Gray)
    <motion.div className="min-h-screen pt-15 md:pt-32 bg-gray-50 text-gray-800 px-4 sm:px-6 lg:px-8 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
            className="flex items-center space-x-4 mb-10" 
            initial="hidden" 
            animate="visible" 
            variants={itemVariants}
        >
          <div className="p-3 rounded-full bg-orange-100 text-orange-600 border border-orange-300">
            <FiUser className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800">
                {user?.name?.split(' ')[0]}'s Profile 
            </h1>
            <p className="text-gray-500">Your personal meditation journal</p>
          </div>
        </motion.div>

        {/* User Info Card (White Background) */}
        <motion.div 
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-10" 
            variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8">
            {/* Avatar & Tree Info */}
            <div className='flex flex-col items-center space-y-3'>
                <div className="h-32 w-32 rounded-full border-4 border-orange-400 overflow-hidden bg-gray-100 flex items-center justify-center">
                    {user?.profilePicture ? (
                        <img src={user.profilePicture} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                        <div className="text-4xl font-bold text-orange-600">{user?.name?.charAt(0)}</div>
                    )}
                </div>
              
            </div>
            
            {/* Details */}
            <div className="flex-1 space-y-3 border-l-2 border-gray-200 pl-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{user?.name || 'User Profile'}</h2>
                <div className="space-y-1">
                    <p className="text-gray-600 flex items-center gap-2 text-sm"><FiMail className="text-orange-500" /> EMAIL: {user?.email || 'N/A'}</p>
                    <p className="text-gray-600 flex items-center gap-2 text-sm"><FiPhone className="text-orange-500" /> PHONE: {user?.phone || 'N/A'}</p>
                    {user?.createdAt && (
                        <p className="text-gray-600 flex items-center gap-2 text-sm">
                            <GiCalendar className="text-orange-500" /> JOINED: {formatDate(user.createdAt)}
                        </p>
                    )}
                    {user?.location && <p className="text-gray-600 text-sm">LOCATION: {user.location}</p>}
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
            {/* Current Streak (Orange Accent) */}
            <motion.div className="bg-white rounded-xl p-5 border border-orange-200 shadow-md hover:shadow-orange-300/50 transition duration-300" variants={statCardVariants}>
                <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-orange-100 text-orange-600 mr-4">
                        <FiZap className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Current Streak</p>
                        <p className="text-2xl font-extrabold text-gray-800">
                            {user?.currentStreak || 0} <span className='text-orange-600 text-base font-medium'>days</span>
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Total Sessions Attended (Peach Accent) */}
            <motion.div className="bg-white rounded-xl p-5 border border-pink-200 shadow-md hover:shadow-pink-300/50 transition duration-300" variants={statCardVariants}>
                <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-pink-100 text-pink-600 mr-4">
                        <GiSoulVessel className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Sessions Attended</p>
                        <p className="text-2xl font-extrabold text-gray-800">
                            {sessions?.length || 0} <span className='text-pink-600 text-base font-medium'>sessions</span>
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Total Meditation Time (Warm Purple Accent) */}
            <motion.div className="bg-white rounded-xl p-5 border border-purple-200 shadow-md hover:shadow-purple-300/50 transition duration-300" variants={statCardVariants}>
                <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-purple-100 text-purple-600 mr-4">
                        <GiMeditation className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Meditation</p>
                        <p className="text-2xl font-extrabold text-gray-800">
                            {(avgMeditationDuration * sessions?.length || 0)}
                            <span className='text-purple-600 text-base font-medium'> minutes</span>
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Average Meditation Time (Lime Green Accent) */}
            <motion.div className="bg-white rounded-xl p-5 border border-lime-200 shadow-md hover:shadow-lime-300/50 transition duration-300" variants={statCardVariants}>
                <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-lime-100 text-lime-600 mr-4">
                        <FiClockIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Avg. Duration</p>
                        <p className="text-2xl font-extrabold text-gray-800">
                            {Math.ceil(avgMeditationDuration)}
                            <span className='text-lime-600 text-base font-medium'> minutes</span>
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Current Tree Stage (Detailed) */}
            <motion.div className="bg-white rounded-xl p-5 border border-green-200 shadow-md col-span-full sm:col-span-2 transition duration-300" variants={statCardVariants}>
                <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
                        <GiTreeGrowth className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Current Tree Status</p>
                        <p className="text-2xl font-extrabold text-gray-800">
                            {treeStage[5%user?.currentStreak]}
                        </p>
                    </div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-600 border-t border-gray-200 pt-4">
                    <p className='flex justify-between'>
                        <span>Age:</span>
                        <span className='font-medium text-gray-800'>{user?.currentStreak}</span>
                    </p>
                    <p className='flex justify-between'>
                        <span>Forest Size:</span>
                        <span className='font-medium text-gray-800'>{user?.forest?.length || 0} trees</span>
                    </p>
                    {/* Add a simple progress bar */}
                    {user?.currentTree?.progress !== undefined && (
                        <div className='pt-2'>
                            <p className='mb-1'>Stage Progress ({user.currentTree.progress}%):</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                    className="h-2.5 rounded-full transition-all duration-500" 
                                    style={{ 
                                        width: `${user.currentTree.progress || 0}%`, 
                                        backgroundImage: 'linear-gradient(to right, #f97316, #fde047)' // Warm Gradient
                                    }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
            
             {/* Best Streak (Red Accent) */}
            <motion.div className="bg-white rounded-xl p-5 border border-red-200 shadow-md hover:shadow-red-300/50 transition duration-300" variants={statCardVariants}>
                <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-red-100 text-red-600 mr-4">
                        <FiAward className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Best Streak</p>
                        <p className="text-2xl font-extrabold text-gray-800">
                            {user?.longestStreak || 0} <span className='text-red-600 text-base font-medium'>days</span>
                        </p>
                    </div>
                </div>
            </motion.div>
            
            {/* Last Session Date (Indigo Accent) */}
            <motion.div className="bg-white rounded-xl p-5 border border-indigo-200 shadow-md hover:shadow-indigo-300/50 transition duration-300" variants={statCardVariants}>
                <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600 mr-4">
                        <FiCalendar className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Last Session</p>
                        <p className="text-lg font-extrabold text-gray-800">
                           {formatDate(user?.lastMeetingDate)}
                        </p>
                    </div>
                </div>
            </motion.div>

        </motion.div>

        {/* Emotion History Section */}
        <motion.div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6" variants={itemVariants}>
            <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
                    <FiSmile className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Recent Emotional States</h3>
            </div>
            <div className="space-y-3">
                {sessions.slice(0, 5).map((session, index) => (
                    <div key={session._id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p className="text-sm font-medium text-gray-900">
                                {new Date(session.session?.startTime || session.date).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-gray-600">
                                Session duration: {session.session?.attendees?.[0]?.duration || 0} min
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-gray-500">Emotional State</div>
                            <div className="text-sm font-medium text-green-600">
                                improving
                            </div>
                        </div>
                    </div>
                ))}
                {sessions.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <p>No emotion data available yet.</p>
                        <p className="text-sm mt-2">Complete meditation sessions with feedback to see your emotional trends.</p>
                    </div>
                )}
            </div>
            <div className="mt-4 text-center">
                <button
                  onClick={() => navigate('/user/emotion-analytics')}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <FiTrendingUp className="mr-2" />
                  View Detailed Analytics
                </button>
              </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Profile;