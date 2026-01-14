import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-hot-toast';
import API from '../../utils/api';

const COLORS = {
  stressed: 'url(#stressedGradient)',
  anxious: 'url(#anxiousGradient)',
  sad: 'url(#sadGradient)',
  angry: 'url(#angryGradient)',
  neutral: 'url(#neutralGradient)',
  calm: 'url(#calmGradient)',
  happy: 'url(#happyGradient)',
  energized: 'url(#energizedGradient)'
};

const SOLID_COLORS = {
  stressed: '#ff6b6b',
  anxious: '#ff9f43',
  sad: '#667eea',
  angry: '#ee5a6f',
  neutral: '#a0aec0',
  calm: '#48bb78',
  happy: '#f6d55c',
  energized: '#9f7aea'
};

const EmotionAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [history, setHistory] = useState([]);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');

  useEffect(() => {
    fetchAnalytics();
    fetchComparison();
    fetchHistory();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      const response = await API.get(`/emotion-tracking/analytics?period=${period}`);
      setAnalytics(response.data.data);
    } catch (error) {
      toast.error('Failed to load analytics');
      console.error('Analytics error:', error);
    }
  };

  const fetchComparison = async () => {
    try {
      const response = await API.get(`/emotion-tracking/comparison?period=${period}`);
      setComparison(response.data.data);
    } catch (error) {
      toast.error('Failed to load comparison data');
      console.error('Comparison error:', error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await API.get(`/emotion-tracking/history?limit=20`);
      setHistory(response.data.data);
    } catch (error) {
      toast.error('Failed to load history');
      console.error('History error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-pulse"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-purple-600 border-r-pink-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient bg-300">
            Emotion Analytics
          </h1>
          <p className="mt-4 text-lg text-gray-600 font-light">Track your emotional journey and see how meditation impacts your wellbeing</p>
        </div>

        {/* Period Selector */}
        <div className="mb-8 flex items-center gap-4">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Time Period</label>
          <div className="relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="appearance-none bg-white/80 backdrop-blur-sm border border-purple-200 rounded-xl px-6 py-3 pr-10 text-sm font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:border-purple-300 cursor-pointer"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        {analytics && (
          <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/80 p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Stress Level</h3>
                  <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-400 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">{analytics.averages.stressLevel}</p>
                <p className="mt-2 text-sm text-gray-600 font-medium">Lower is better</p>
              </div>
            </div>
            <div className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/80 p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Energy Level</h3>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">{analytics.averages.energyLevel}</p>
                <p className="mt-2 text-sm text-gray-600 font-medium">Higher is better</p>
              </div>
            </div>
            <div className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/80 p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Focus Level</h3>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{analytics.averages.focusLevel}</p>
                <p className="mt-2 text-sm text-gray-600 font-medium">Higher is better</p>
              </div>
            </div>
            <div className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/80 p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Improvement</h3>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">+{analytics.averages.emotionImprovement}%</p>
                <p className="mt-2 text-sm text-gray-600 font-medium">Positive change</p>
              </div>
            </div>
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Emotion Trends */}
          {analytics?.trends && (
            <div className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Emotion Trends</h3>
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={analytics.trends}>
                    <defs>
                      <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0.2}/>
                      </linearGradient>
                      <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#48bb78" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#48bb78" stopOpacity={0.2}/>
                      </linearGradient>
                      <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#667eea" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" strokeOpacity={0.3} />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => new Date(value).toLocaleDateString()}
                      stroke="#6b7280"
                      fontSize={12}
                    />
                    <YAxis domain={[1, 10]} stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(147, 51, 234, 0.2)',
                        borderRadius: '12px'
                      }}
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      formatter={(value, name) => [value, name]}
                    />
                    <Legend wrapperStyle={{ fontSize: '14px' }} />
                    <Line 
                      type="monotone" 
                      dataKey="stressLevel" 
                      stroke="#ff6b6b" 
                      strokeWidth={3}
                      dot={{ fill: '#ff6b6b', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Stress Level"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="energyLevel" 
                      stroke="#48bb78" 
                      strokeWidth={3}
                      dot={{ fill: '#48bb78', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Energy Level"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="focusLevel" 
                      stroke="#667eea" 
                      strokeWidth={3}
                      dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Focus Level"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Before vs After Meditation */}
          {comparison && (
            <div className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Meditation Impact</h3>
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="text-center">
                    <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Before Meditation</h4>
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <defs>
                          {Object.entries(SOLID_COLORS).map(([emotion, color]) => (
                            <linearGradient key={`${emotion}Gradient`} id={`${emotion}Gradient`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                              <stop offset="95%" stopColor={color} stopOpacity={0.4}/>
                            </linearGradient>
                          ))}
                        </defs>
                        <Pie
                          data={Object.entries(comparison.beforeMeditation).map(([emotion, count]) => ({
                            name: emotion,
                            value: count,
                            fill: COLORS[emotion] || SOLID_COLORS.neutral
                          }))}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          animationBegin={0}
                          animationDuration={800}
                        >
                          {Object.entries(comparison.beforeMeditation).map(([emotion, count]) => (
                            <Cell key={`before-${emotion}`} fill={COLORS[emotion] || SOLID_COLORS.neutral} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(147, 51, 234, 0.2)',
                            borderRadius: '12px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center">
                    <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">After Meditation</h4>
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={Object.entries(comparison.afterMeditation).map(([emotion, count]) => ({
                            name: emotion,
                            value: count,
                            fill: COLORS[emotion] || SOLID_COLORS.neutral
                          }))}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          animationBegin={0}
                          animationDuration={800}
                        >
                          {Object.entries(comparison.afterMeditation).map(([emotion, count]) => (
                            <Cell key={`after-${emotion}`} fill={COLORS[emotion] || SOLID_COLORS.neutral} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(147, 51, 234, 0.2)',
                            borderRadius: '12px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Day Mood Distribution */}
          {analytics?.frequencies?.dayMoods && (
            <div className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Mood Distribution</h3>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={Object.entries(analytics.frequencies.dayMoods).map(([mood, count]) => ({
                    mood: mood.charAt(0).toUpperCase() + mood.slice(1).replace('-', ' '),
                    count
                  }))}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9f7aea" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#9f7aea" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" strokeOpacity={0.3} />
                    <XAxis 
                      dataKey="mood" 
                      stroke="#6b7280"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(147, 51, 234, 0.2)',
                        borderRadius: '12px'
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="url(#barGradient)"
                      radius={[8, 8, 0, 0]}
                      animationDuration={1000}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Recent Sessions */}
          <div className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Recent Sessions</h3>
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
                {history.slice(0, 10).map((session, index) => (
                  <div key={session._id} className="group/item bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 p-4 hover:bg-white/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-800">
                          {new Date(session.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-semibold">
                            {session.preMeditationEmotion} → {session.postMeditationEmotion}
                          </span>
                          {session.emotionImprovement > 0 && (
                            <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-bold">
                              +{session.emotionImprovement.toFixed(1)}% ✨
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            <span className="text-xs font-medium text-gray-600">Stress: {session.stressLevel}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-xs font-medium text-gray-600">Energy: {session.energyLevel}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(147, 51, 234, 0.3);
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgba(147, 51, 234, 0.5);
        }
      `}</style>
    </div>
  );
};

export default EmotionAnalytics;
