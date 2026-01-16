import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiTrash2, FiSave, FiEye, FiSettings, FiType, FiList, FiCalendar, FiUsers, FiCheckCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'
import API from '../../../utils/api'

const CreateSurvey = () => {
  const [surveyTitle, setSurveyTitle] = useState('')
  const [surveyDescription, setSurveyDescription] = useState('')
  const [questions, setQuestions] = useState([
    { id: 1, type: 'text', questionText: '', required: true }
  ])
  const [settings, setSettings] = useState({
    anonymous: false,
    allowMultipleSubmissions: false,
    deadline: '',
    isActive : true,
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
    const newOption = { id: Date.now(), text: '' }
    updateQuestion(questionId, 'options', [...(questions.find(q => q.id === questionId)?.options || []), newOption])
  }

  const removeOption = (questionId, optionId) => {
    const question = questions.find(q => q.id === questionId)
    if (question) {
      updateQuestion(questionId, 'options', question.options.filter(o => o.id !== optionId))
    }
  }

  const updateOption = (questionId, optionId, text) => {
    const question = questions.find(q => q.id === questionId)
    if (question) {
      updateQuestion(questionId, 'options', 
        question.options.map(o => o.id === optionId ? { ...o, text } : o)
      )
    }
  }

  const saveSurvey = async() => {
    try {
    if (!surveyTitle.trim()) {
      toast.error('Please enter a survey title')
      return
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
    
    const response = await API.post('/surveys/create',{
        title: surveyTitle,
        description: surveyDescription,
        questions,
        isActive: settings.isActive
    })

    if(response?.data?.success){
        toast.success('Survey created successfully!')
        // Reset form after successful creation
        setSurveyTitle('')
        setSurveyDescription('')
        setQuestions([{ id: 1, type: 'text', questionText: '', required: true, options: [] }])
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


  const handlePreviewSurvey = async(req,res)=>{
    e.preventDefault();
    try {
        navigate('/previewSurvey')
    } catch (error) {
        toast.error("unable to preview this time")
    }
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden text-gray-800 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-4 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-xl mb-4 inline-block">
            <FiPlus className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Create New Survey
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Design engaging surveys to gather valuable insights
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Survey Details */}
            <motion.div 
              className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
                  Survey Details
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Survey Title</label>
                    <input
                      type="text"
                      value={surveyTitle}
                      onChange={(e) => setSurveyTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-white/40 backdrop-blur-sm border border-white/30 rounded-xl focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                      placeholder="Enter your survey title..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      value={surveyDescription}
                      onChange={(e) => setSurveyDescription(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/40 backdrop-blur-sm border border-white/30 rounded-xl focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                      placeholder="Describe your survey purpose..."
                    />
                  </div>
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
                              className="flex-1 px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
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
                          <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-gray-700">Options</span>
                              <button
                                onClick={() => addOption(question.id)}
                                className="group inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow hover:shadow-lg hover:scale-105 text-sm"
                              >
                                <FiPlus className="mr-1 w-3 h-3" />
                                Add Option
                              </button>
                            </div>
                            
                            <div className="space-y-2">
                              {(question.options || []).map((option, optionIndex) => (
                                <div key={option.id} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={option.text}
                                    onChange={(e) => updateOption(question.id, option.id, e.target.value)}
                                    className="flex-1 px-3 py-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 text-sm"
                                    placeholder={`Option ${optionIndex + 1}`}
                                  />
                                  <button
                                    onClick={() => removeOption(question.id, option.id)}
                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-110"
                                  >
                                    <FiTrash2 className="w-3 h-3" />
                                  </button>
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
              <div>
                 <div className="flex justify-end mt-4">
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
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-8">
            {/* Survey Settings */}
            <motion.div 
              className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
                  Settings
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Anonymous Responses</span>
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
                    <span className="text-sm font-medium text-gray-700">Multiple Submissions</span>
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
                    <span className="text-sm font-medium text-gray-700">Is Active</span>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                    <select
                      value={settings.targetAudience}
                      onChange={(e) => setSettings({...settings, targetAudience: e.target.value})}
                      className="w-full px-3 py-2 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    >
                      <option value="all">All Users</option>
                      <option value="premium">Premium Users</option>
                      <option value="new">New Users</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                    <input
                      type="datetime-local"
                      value={settings.deadline}
                      onChange={(e) => setSettings({...settings, deadline: e.target.value})}
                      className="w-full px-3 py-2 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div 
              className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 space-y-4">
                <button
                  onClick={saveSurvey}
                  className="group w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold text-lg"
                >
                  <FiSave className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Save Survey
                </button>
                
                <button
                onClick={handlePreviewSurvey}
                  className="group w-full inline-flex items-center justify-center px-6 py-3 bg-white/40 backdrop-blur-sm border border-white/30 text-gray-700 rounded-xl hover:bg-white/60 transition-all duration-300 font-medium"
                >
                  <FiEye className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Preview Survey
                </button>
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