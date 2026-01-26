import React, { useState , useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiPlusCircle, FiBarChart2, FiFileText, FiTrendingUp, FiUsers, FiClipboard, FiClock, FiTarget, FiActivity, FiPieChart, FiCalendar, FiFilter, FiDownload, FiEye } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import API from '../../../utils/api'

const SurveyLayout = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [surveys, setSurveys] = useState([]);
  const [loadingSurveys, setLoadingSurveys] = useState(false);
  const [hasFetchedSurveys, setHasFetchedSurveys] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedSurvey, setSelectedSurvey] = useState('all');

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
    console.log("inside survey fetch")
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

const fetchAnalytics = async () => {
  try {
    setLoadingAnalytics(true);
    const response = await API.get(`/surveys/analytics?timeRange=${selectedTimeRange}&surveyId=${selectedSurvey}`);
    if (response?.data?.success) {
      setAnalytics(response.data.analytics);
    } else {
      toast.error(response?.message || "Failed to load analytics");
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to load analytics");
  } finally {
    setLoadingAnalytics(false);
  }
};

useEffect(() => {
    if (activeTab === "responses" && !hasFetchedSurveys) {
        fetchSurveys();
    }
    if (activeTab === "analytics") {
        fetchAnalytics();
    }
},[activeTab, selectedTimeRange, selectedSurvey])

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
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div className="flex items-center mb-4 lg:mb-0">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-lg mr-4">
                  <FiBarChart2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Survey Analytics
                  </h2>
                  <p className="text-sm text-gray-600">Comprehensive insights and performance metrics</p>
                </div>
              </div>
              
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 px-4 py-2">
                  <FiCalendar className="w-4 h-4 text-gray-600" />
                  <select
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                    className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none"
                  >
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                    <option value="1y">Last Year</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2 bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 px-4 py-2">
                  <FiFilter className="w-4 h-4 text-gray-600" />
                  <select
                    value={selectedSurvey}
                    onChange={(e) => setSelectedSurvey(e.target.value)}
                    className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none"
                  >
                    <option value="all">All Surveys</option>
                    {surveys.map(survey => (
                      <option key={survey._id} value={survey._id}>
                        {survey.title}
                      </option>
                    ))}
                  </select>
                </div>

                <button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <FiDownload className="w-4 h-4" />
                  <span className="text-sm font-medium">Export</span>
                </button>
              </div>
            </div>
            {loadingAnalytics ? (
              <div className="flex items-center justify-center h-96">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-green-200 rounded-full animate-pulse"></div>
                  <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-green-600 border-r-emerald-600 rounded-full animate-spin"></div>
                </div>
              </div>
            ) : analytics ? (
              <div className="space-y-8">
                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50 p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-indigo-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FiTarget className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                          {analytics.totalSurveysGrowth > 0 ? '+' : ''}{analytics.totalSurveysGrowth || 0}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">Total Surveys</p>
                      <p className="text-3xl font-bold text-gray-900">{analytics.totalSurveys || 0}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {analytics.totalSurveysGrowth > 0 ? '↑' : '↓'} {Math.abs(analytics.totalSurveysGrowth || 0)}% from last period
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="group relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200/50 p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-emerald-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <FiUsers className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                          {analytics.totalResponsesGrowth > 0 ? '+' : ''}{analytics.totalResponsesGrowth || 0}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">Total Responses</p>
                      <p className="text-3xl font-bold text-gray-900">{(analytics.totalResponses || 0).toLocaleString()}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {analytics.totalResponsesGrowth > 0 ? '↑' : '↓'} {Math.abs(analytics.totalResponsesGrowth || 0)}% from last period
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Response Trends Chart */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/40 backdrop-blur-sm rounded-2xl border border-white/30 p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-gray-800">Response Trends</h3>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        <FiEye className="inline w-4 h-4 mr-1" />
                        View Details
                      </button>
                    </div>
                    <div className="h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                      <div className="h-full flex flex-col justify-center">
                        {analytics.dailyTrends && analytics.dailyTrends.length > 0 ? (
                          <>
                            <div className="flex items-end justify-between h-32 mb-4">
                              {analytics.dailyTrends.map((day, index) => {
                                const maxResponses = Math.max(...analytics.dailyTrends.map(d => d.responses), 1);
                                const heightPercentage = (day.responses / maxResponses) * 100;
                                return (
                                  <div key={index} className="flex-1 mx-1 flex flex-col items-center">
                                    <div 
                                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-300 hover:from-blue-700 hover:to-blue-500" 
                                      style={{height: `${Math.max(heightPercentage, 5)}%`, minHeight: '4px'}}
                                      title={`${day.day}: ${day.responses} responses`}
                                    ></div>
                                    <p className="text-xs text-center mt-1 font-medium text-gray-700">{day.day.substring(0, 3)}</p>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium text-gray-700">Daily Response Trends</p>
                              <p className="text-xs text-gray-500">
                                Peak: {analytics.dailyTrends.reduce((max, day) => day.responses > max.responses ? day : max).day} 
                                ({analytics.dailyTrends.reduce((max, day) => day.responses > max.responses ? day : max).responses} responses)
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="text-center">
                            <FiBarChart2 className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                            <p className="text-gray-600 font-medium">No Response Data</p>
                            <p className="text-sm text-gray-500">Daily trends will appear when surveys have responses</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Category Distribution */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/40 backdrop-blur-sm rounded-2xl border border-white/30 p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-gray-800">Category Distribution</h3>
                      <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                        <FiPieChart className="inline w-4 h-4 mr-1" />
                        View Details
                      </button>
                    </div>
                    <div className="h-80 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                      <div className="h-full flex flex-col justify-center items-center">
                        {analytics.categories && analytics.categories.length > 0 ? (
                          <>
                            <div className="relative w-40 h-40 mb-4">
                              <svg viewBox="0 0 42 42" className="w-full h-full transform -rotate-90">
                                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e9d5ff" strokeWidth="3"></circle>
                                {analytics.categories.map((category, index) => {
                                  const colors = ['#a855f7', '#ec4899', '#f97316', '#3b82f6', '#10b981', '#f59e0b'];
                                  const color = colors[index % colors.length];
                                  const offset = analytics.categories.slice(0, index).reduce((sum, cat) => sum + cat.percentage, 0);
                                  return (
                                    <circle 
                                      key={index}
                                      cx="21" 
                                      cy="21" 
                                      r="15.915" 
                                      fill="transparent" 
                                      stroke={color} 
                                      strokeWidth="3" 
                                      strokeDasharray={`${category.percentage} ${100 - category.percentage}`}
                                      strokeDashoffset={`-${offset}`}
                                      strokeLinecap="round"
                                    ></circle>
                                  );
                                })}
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center transform rotate-90">
                                  <p className="text-2xl font-bold text-gray-800">{analytics.categories.length}</p>
                                  <p className="text-xs text-gray-600">Categories</p>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs max-w-xs">
                              {analytics.categories.map((category, index) => {
                                const colors = ['bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-blue-500', 'bg-green-500', 'bg-amber-500'];
                                const color = colors[index % colors.length];
                                return (
                                  <div key={index} className="flex items-center gap-1">
                                    <div className={`w-3 h-3 ${color} rounded`}></div>
                                    <span>{category.name} ({category.percentage}%)</span>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        ) : (
                          <div className="text-center">
                            <FiPieChart className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                            <p className="text-gray-600 font-medium">No Category Data</p>
                            <p className="text-sm text-gray-500">Categories will appear when surveys have responses</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Top Performing Surveys */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white/40 backdrop-blur-sm rounded-2xl border border-white/30 p-6"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-6">Top Performing Surveys</h3>
                  <div className="space-y-4">
                    {analytics.topSurveys?.map((survey, index) => (
                      <div key={survey._id} className="flex items-center justify-between p-4 bg-white/30 rounded-xl hover:bg-white/50 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                            index === 0 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
                            index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                            'bg-gradient-to-r from-orange-400 to-amber-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{survey.title}</h4>
                            <p className="text-sm text-gray-600">{survey.responses} responses</p>
                          </div>
                        </div>
                        <Link 
                        to={`/admin/surveys/${survey._id}`}
                        className="text-right">
                          view details
                        </Link>
                      </div>
                    )) || (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No survey data available</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FiBarChart2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No Analytics Data</h3>
                <p className="text-sm text-gray-500">Start collecting responses to see analytics</p>
              </div>
            )}
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