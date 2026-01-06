import React, { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import API from '../../utils/api'
import toast from 'react-hot-toast'
import { Calendar, Clock, Users, Video, Plus, Edit, Trash2, UserCheck, BarChart3 } from 'lucide-react'

const WebinarDashboard = () => {
  const { user } = useAuth()
  const [webinars, setWebinars] = useState([])
  const [ongoingWebinars, setOngoingWebinars] = useState([])
  const [selectedWebinar, setSelectedWebinar] = useState(null)
  const [attendees, setAttendees] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('upcoming')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showAttendeesModal, setShowAttendeesModal] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    duration: '',
    timezone: 'Asia/Kolkata',
    language: 'en',
    recurrence_type: 'none',
    max_participants: 100,
    registration_required: true
  })

  const fetchWebinars = async (type = 'upcoming') => {
    try {
      setLoading(true)
      const res = await API.get(`/webinars/all-webinars?listtype=${type}`)
      setWebinars(res.data.webinars || [])
    } catch (error) {
      console.error('Failed to fetch webinars:', error)
      toast.error('Failed to fetch webinars')
    } finally {
      setLoading(false)
    }
  }

  const fetchOngoingWebinars = async () => {
    try {
      const res = await API.get('/webinars/ongoing')
      setOngoingWebinars(res.data.webinars || [])
    } catch (error) {
      console.error('Failed to fetch ongoing webinars:', error)
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

  const createWebinar = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await API.post('/webinars/create', formData)
      toast.success('Webinar created successfully')
      setShowCreateForm(false)
      setFormData({
        title: '',
        description: '',
        start_date: '',
        duration: '',
        timezone: 'Asia/Kolkata',
        language: 'en',
        recurrence_type: 'none',
        max_participants: 100,
        registration_required: true
      })
      fetchWebinars(activeTab)
    } catch (error) {
      console.error('Failed to create webinar:', error)
      toast.error('Failed to create webinar')
    } finally {
      setLoading(false)
    }
  }

  const deleteWebinar = async (webinarId) => {
    if (!window.confirm('Are you sure you want to delete this webinar?')) return
    
    try {
      await API.delete(`/webinars/${webinarId}`)
      toast.success('Webinar deleted successfully')
      fetchWebinars(activeTab)
    } catch (error) {
      console.error('Failed to delete webinar:', error)
      toast.error('Failed to delete webinar')
    }
  }

  const registerForWebinar = async (webinarId) => {
    try {
      await API.post(`/webinars/${webinarId}/register`, {
        email: user.email,
        first_name: user.name?.split(' ')[0] || '',
        last_name: user.name?.split(' ')[1] || ''
      })
      toast.success('Registered for webinar successfully')
    } catch (error) {
      console.error('Failed to register for webinar:', error)
      toast.error('Failed to register for webinar')
    }
  }

  const viewAttendees = (webinar) => {
    setSelectedWebinar(webinar)
    setShowAttendeesModal(true)
    fetchAttendees(webinar.webinar_key)
  }

  useEffect(() => {
    if (user) {
      fetchWebinars(activeTab)
      fetchOngoingWebinars()
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
              <h1 className="text-3xl font-bold text-gray-900">Webinar Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your Zoho webinars</p>
            </div>
            {user?.role === 'admin' && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                Create Webinar
              </button>
            )}
          </div>
        </div>

        {/* Ongoing Webinars */}
        {ongoingWebinars.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-red-800 mb-3 flex items-center gap-2">
              <Video className="animate-pulse" size={20} />
              Live Webinars
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ongoingWebinars.map((webinar) => (
                <div key={webinar.webinar_key} className="bg-white p-4 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-gray-900">{webinar.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{webinar.description}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href={webinar.join_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                    >
                      Join Now
                    </a>
                    <span className="text-xs text-red-600 flex items-center gap-1">
                      <Clock size={12} />
                      Live
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['upcoming', 'past', 'all'].map((tab) => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading webinars...</p>
            </div>
          ) : webinars.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Video size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No webinars found</p>
            </div>
          ) : (
            webinars.map((webinar) => (
              <div key={webinar.webinar_key} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{webinar.title}</h3>
                  {isWebinarLive(webinar.start_date, webinar.end_date) && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">LIVE</span>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{webinar.description}</p>
                
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {formatDate(webinar.start_date)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {webinar.duration} minutes
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    {webinar.participants_count || 0} / {webinar.max_participants} participants
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {isWebinarLive(webinar.start_date, webinar.end_date) && (
                    <a
                      href={webinar.join_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                    >
                      Join
                    </a>
                  )}
                  
                  {!isWebinarLive(webinar.start_date, webinar.end_date) && new Date(webinar.start_date) > new Date() && (
                    <button
                      onClick={() => registerForWebinar(webinar.webinar_key)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Register
                    </button>
                  )}
                  
                  {user?.role === 'admin' && (
                    <>
                      <button
                        onClick={() => viewAttendees(webinar)}
                        className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors flex items-center gap-1"
                      >
                        <UserCheck size={14} />
                        Attendees
                      </button>
                      <button className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 transition-colors flex items-center gap-1">
                        <Edit size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteWebinar(webinar.webinar_key)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors flex items-center gap-1"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Create Webinar Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Create New Webinar</h2>
                <form onSubmit={createWebinar} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
                      <input
                        type="datetime-local"
                        required
                        value={formData.start_date}
                        onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                      <input
                        type="number"
                        required
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
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
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                      <input
                        type="number"
                        value={formData.max_participants}
                        onChange={(e) => setFormData({...formData, max_participants: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
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
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
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

        {/* Attendees Modal */}
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
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WebinarDashboard
