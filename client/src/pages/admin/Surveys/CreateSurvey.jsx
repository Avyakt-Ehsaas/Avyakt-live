import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiTrash2, FiSave, FiEye, FiSettings, FiType, FiList, FiCalendar, FiUsers, FiCheckCircle, FiTarget, FiAward } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import API from '../../../utils/api'

const CreateSurvey = () => {
  const navigate = useNavigate()
  const [surveyTitle, setSurveyTitle] = useState('')
  const [surveyDescription, setSurveyDescription] = useState('')
  const [questions, setQuestions] = useState([
    { id: 1, type: 'text', questionText: '', required: true, options: [] }
  ])
  const [results, setResults] = useState([
    { id: 1, key: '', title: '', description: '' }
  ])
  const [settings, setSettings] = useState({
    anonymous: false,
    allowMultipleSubmissions: false,
    deadline: '',
    isActive: true,
    targetAudience: 'all'
  })

  const questionTypes = [
    { type: 'text', icon: FiType, label: 'Text', hasOptions: false },
    { type: 'mcq', icon: FiList, label: 'Multiple Choice', hasOptions: true },
    { type: 'multi', icon: FiCheckCircle, label: 'Multiple Select', hasOptions: true },
    { type: 'rating', icon: FiSettings, label: 'Rating Scale', hasOptions: true },
    { type: 'scale', icon: FiSettings, label: 'Scale', hasOptions: true },
    { type: 'yesno', icon: FiCheckCircle, label: 'Yes/No', hasOptions: false },
    { type: 'dropdown', icon: FiList, label: 'Dropdown', hasOptions: true }
  ]

  const addResult = () => {
    const newResult = {
      id: results.length + 1,
      key: '',
      title: '',
      description: ''
    }
    setResults([...results, newResult])
  }

  const removeResult = (id) => {
    setResults(results.filter(r => r.id !== id))
  }

  const updateResult = (id, field, value) => {
    setResults(results.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ))
  }

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: 'text',
      questionText: '',
      required: false,
      options: []
    }
    setQuestions([...questions, newQuestion])
  }

  const removeQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ))
  }

  const addOption = (questionId) => {
    const newOption = { id: Date.now(), text: '', value: '', scores: {} }
    updateQuestion(questionId, 'options', [...(questions.find(q => q.id === questionId)?.options || []), newOption])
    
    // Auto-focus the new option text input after a short delay
    setTimeout(() => {
      const optionInputs = document.querySelectorAll(`input[placeholder*="Option Text"]`)
      if (optionInputs.length > 0) {
        const lastInput = optionInputs[optionInputs.length - 1]
        lastInput?.focus()
      }
    }, 100)
  }

  const removeOption = (questionId, optionId) => {
    const question = questions.find(q => q.id === questionId)
    if (question) {
      updateQuestion(questionId, 'options', question.options.filter(o => o.id !== optionId))
    }
  }

  const updateOption = (questionId, optionId, field, value) => {
    const question = questions.find(q => q.id === questionId)
    if (question) {
      const updatedOptions = question.options.map(o => {
        if (o.id === optionId) {
          if (field === 'text') {
            return { ...o, text: value, value: o.value || value.toLowerCase().replace(/\s+/g, '_') }
          } else if (field === 'scores') {
            return { ...o, scores: value }
          } else {
            return { ...o, [field]: value }
          }
        }
        return o
      })
      updateQuestion(questionId, 'options', updatedOptions)
    }
  }

  const saveSurvey = async() => {
    try {
    if (!surveyTitle.trim()) {
      toast.error('Please enter a survey title')
      return
    }
    
    // Validate results
    for (let r of results) {
      if (!r.key || !r.key.trim()) {
        toast.error('Please fill in all result keys')
        return
      }
      if (!r.title || !r.title.trim()) {
        toast.error('Please fill in all result titles')
        return
      }
      if (!r.description || !r.description.trim()) {
        toast.error('Please fill in all result descriptions')
        return
      }
    }
    
    // Validate questions
    for (let q of questions) {
      if (!q.questionText || !q.questionText.trim()) {
        toast.error('Please fill in all question fields')
        return
      }
      
      // Check if question type requires options and options are provided
      const questionType = questionTypes.find(t => t.type === q.type)
      if (questionType?.hasOptions && (!q.options || q.options.length === 0)) {
        toast.error(`Options are required for ${questionType.label} questions`)
        return
      }
      
      // Check if all options have text
      if (q.options && q.options.length > 0) {
        const emptyOptions = q.options.filter(opt => !opt.text || !opt.text.trim())
        if (emptyOptions.length > 0) {
          toast.error('Please fill in all option fields')
          return
        }
      }
    }
    
    // Format questions for backend
    const formattedQuestions = questions.map((q, index) => ({
      questionText: q.questionText,
      type: q.type,
      required: q.required,
      order: index + 1,
      options: q.options.map(opt => ({
        text: opt.text,
        value: opt.value || opt.text.toLowerCase().replace(/\s+/g, '_'),
        scores: opt.scores || {}
      }))
    }))
    
    // Format results for backend
    const formattedResults = results.map(r => ({
      key: r.key.toLowerCase().replace(/\s+/g, '_'),
      title: r.title,
      description: r.description
    }))
    
    const response = await API.post('/surveys/create',{
        title: surveyTitle,
        description: surveyDescription,
        questions: formattedQuestions,
        results: formattedResults,
        isActive: settings.isActive
    })

    if(response?.data?.success){
        toast.success('Survey created successfully!')
        // Reset form after successful creation
        setSurveyTitle('')
        setSurveyDescription('')
        setQuestions([{ id: 1, type: 'text', questionText: '', required: true, options: [] }])
        setResults([{ id: 1, key: '', title: '', description: '' }])
        setSettings({
          anonymous: false,
          allowMultipleSubmissions: false,
          deadline: '',
          isActive: true,
          targetAudience: 'all'
        })
    } else {
        toast.error(response?.data?.message || 'Survey creation failed')
    }
    console.log('Survey Data:', response)
    } catch (error) {
     console.error('Survey creation error:', error)
     toast.error(error?.response?.data?.message || "Survey creation failed")   
    }
  }


  const handlePreviewSurvey = async () => {
    try {
      navigate('/previewSurvey')
    } catch (error) {
      toast.error("Unable to preview this time")
    }
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Premium animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 max-w-full mx-auto px-6 py-8">
        {/* Top Navigation Bar */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-slate-700 font-medium"
          >
            <FiSave className="mr-2 w-4 h-4 rotate-180" />
            Back to Dashboard
          </button>
        </motion.div>
        {/* Premium Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl mb-6">
            <FiPlus className="w-8 h-8" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent mb-4">
            Survey Creator Studio
          </h1>
          <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto">
            Create powerful, engaging surveys with advanced scoring and analytics
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Main Content - Full Width */}
          <div className="space-y-8">
            {/* Survey Details Card */}
            <motion.div 
              className="group relative bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl p-8 hover:shadow-3xl transition-all duration-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    <FiSettings className="w-5 h-5" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                    Survey Configuration
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded"></span>
                      Survey Title
                    </label>
                    <input
                      type="text"
                      value={surveyTitle}
                      onChange={(e) => setSurveyTitle(e.target.value)}
                      className="w-full px-5 py-4 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 text-lg font-medium placeholder-slate-400"
                      placeholder="Enter your survey title..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded"></span>
                      Description
                    </label>
                    <textarea
                      value={surveyDescription}
                      onChange={(e) => setSurveyDescription(e.target.value)}
                      rows={4}
                      className="w-full px-5 py-4 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 text-lg font-medium placeholder-slate-400 resize-none"
                      placeholder="Describe your survey purpose..."
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Survey Settings - Full Width */}
            <motion.div 
              className="group relative bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl p-8 hover:shadow-3xl transition-all duration-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    <FiSettings className="w-5 h-5" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                    Survey Settings
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-700">Anonymous Responses</span>
                    <button
                      onClick={() => setSettings({...settings, anonymous: !settings.anonymous})}
                      className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                        settings.anonymous ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        settings.anonymous ? 'translate-x-6' : 'translate-x-0.5'
                      }`}></div>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-700">Multiple Submissions</span>
                    <button
                      onClick={() => setSettings({...settings, allowMultipleSubmissions: !settings.allowMultipleSubmissions})}
                      className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                        settings.allowMultipleSubmissions ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        settings.allowMultipleSubmissions ? 'translate-x-6' : 'translate-x-0.5'
                      }`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-700">Is Active</span>
                    <button
                      onClick={() => setSettings({...settings, isActive: !settings.isActive})}
                      className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                        settings.isActive ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        settings.isActive ? 'translate-x-6' : 'translate-x-0.5'
                      }`}></div>
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded"></span>
                      Target Audience
                    </label>
                    <select
                      value={settings.targetAudience}
                      onChange={(e) => setSettings({...settings, targetAudience: e.target.value})}
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition-all duration-300 text-base font-medium"
                    >
                      <option value="all">All Users</option>
                      <option value="premium">Premium Users</option>
                      <option value="new">New Users</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded"></span>
                      Deadline
                    </label>
                    <input
                      type="datetime-local"
                      value={settings.deadline}
                      onChange={(e) => setSettings({...settings, deadline: e.target.value})}
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition-all duration-300 text-base font-medium"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

              {/* Survey Results - Full Width */}
            <motion.div 
              className="group relative bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl p-8 hover:shadow-3xl transition-all duration-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                      <FiTarget className="w-5 h-5" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
                      Survey Results Keys
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiAward className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  {results.map((result, index) => (
                    <motion.div 
                      key={result.id}
                      className="group relative bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-200/50 p-6 hover:shadow-lg transition-all duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-blue-100/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-sm font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-lg">Result {index + 1}</span>
                            </div>
                            <input
                              type="text"
                              value={result.key}
                              onChange={(e) => updateResult(result.id, 'key', e.target.value)}
                              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-purple-200/50 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 transition-all duration-300 text-sm font-mono font-bold mb-3"
                              placeholder="result_key"
                            />
                            <input
                              type="text"
                              value={result.title}
                              onChange={(e) => updateResult(result.id, 'title', e.target.value)}
                              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-purple-200/50 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 transition-all duration-300 text-lg font-bold mb-3"
                              placeholder="Result Title"
                            />
                            <textarea
                              value={result.description}
                              onChange={(e) => updateResult(result.id, 'description', e.target.value)}
                              rows={3}
                              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-purple-200/50 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 transition-all duration-300 text-base font-medium resize-none"
                              placeholder="Result description..."
                            />
                          </div>
                          {results.length > 1 && (
                            <button
                              onClick={() => removeResult(result.id)}
                              className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg ml-3"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={addResult}
                    className="group inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-bold text-lg"
                  >
                    <FiPlus className="mr-3 w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    Add Result
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Questions Section */}
            <motion.div 
              className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Questions
                  </h2>
                </div>

                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <motion.div 
                      key={question.id}
                      className="group relative bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-sm font-semibold text-gray-500">Q{index + 1}</span>
                              <select
                                value={question.type}
                                onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
                                className="px-3 py-1 bg-white/60 backdrop-blur-sm border border-white/30 rounded-lg text-sm focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                              >
                                {questionTypes.map(type => (
                                  <option key={type.type} value={type.type}>{type.label}</option>
                                ))}
                              </select>
                            </div>
                            <input
                              type="text"
                              value={question.questionText}
                              onChange={(e) => updateQuestion(question.id, 'questionText', e.target.value)}
                              className="flex-1 w-full px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                              placeholder="Enter your question..."
                            />
                          </div>
                          <button
                            onClick={() => removeQuestion(question.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Options Section */}
                        {questionTypes.find(t => t.type === question.type)?.hasOptions && (
                          <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                                <span className="text-sm font-bold text-slate-700">Answer Options</span>
                              </div>
                              <button
                                onClick={() => addOption(question.id)}
                                className="group inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-sm font-medium"
                              >
                                <FiPlus className="mr-2 w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                                Add Option
                              </button>
                            </div>
                            <div className="space-y-3">
                              {(question.options || []).map((option, optionIndex) => (
                                <div key={option.id} className="group relative bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-4 hover:shadow-lg transition-all duration-300">
                                  <div className="flex items-center gap-3">
                                    <div className="flex-1 space-y-2">
                                      <div className="flex items-center gap-2">
                                        <input
                                          type="text"
                                          value={option.text}
                                          onChange={(e) => updateOption(question.id, option.id, 'text', e.target.value)}
                                          className="flex-1 px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 transition-all duration-300 text-base font-medium placeholder-slate-400"
                                          placeholder={`Option ${optionIndex + 1} Text`}
                                        />
                                        <input
                                          type="text"
                                          value={option.value || ''}
                                          onChange={(e) => updateOption(question.id, option.id, 'value', e.target.value)}
                                          className="w-40 px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 transition-all duration-300 text-base font-mono font-medium placeholder-slate-400"
                                          placeholder="Value"
                                        />
                                        <button
                                          onClick={() => removeOption(question.id, option.id)}
                                          className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                        >
                                          <FiTrash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                      
                                      {/* Scoring Matrix */}
                                      {results.length > 0 && (
                                        <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
                                          <div className="flex items-center gap-2 mb-3">
                                            <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                                            <span className="text-sm font-bold text-slate-700">Scoring Matrix</span>
                                          </div>
                                          <div className="grid grid-cols-1 gap-3">
                                            {results.map(result => (
                                              <div key={result.id} className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3">
                                                <label className="text-xs font-bold text-slate-600 min-w-[100px] truncate">
                                                  {result.title || `Result ${result.id}`}:
                                                </label>
                                                <input
                                                  type="number"
                                                  value={option.scores[result.key] || ''}
                                                  onChange={(e) => {
                                                    const newScores = { ...option.scores, [result.key]: parseInt(e.target.value) || 0 }
                                                    updateOption(question.id, option.id, 'scores', newScores)
                                                  }}
                                                  className="flex-1 px-3 py-2 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-lg text-sm font-medium focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                                                  placeholder="0"
                                                  min="0"
                                                />
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center mt-4">
                          <input
                            type="checkbox"
                            checked={question.required}
                            onChange={(e) => updateQuestion(question.id, 'required', e.target.checked)}
                            className="w-4 h-4 text-green-600 bg-white/60 border-white/30 rounded focus:ring-green-400 focus:ring-2"
                          />
                          <label className="ml-2 text-sm text-gray-700">Required question</label>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="flex justify-end">
                    <button
                      onClick={addQuestion}
                      className="group inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <FiPlus className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                      Add Question
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>


          

            {/* Action Buttons - Full Width */}
            <motion.div 
              className="group relative bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl p-8 hover:shadow-3xl transition-all duration-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={saveSurvey}
                    className="group inline-flex items-center justify-center px-8 py-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 font-bold text-lg"
                  >
                    <FiSave className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    Publish Survey
                  </button>
                  
                  <button
                    onClick={handlePreviewSurvey}
                    className="group inline-flex items-center justify-center px-6 py-4 bg-white/40 backdrop-blur-xl border border-white/30 text-slate-700 rounded-2xl hover:bg-white/60 transition-all duration-300 font-bold text-lg"
                  >
                    <FiEye className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    Preview Survey
                  </button>
                </div>
              </div>
            </motion.div>
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

export default CreateSurvey