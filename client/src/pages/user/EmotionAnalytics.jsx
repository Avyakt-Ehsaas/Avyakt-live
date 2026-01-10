import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-hot-toast';
import API from '../../utils/api';

const COLORS = {
  stressed: '#ef4444',
  anxious: '#f97316',
  sad: '#3b82f6',
  angry: '#dc2626',
  neutral: '#6b7280',
  calm: '#10b981',
  happy: '#eab308',
  energized: '#8b5cf6'
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Emotion Analytics</h1>
          <p className="mt-2 text-gray-600">Track your emotional journey and see how meditation impacts your wellbeing</p>
        </div>

        {/* Period Selector */}
        <div className="mb-6 flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Time Period:</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>

        {/* Summary Cards */}
        {analytics && (
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Average Stress Level</h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">{analytics.averages.stressLevel}</p>
              <p className="mt-1 text-sm text-gray-600">Lower is better</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Average Energy Level</h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">{analytics.averages.energyLevel}</p>
              <p className="mt-1 text-sm text-gray-600">Higher is better</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Average Focus Level</h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">{analytics.averages.focusLevel}</p>
              <p className="mt-1 text-sm text-gray-600">Higher is better</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Emotion Improvement</h3>
              <p className="mt-2 text-3xl font-bold text-green-600">+{analytics.averages.emotionImprovement}%</p>
              <p className="mt-1 text-sm text-gray-600">Positive change</p>
            </div>
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Emotion Trends */}
          {analytics?.trends && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Emotion Trends Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis domain={[1, 10]} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value, name) => [value, name]}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="stressLevel" 
                    stroke="#ef4444" 
                    name="Stress Level"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="energyLevel" 
                    stroke="#10b981" 
                    name="Energy Level"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="focusLevel" 
                    stroke="#3b82f6" 
                    name="Focus Level"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Before vs After Meditation */}
          {comparison && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Before vs After Meditation</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Before Meditation</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={Object.entries(comparison.beforeMeditation).map(([emotion, count]) => ({
                          name: emotion,
                          value: count,
                          fill: COLORS[emotion] || '#6b7280'
                        }))}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {Object.entries(comparison.beforeMeditation).map(([emotion, count]) => (
                          <Cell key={`before-${emotion}`} fill={COLORS[emotion] || '#6b7280'} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">After Meditation</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={Object.entries(comparison.afterMeditation).map(([emotion, count]) => ({
                          name: emotion,
                          value: count,
                          fill: COLORS[emotion] || '#6b7280'
                        }))}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {Object.entries(comparison.afterMeditation).map(([emotion, count]) => (
                          <Cell key={`after-${emotion}`} fill={COLORS[emotion] || '#6b7280'} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Day Mood Distribution */}
          {analytics?.frequencies?.dayMoods && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Day Mood Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={Object.entries(analytics.frequencies.dayMoods).map(([mood, count]) => ({
                  mood: mood.charAt(0).toUpperCase() + mood.slice(1).replace('-', ' '),
                  count
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mood" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Recent Sessions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {history.slice(0, 10).map((session, index) => (
                <div key={session._id} className="border-b border-gray-200 pb-3 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(session.date).toLocaleDateString()}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-gray-600">
                        <span className="px-2 py-1 bg-gray-100 rounded">
                          {session.preMeditationEmotion} → {session.postMeditationEmotion}
                        </span>
                        {session.emotionImprovement > 0 && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                            +{session.emotionImprovement.toFixed(1)}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Stress: {session.stressLevel}</div>
                      <div className="text-xs text-gray-500">Energy: {session.energyLevel}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionAnalytics;
