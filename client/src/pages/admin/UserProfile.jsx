import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiMail, FiCalendar, FiActivity, FiSmile, FiMeh, FiFrown, 
  FiCheckCircle, FiXCircle, FiClock, FiList, FiBarChart2, FiMessageSquare, FiUser
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { toast } from 'react-hot-toast';
import API from '../../utils/api';
import Loader from '../../components/ui/Loader';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [data, setData] = useState({
    user: null,
    sessions: [],
    feedbacks: [],
    emotionalAnalytics: []
  });

  useEffect(() => {
    if (!userId) {
      toast.error('User ID is required');
      navigate('/admin/users');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/user/getUser/${userId}`);
        
        if (response.data && response.data.success) {
          setData(response.data.data);
        } else {
          toast.error('Failed to load user data');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        toast.error('Failed to load user profile');
        navigate('/admin/users');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId, navigate]);

  const checkActive = (endDate) => {
    if (!endDate) return false;
    const targetDate = new Date(endDate);
    const today = new Date();
    return targetDate > today;
  };

  const getMoodIcon = (mood) => {
    switch (mood?.toLowerCase()) {
      case 'happy': case 'energized': case 'good': case 'very-good':
        return <FiSmile className="w-5 h-5 text-green-500" />;
      case 'sad': case 'stressed': case 'anxious': case 'bad': case 'very-bad':
        return <FiFrown className="w-5 h-5 text-red-500" />;
      default: 
        return <FiMeh className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getMoodColor = (mood) => {
    switch (mood?.toLowerCase()) {
      case 'happy': case 'energized': case 'good': case 'very-good': return 'bg-green-100 text-green-700';
      case 'sad': case 'stressed': case 'anxious': case 'bad': case 'very-bad': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  if (loading) return <Loader />;
  if (!data.user) return null;

  const { user, sessions, feedbacks, emotionalAnalytics } = data;

  // Calculate some aggregate stats for overview
  const totalDuration = sessions.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  
  const calculateAvg = (arr, key) => {
    if (!arr || arr.length === 0) return 0;
    const sum = arr.reduce((acc, curr) => acc + (curr[key] || 0), 0);
    return (sum / arr.length).toFixed(1);
  };

  const avgStress = calculateAvg(emotionalAnalytics, 'stressLevel');
  const avgEnergy = calculateAvg(emotionalAnalytics, 'energyLevel');
  const avgFocus = calculateAvg(emotionalAnalytics, 'focusLevel');
  const avgSleep = calculateAvg(emotionalAnalytics, 'sleepQuality');

  // Chart Data Preparation
  const sessionChartData = [...sessions].reverse().map(s => ({
    date: new Date(s.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    duration: s.duration || 0,
    title: s.meetingTitle
  }));

  const wellbeingTrendData = [...emotionalAnalytics].reverse().map(e => ({
    date: new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    stress: e.stressLevel,
    energy: e.energyLevel,
    focus: e.focusLevel,
    sleep: e.sleepQuality
  }));

  const moodDistribution = emotionalAnalytics.reduce((acc, curr) => {
    const mood = curr.dayMood || 'Neutral';
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {});
  
  const moodPieData = Object.entries(moodDistribution).map(([name, value]) => ({ name, value }));
  const PIE_COLORS = ['#4ade80', '#facc15', '#f87171', '#60a5fa', '#a78bfa', '#fb923c'];

  const radarData = [
    { subject: 'Stress', A: parseFloat(avgStress), fullMark: 10 },
    { subject: 'Energy', A: parseFloat(avgEnergy), fullMark: 10 },
    { subject: 'Focus', A: parseFloat(avgFocus), fullMark: 10 },
    { subject: 'Sleep', A: parseFloat(avgSleep), fullMark: 10 },
  ];

  // Feedback Analysis
  const feedbackStats = {
    total: feedbacks.length,
    avgRating: feedbacks.length > 0 
      ? (feedbacks.reduce((acc, curr) => acc + (curr.rating || 0), 0) / feedbacks.length).toFixed(1) 
      : 0,
    sentiment: {
      positive: feedbacks.filter(f => (f.rating || 0) >= 4).length,
      neutral: feedbacks.filter(f => (f.rating || 0) === 3).length,
      negative: feedbacks.filter(f => (f.rating || 0) <= 2).length
    },
    distribution: [
      { name: '5 Stars', count: feedbacks.filter(f => (f.rating || 0) === 5).length },
      { name: '4 Stars', count: feedbacks.filter(f => (f.rating || 0) === 4).length },
      { name: '3 Stars', count: feedbacks.filter(f => (f.rating || 0) === 3).length },
      { name: '2 Stars', count: feedbacks.filter(f => (f.rating || 0) === 2).length },
      { name: '1 Star', count: feedbacks.filter(f => (f.rating || 0) === 1).length },
    ],
    commonTags: Object.entries(feedbacks.reduce((acc, curr) => {
      if (curr.chips && Array.isArray(curr.chips)) {
        curr.chips.forEach(chip => {
          acc[chip] = (acc[chip] || 0) + 1;
        });
      }
      return acc;
    }, {})).sort((a, b) => b[1] - a[1]).slice(0, 10)
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-50 via-cream-50 to-white text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)}
              className="mr-4 p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-500 text-sm">User Profile & Analytics</p>
            </div>
          </div>
          <div className="flex space-x-2">
             <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                user.role === 'admin' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-blue-100 text-blue-700 border-blue-200'
              }`}>
                {user.role?.toUpperCase()}
              </span>
              {checkActive(user?.subscription?.endDate) ? (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200 flex items-center">
                  <FiCheckCircle className="mr-1" /> Active
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 flex items-center">
                  <FiXCircle className="mr-1" /> Inactive
                </span>
              )}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm border border-gray-100 mb-6 w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: <FiUser /> },
            { id: 'sessions', label: 'Sessions', icon: <FiList /> },
            { id: 'emotions', label: 'Emotional Analytics', icon: <FiBarChart2 /> },
            { id: 'feedback', label: 'Feedback', icon: <FiMessageSquare /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 gap-6">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* User Details Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-1">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Profile Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                    <FiMail className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-700">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                    <FiCalendar className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-xs text-gray-500">Joined Date</p>
                      <p className="text-sm font-medium text-gray-700">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                    <FiActivity className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-xs text-gray-500">Current Streak</p>
                      <p className="text-sm font-medium text-orange-600">{user.currentStreak || 0} Days</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                  <p className="text-gray-500 text-xs font-medium uppercase">Total Sessions</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">{sessions.length}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                  <p className="text-gray-500 text-xs font-medium uppercase">Total Minutes</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{totalDuration}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                  <p className="text-gray-500 text-xs font-medium uppercase">Avg Stress</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">{avgStress}<span className="text-sm text-gray-400 font-normal">/10</span></p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                  <p className="text-gray-500 text-xs font-medium uppercase">Avg Energy</p>
                  <p className="text-3xl font-bold text-yellow-600 mt-2">{avgEnergy}<span className="text-sm text-gray-400 font-normal">/10</span></p>
                </div>

                {/* Recent Activity Mini-List */}
                <div className="col-span-2 md:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-2">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h3>
                  {sessions.length > 0 ? (
                    <div className="space-y-3">
                      {sessions.slice(0, 3).map((session, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-50">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                              <FiCheckCircle />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{session.meetingTitle}</p>
                              <p className="text-xs text-gray-500">{new Date(session.startTime).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-gray-600">{session.duration} min</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No recent activity found.</p>
                  )}
                </div>
              </div>

              {/* Session Activity Chart */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Session Duration Trend</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sessionChartData}>
                      <defs>
                        <linearGradient id="colorDuration" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                      <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                      <Area type="monotone" dataKey="duration" stroke="#10b981" fillOpacity={1} fill="url(#colorDuration)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* SESSIONS TAB */}
          {activeTab === 'sessions' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Session History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Meeting Title</th>
                      <th className="px-6 py-4 font-medium">Duration</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {sessions.length > 0 ? (
                      sessions.map((session, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(session.startTime).toLocaleDateString()} <br/>
                            <span className="text-xs text-gray-400">{new Date(session.startTime).toLocaleTimeString()}</span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800">{session.meetingTitle}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                              <FiClock className="mr-1 w-3 h-3" /> {session.duration} min
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              session.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {session.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No sessions found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* EMOTIONAL ANALYTICS TAB */}
          {activeTab === 'emotions' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Wellbeing Trends Chart */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold mb-6 text-gray-800">Wellbeing Trends (Last 30 Entries)</h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={wellbeingTrendData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                      <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                      <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                      <Legend />
                      <Line type="monotone" dataKey="stress" stroke="#c084fc" strokeWidth={2} dot={false} activeDot={{r: 6}} />
                      <Line type="monotone" dataKey="energy" stroke="#facc15" strokeWidth={2} dot={false} activeDot={{r: 6}} />
                      <Line type="monotone" dataKey="focus" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{r: 6}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Emotion Trends List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold mb-6 text-gray-800">Emotional Shift (Pre vs Post)</h3>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {emotionalAnalytics.length > 0 ? (
                      emotionalAnalytics.map((entry, idx) => (
                        <div key={idx} className="p-4 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-xs text-gray-400">{new Date(entry.date).toLocaleDateString()}</span>
                            <span className={`text-xs px-2 py-1 rounded ${entry.emotionImprovement > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                              {entry.emotionImprovement > 0 ? `+${entry.emotionImprovement.toFixed(0)}% Improved` : 'No Change'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500 uppercase">Pre</span>
                              <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getMoodColor(entry.preMeditationEmotion)}`}>
                                {entry.preMeditationEmotion}
                              </span>
                            </div>
                            <FiArrowLeft className="transform rotate-180 text-gray-300" />
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500 uppercase">Post</span>
                              <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getMoodColor(entry.postMeditationEmotion)}`}>
                                {entry.postMeditationEmotion}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-10">No emotional data recorded yet.</p>
                    )}
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Wellbeing Balance</h3>
                    <div className="h-64 w-full flex justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                          <PolarGrid stroke="#e2e8f0" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                          <Radar name="User Stats" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                          <RechartsTooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                       <div><p className="text-xs text-gray-500">Avg Stress</p><p className="font-bold text-purple-600">{avgStress}</p></div>
                       <div><p className="text-xs text-gray-500">Avg Energy</p><p className="font-bold text-yellow-600">{avgEnergy}</p></div>
                       <div><p className="text-xs text-gray-500">Avg Focus</p><p className="font-bold text-blue-600">{avgFocus}</p></div>
                       <div><p className="text-xs text-gray-500">Avg Sleep</p><p className="font-bold text-indigo-600">{avgSleep}</p></div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Day Mood Distribution</h3>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={moodPieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {moodPieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <RechartsTooltip />
                          <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* FEEDBACK TAB */}
          {activeTab === 'feedback' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Feedback Analytics Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Rating Overview */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-yellow-50 flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold text-yellow-500">{feedbackStats.avgRating}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Average Rating</h3>
                  <p className="text-sm text-gray-500">Based on {feedbackStats.total} reviews</p>
                  
                  <div className="mt-6 w-full grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-600 font-bold">Positive</p>
                      <p className="text-lg font-bold text-green-700">{feedbackStats.sentiment.positive}</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 font-bold">Neutral</p>
                      <p className="text-lg font-bold text-gray-700">{feedbackStats.sentiment.neutral}</p>
                    </div>
                    <div className="p-2 bg-red-50 rounded-lg">
                      <p className="text-xs text-red-600 font-bold">Negative</p>
                      <p className="text-lg font-bold text-red-700">{feedbackStats.sentiment.negative}</p>
                    </div>
                  </div>
                </div>

                {/* Rating Distribution Chart */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Rating Distribution</h3>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart layout="vertical" data={feedbackStats.distribution} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" tick={{fontSize: 12, fill: '#6b7280'}} width={50} />
                        <RechartsTooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Bar dataKey="count" fill="#fbbf24" radius={[0, 4, 4, 0]} barSize={20} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Common Topics */}
              {feedbackStats.commonTags.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <FiMessageSquare className="mr-2 text-blue-500" />
                    Common Feedback Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {feedbackStats.commonTags.map(([tag, count], idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 flex items-center">
                        {tag}
                        <span className="ml-2 bg-blue-200 text-blue-800 text-xs px-1.5 py-0.5 rounded-full">{count}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Feedback List */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">Recent Feedback History</h3>
                {feedbacks.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {feedbacks.map((fb, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className={`p-2 rounded-lg ${getMoodColor(fb.mood)}`}>
                                {getMoodIcon(fb.mood)}
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <span className="font-bold text-gray-800 capitalize mr-2">{fb.mood || 'Unknown Mood'}</span>
                                  <div className="flex text-yellow-400 text-sm">
                                    {[...Array(5)].map((_, i) => (
                                      <span key={i}>{i < (fb.rating || 0) ? '★' : '☆'}</span>
                                    ))}
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500">{new Date(fb.createdAt).toLocaleDateString()} at {new Date(fb.createdAt).toLocaleTimeString()}</p>
                              </div>
                            </div>
                            
                            {fb.message && (
                              <div className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <p className="text-gray-700 text-sm leading-relaxed">"{fb.message}"</p>
                              </div>
                            )}

                            {fb.chips && fb.chips.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {fb.chips.map((chip, cIdx) => (
                                  <span key={cIdx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md border border-gray-200">
                                    #{chip}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          {/* Analysis Badge (Mock) */}
                          <div className="flex flex-col items-end space-y-2">
                             <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                               (fb.rating || 0) >= 4 ? 'bg-green-100 text-green-700' : 
                               (fb.rating || 0) <= 2 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                             }`}>
                               {(fb.rating || 0) >= 4 ? 'Positive' : (fb.rating || 0) <= 2 ? 'Negative' : 'Neutral'}
                             </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
                    <FiMessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No feedback submitted yet.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
