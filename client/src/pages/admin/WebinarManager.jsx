import React, { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import API from '../../utils/api'
import toast from 'react-hot-toast'
import { Calendar, Clock, Users, Video, Plus, Edit, Trash2, UserCheck, BarChart3, TrendingUp, Eye } from 'lucide-react'

const AdminWebinarManager = () => {
  const { user } = useAuth()
  const [webinars, setWebinars] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    ongoing: 0,
    completed: 0,
    totalParticipants: 0
  })
  const [selectedWebinar, setSelectedWebinar] = useState(null)
  const [attendees, setAttendees] = useState([])
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('upcoming')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showAttendeesModal, setShowAttendeesModal] = useState(false)
  const [showSessionsModal, setShowSessionsModal] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    duration: '',
    timezone: 'Asia/Kolkata',
    language: 'en',
    recurrence_type: 'none',
    max_participants: 100,
    registration_required: true,
    agenda: '',
    presenter_name: '',
    presenter_email: ''
  })

  const fetchWebinars = async (type = 'upcoming') => {
    try {
      setLoading(true)
      const res = await API.get(`/webinars/all-webinars?listtype=${type}`)
      const webinarsData = res.data.webinars || []
      setWebinars(webinarsData)
      
      // Update stats
      const totalParticipants = webinarsData.reduce((sum, webinar) => 
        sum + (webinar.participants_count || 0), 0
      )
      
      setStats(prev => ({
        ...prev,
        total: webinarsData.length,
        [type]: webinarsData.length,
        totalParticipants
      }))
    } catch (error) {
      console.error('Failed to fetch webinars:', error)
      toast.error('Failed to fetch webinars')
    } finally {
      setLoading(false)
    }
  }

  const fetchAllStats = async () => {
    try {
      const [upcomingRes, ongoingRes, pastRes] = await Promise.all([
        API.get('/webinars/all-webinars?listtype=upcoming'),
        API.get('/webinars/ongoing'),
        API.get('/webinars/all-webinars?listtype=past')
      ])

      const upcoming = upcomingRes.data.webinars || []
      const ongoing = ongoingRes.data.webinars || []
      const past = pastRes.data.webinars || []
      const allWebinars = [...upcoming, ...ongoing, ...past]
      
      const totalParticipants = allWebinars.reduce((sum, webinar) => 
        sum + (webinar.participants_count || 0), 0
      )

      setStats({
        total: allWebinars.length,
        upcoming: upcoming.length,
        ongoing: ongoing.length,
        completed: past.length,
        totalParticipants
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const fetchAttendees = async (webinarId) => {
    try {
      setLoading(true)
      const res = await API.get(`/webinars/${webinarId}/attendees`)
      setAttendees(res.data.attendees || [])
    } catch (error) {
      console.error('Failed to fetch attendees:', error)
      toast.error('Failed to fetch attendees')
    } finally {
      setLoading(false)
    }
  }

  const fetchSessions = async (webinarId) => {
    try {
      setLoading(true)
      const res = await API.get(`/webinars/${webinarId}/sessions`)
      setSessions(res.data.sessions || [])
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
      toast.error('Failed to fetch sessions')
    } finally {
      setLoading(false)
    }
  }

  const createWebinar = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await API.post('/webinars/create', formData)
      toast.success('Webinar created successfully')
      setShowCreateForm(false)
      resetForm()
      fetchWebinars(activeTab)
      fetchAllStats()
    } catch (error) {
      console.error('Failed to create webinar:', error)
      toast.error('Failed to create webinar')
    } finally {
      setLoading(false)
    }
  }

  const deleteWebinar = async (webinarId) => {
    if (!window.confirm('Are you sure you want to delete this webinar? This action cannot be undone.')) return
    
    try {
      await API.delete(`/webinars/${webinarId}`)
      toast.success('Webinar deleted successfully')
      fetchWebinars(activeTab)
      fetchAllStats()
    } catch (error) {
      console.error('Failed to delete webinar:', error)
      toast.error('Failed to delete webinar')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      start_date: '',
      duration: '',
      timezone: 'Asia/Kolkata',
      language: 'en',
      recurrence_type: 'none',
      max_participants: 100,
      registration_required: true,
      agenda: '',
      presenter_name: '',
      presenter_email: ''
    })
  }

  const viewAttendees = (webinar) => {
    setSelectedWebinar(webinar)
    setShowAttendeesModal(true)
    fetchAttendees(webinar.webinar_key)
  }

  const viewSessions = (webinar) => {
    setSelectedWebinar(webinar)
    setShowSessionsModal(true)
    fetchSessions(webinar.webinar_key)
  }

  const exportAttendees = (webinar) => {
    // Function to export attendees data as CSV
    fetchAttendees(webinar.webinar_key).then(() => {
      const csv = [
        ['Name', 'Email', 'Registration Time', 'Status'],
        ...attendees.map(a => [
          `${a.first_name} ${a.last_name}`,
          a.email,
          a.registration_time,
          a.status
        ])
      ].map(row => row.join(',')).join('\n')

      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${webinar.title}_attendees.csv`
      a.click()
    })
  }

  useEffect(() => {
    if (user) {
      fetchWebinars(activeTab)
      fetchAllStats()
    }
  }, [user, activeTab])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const isWebinarLive = (startDate, endDate) => {
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)
    return now >= start && now <= end
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Webinar Management</h1>
              <p className="text-gray-600 mt-1">Admin dashboard for Zoho webinars</p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Create Webinar
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Webinars</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Video className="text-blue-600" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-blue-600">{stats.upcoming}</p>
              </div>
              <Calendar className="text-blue-600" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Live Now</p>
                <p className="text-2xl font-bold text-red-600">{stats.ongoing}</p>
              </div>
              <div className="relative">
                <Video className="text-red-600 animate-pulse" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-600">{stats.completed}</p>
              </div>
              <BarChart3 className="text-gray-600" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Participants</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalParticipants}</p>
              </div>
              <Users className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['upcoming', 'ongoing', 'past', 'all'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab} Webinars
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Webinars List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading webinars...</p>
            </div>
          ) : webinars.length === 0 ? (
            <div className="text-center py-12">
              <Video size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No webinars found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Webinar
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Schedule
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participants
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {webinars.map((webinar) => (
                    <tr key={webinar.webinar_key} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{webinar.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-2">{webinar.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar size={14} />
                          {formatDate(webinar.start_date)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          {webinar.duration} minutes
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Users size={14} />
                          {webinar.participants_count || 0} / {webinar.max_participants}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isWebinarLive(webinar.start_date, webinar.end_date) ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Live
                          </span>
                        ) : new Date(webinar.start_date) > new Date() ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Upcoming
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            Completed
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          {isWebinarLive(webinar.start_date, webinar.end_date) && (
                            <a
                              href={webinar.join_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-red-600 hover:text-red-900"
                              title="Join Webinar"
                            >
                              <Video size={16} />
                            </a>
                          )}
                          
                          <button
                            onClick={() => viewAttendees(webinar)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Attendees"
                          >
                            <UserCheck size={16} />
                          </button>
                          
                          {webinar.recurrence_type !== 'none' && (
                            <button
                              onClick={() => viewSessions(webinar)}
                              className="text-purple-600 hover:text-purple-900"
                              title="View Sessions"
                            >
                              <Calendar size={16} />
                            </button>
                          )}
                          
                          <button
                            onClick={() => exportAttendees(webinar)}
                            className="text-green-600 hover:text-green-900"
                            title="Export Attendees"
                          >
                            <TrendingUp size={16} />
                          </button>
                          
                          <button className="text-yellow-600 hover:text-yellow-900" title="Edit">
                            <Edit size={16} />
                          </button>
                          
                          <button
                            onClick={() => deleteWebinar(webinar.webinar_key)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Create Webinar Modal - Same as before but enhanced */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Create New Webinar</h2>
                <form onSubmit={createWebinar} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes) *</label>
                      <input
                        type="number"
                        required
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agenda</label>
                    <textarea
                      value={formData.agenda}
                      onChange={(e) => setFormData({...formData, agenda: e.target.value})}
                      rows={3}
                      placeholder="Detailed agenda for the webinar..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time *</label>
                      <input
                        type="datetime-local"
                        required
                        value={formData.start_date}
                        onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                      <select
                        value={formData.timezone}
                        onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata</option>
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">America/New_York</option>
                        <option value="Europe/London">Europe/London</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Presenter Name</label>
                      <input
                        type="text"
                        value={formData.presenter_name}
                        onChange={(e) => setFormData({...formData, presenter_name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Presenter Email</label>
                      <input
                        type="email"
                        value={formData.presenter_email}
                        onChange={(e) => setFormData({...formData, presenter_email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                      <input
                        type="number"
                        value={formData.max_participants}
                        onChange={(e) => setFormData({...formData, max_participants: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Recurrence Type</label>
                      <select
                        value={formData.recurrence_type}
                        onChange={(e) => setFormData({...formData, recurrence_type: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="none">No Recurrence</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="registration_required"
                      checked={formData.registration_required}
                      onChange={(e) => setFormData({...formData, registration_required: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="registration_required" className="ml-2 block text-sm text-gray-900">
                      Registration Required
                    </label>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCreateForm(false)
                        resetForm()
                      }}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Creating...' : 'Create Webinar'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Attendees Modal - Same as before */}
        {showAttendeesModal && selectedWebinar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    Attendees - {selectedWebinar.title}
                  </h2>
                  <button
                    onClick={() => setShowAttendeesModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading attendees...</p>
                  </div>
                ) : attendees.length === 0 ? (
                  <div className="text-center py-12">
                    <Users size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">No attendees found</p>
                  </div>
                ) : (
                  <div className="mb-4 flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                      Total Attendees: {attendees.length}
                    </p>
                    <button
                      onClick={() => exportAttendees(selectedWebinar)}
                      className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <TrendingUp size={16} />
                      Export CSV
                    </button>
                  </div>
                )}
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Registration Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {attendees.map((attendee, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {attendee.first_name} {attendee.last_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {attendee.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(attendee.registration_time)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              attendee.status === 'registered' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {attendee.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sessions Modal */}
        {showSessionsModal && selectedWebinar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    Sessions - {selectedWebinar.title}
                  </h2>
                  <button
                    onClick={() => setShowSessionsModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading sessions...</p>
                  </div>
                ) : sessions.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">No sessions found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sessions.map((session, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">Session {index + 1}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {formatDate(session.start_date)}
                            </p>
                          </div>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            session.status === 'completed' 
                              ? 'bg-green-100 text-green-800'
                              : session.status === 'live'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {session.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminWebinarManager
