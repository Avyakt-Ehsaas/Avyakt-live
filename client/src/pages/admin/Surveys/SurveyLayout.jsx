import React, { useState , useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiPlusCircle, FiBarChart2, FiFileText, FiTrendingUp, FiUsers, FiClipboard } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import API from '../../../utils/api'

const SurveyLayout = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [surveys, setSurveys] = useState([]);
  const [loadingSurveys, setLoadingSurveys] = useState(false);
  const [hasFetchedSurveys, setHasFetchedSurveys] = useState(false);

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    try {
        navigate("/admin/surveys/create");
    } catch (error) {
        toast.error("Unable to create survey this time")
    }
  }

  const tabs = [
    {
      id: 'create',
      label: 'Create Survey',
      icon: FiPlusCircle,
      description: 'Design and build new surveys',
      color: 'from-purple-400 to-pink-400'
    },
    {
      id: 'responses',
      label: 'Survey Responses',
      icon: FiFileText,
      description: 'View and manage survey responses',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'analytics',
      label: 'Survey Analytics',
      icon: FiBarChart2,
      description: 'Analyze survey data and insights',
      color: 'from-green-500 to-emerald-500'
    }
  ]


  const fetchSurveys = async () => {
  try {
    console.log("inside survey fetchx")
    setLoadingSurveys(true);

    const response = await API.get("/surveys");
    console.log(response) 
    if (response?.data?.success) {
      setSurveys(response.data.surveys);
      setHasFetchedSurveys(true); // prevent refetch on re-click
    } else {
      toast.error(response?.message || "Failed to load surveys");
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to load surveys");
  } finally {
    setLoadingSurveys(false);
  }
};

useEffect(() => {
    if (activeTab === "responses" && !hasFetchedSurveys) {
        fetchSurveys();
    }
},[activeTab])

const renderContent = () => {
    switch(activeTab) {
      case 'create':
        return (
          <motion.div 
            className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg mr-4">
                <FiPlusCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Create New Survey
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group relative bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 p-6 hover:bg-white/60 transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <FiClipboard className="w-8 h-8 text-purple-500 mb-3" />
                  <h3 className="font-bold text-gray-800 mb-2">Question Types</h3>
                  <p className="text-sm text-gray-600">Multiple choice, text, rating scales and more</p>
                </div>
              </div>
              <div className="group relative bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 p-6 hover:bg-white/60 transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <FiUsers className="w-8 h-8 text-purple-500 mb-3" />
                  <h3 className="font-bold text-gray-800 mb-2">Target Audience</h3>
                  <p className="text-sm text-gray-600">Define who can take your survey</p>
                </div>
              </div>
              <div className="group relative bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 p-6 hover:bg-white/60 transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <FiTrendingUp className="w-8 h-8 text-purple-500 mb-3" />
                  <h3 className="font-bold text-gray-800 mb-2">Real-time Results</h3>
                  <p className="text-sm text-gray-600">Monitor responses as they come in</p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button 
              onClick={handleClick}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold text-lg">
                <FiPlusCircle className="mr-3 group-hover:rotate-90 transition-transform duration-300" />
                Start Creating Survey
              </button>
            </div>
          </motion.div>
        )
      
      case 'responses':
        return (
          <motion.div 
            className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-lg mr-4">
                <FiFileText className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Survey Responses
              </h2>
            </div>
            {/* <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="group relative bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 p-6 hover:bg-white/60 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Customer Satisfaction Survey #{item}</h3>
                      <p className="text-sm text-gray-600">Last updated: 2 hours ago</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">{125 * item}</p>
                        <p className="text-xs text-gray-500">Responses</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
            {loadingSurveys ? (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-pulse"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-purple-600 border-r-pink-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
) : surveys.length === 0 ? (
  <p className="text-center text-gray-500">No survey found.</p>
) : (
  surveys.map((survey) => (
    <div key={survey._id} className="group relative bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 p-6 hover:bg-white/60 transition-all duration-300">
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-800 mb-1">{survey.title}</h3>
          <p className="text-sm text-gray-600">
            Last updated: {new Date(survey.updatedAt).toLocaleString()}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">{survey.responseCount}</p>
            <p className="text-xs text-gray-500">Responses</p>
          </div>
          <button
            onClick={() => navigate(`/admin/surveys/${survey._id}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  ))
)}

          </motion.div>
        )
      
      case 'analytics':
        return (
          <motion.div 
            className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-lg mr-4">
                <FiBarChart2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Survey Analytics
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="group relative bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 p-6 hover:bg-white/60 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <p className="text-sm text-gray-600 mb-1">Total Surveys</p>
                  <p className="text-3xl font-bold text-green-600">24</p>
                  <p className="text-xs text-green-500 mt-1">+3 this month</p>
                </div>
              </div>
              <div className="group relative bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 p-6 hover:bg-white/60 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <p className="text-sm text-gray-600 mb-1">Total Responses</p>
                  <p className="text-3xl font-bold text-green-600">1,847</p>
                  <p className="text-xs text-green-500 mt-1">+234 this week</p>
                </div>
              </div>
              <div className="group relative bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 p-6 hover:bg-white/60 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
                  <p className="text-3xl font-bold text-green-600">87%</p>
                  <p className="text-xs text-green-500 mt-1">+5% improvement</p>
                </div>
              </div>
              <div className="group relative bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 p-6 hover:bg-white/60 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <p className="text-sm text-gray-600 mb-1">Avg. Time</p>
                  <p className="text-3xl font-bold text-green-600">4.2m</p>
                  <p className="text-xs text-green-500 mt-1">-30s faster</p>
                </div>
              </div>
            </div>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Response Trends</h3>
              <div className="h-64 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Chart visualization would go here</p>
              </div>
            </div>
          </motion.div>
        )
      
      default:
        return null
    }
  }

  return (
    <motion.div 
      className="min-h-screen bg-green-50 relative overflow-hidden text-gray-800 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Survey Management
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Create, manage, and analyze your surveys with powerful tools
          </p>
        </motion.div>

        {/* Toggle Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  isActive 
                    ? 'text-white shadow-xl scale-105' 
                    : 'text-gray-700 hover:text-gray-900 bg-white/40 backdrop-blur-sm border border-white/30 hover:bg-white/60'
                }`}
                whileHover={{ scale: isActive ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-2xl`}></div>
                )}
                <div className="relative z-10 flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                  <span>{tab.label}</span>
                </div>
                {!isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {renderContent()}
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
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </motion.div>
  )
}

export default SurveyLayout