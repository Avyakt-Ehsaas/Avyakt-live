import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSend, FiUser, FiMail, FiCheckCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import toast from 'react-hot-toast'
import API from '../../../utils/api'

const GetSurvey = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [survey, setSurvey] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [answers, setAnswers] = useState({})
  const [userEmail, setUserEmail] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const questionsPerPage = 5

  useEffect(() => {
    fetchSurveyDetails()
  }, [id])

  const fetchSurveyDetails = async () => {
    try {
      setLoading(true)
      const response = await API.get(`/surveys/getSurvey/${id}`)
      
      if (response?.data?.success) {
        setSurvey(response.data.survey)
        setQuestions(response.data.questions)
        
        // Initialize answers object
        const initialAnswers = {}
        response.data.questions.forEach(q => {
          initialAnswers[q._id] = q.type === 'multi' ? [] : ''
        })
        setAnswers(initialAnswers)
      } else {
        toast.error(response?.data?.message || "Failed to load survey")
      }
    } catch (error) {
      console.error('Error fetching survey:', error)
      toast.error("Failed to load survey")
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleMultiSelectChange = (questionId, optionValue) => {
    setAnswers(prev => {
      const currentAnswers = prev[questionId] || []
      if (currentAnswers.includes(optionValue)) {
        return {
          ...prev,
          [questionId]: currentAnswers.filter(v => v !== optionValue)
        }
      } else {
        return {
          ...prev,
          [questionId]: [...currentAnswers, optionValue]
        }
      }
    })
  }

  const validateAnswers = () => {
    const requiredQuestions = questions.filter(q => q.required)
    
    for (let question of requiredQuestions) {
      const answer = answers[question._id]
      
      if (!answer || (Array.isArray(answer) && answer.length === 0)) {
        toast.error(`Please answer the required question: ${question.questionText}`)
        return false
      }
    }
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateAnswers()) {
      return
    }

    try {
      setSubmitting(true)
      
      // Format answers for API
      const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
        question: questionId,
        answer: answer
      }))

      const response = await API.post(`/surveys/${id}/submitSurvey`, {
        answers: formattedAnswers,
        email: userEmail || undefined
      })

      if (response?.data?.success) {
        toast.success("Survey submitted successfully!")
        navigate('/survey-thank-you')
      } else {
        toast.error(response?.data?.message || "Failed to submit survey")
      }
    } catch (error) {
      console.error('Error submitting survey:', error)
      toast.error("Failed to submit survey")
    } finally {
      setSubmitting(false)
    }
  }

  const getQuestionTypeLabel = (type) => {
    const typeLabels = {
      'text': 'Text',
      'mcq': 'Multiple Choice',
      'multi': 'Multiple Select',
      'rating': 'Rating Scale',
      'scale': 'Scale',
      'yesno': 'Yes/No',
      'dropdown': 'Dropdown'
    }
    return typeLabels[type] || type
  }

  // Pagination logic
  const indexOfLastQuestion = currentPage * questionsPerPage
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion)
  const totalPages = Math.ceil(questions.length / questionsPerPage)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1)
    }
  }

  const renderQuestionInput = (question) => {
    const answer = answers[question._id] || ''

    switch (question.type) {
      case 'text':
        return (
          <textarea
            value={answer}
            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
            className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none"
            rows={3}
            placeholder="Enter your answer..."
            required={question.required}
          />
        )

      case 'mcq':
        return (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name={`question-${question._id}`}
                  value={option.value}
                  checked={answer === option.value}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-white/60 border-white/30 rounded-full focus:ring-blue-400"
                  required={question.required}
                />
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )

      case 'multi':
        return (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={answer.includes(option.value)}
                  onChange={() => handleMultiSelectChange(question._id, option.value)}
                  className="w-4 h-4 text-blue-600 bg-white/60 border-white/30 rounded focus:ring-blue-400"
                />
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )

      case 'rating':
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleAnswerChange(question._id, rating)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                    answer === rating
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white/60 text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>
        )

      case 'scale':
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((scale) => (
                <button
                  key={scale}
                  type="button"
                  onClick={() => handleAnswerChange(question._id, scale)}
                  className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    answer === scale
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white/60 text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {scale}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>1</span>
              <span>10</span>
            </div>
          </div>
        )

      case 'yesno':
        return (
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={`question-${question._id}`}
                value="yes"
                checked={answer === 'yes'}
                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                className="w-4 h-4 text-blue-600 bg-white/60 border-white/30 rounded-full focus:ring-blue-400"
                required={question.required}
              />
              <span className="text-gray-700">Yes</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={`question-${question._id}`}
                value="no"
                checked={answer === 'no'}
                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                className="w-4 h-4 text-blue-600 bg-white/60 border-white/30 rounded-full focus:ring-blue-400"
                required={question.required}
              />
              <span className="text-gray-700">No</span>
            </label>
          </div>
        )

      case 'dropdown':
        return (
          <select
            value={answer}
            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
            className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
            required={question.required}
          >
            <option value="">Select an option...</option>
            {question.options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading survey...</p>
        </div>
      </div>
    )
  }

  if (!survey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Survey Not Found</h2>
          <p className="text-gray-600 mb-6">The survey you're looking for doesn't exist or is not active.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden text-gray-800 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Survey Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {survey.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {survey.description}
          </p>
        </motion.div>

        {/* Survey Form */}
        <motion.form 
          onSubmit={handleSubmit}
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* User Email (for anonymous users) */}
          <motion.div 
            className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <FiMail className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Your Email (Optional)</h3>
            </div>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
              placeholder="your.email@example.com"
            />
            <p className="text-sm text-gray-500 mt-2">
              Provide your email if you'd like to receive updates about this survey.
            </p>
          </motion.div>

          {/* Questions */}
          {questions.map((question, index) => (
            <motion.div 
              key={question._id}
              className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            >
              <div className="mb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    Question {index + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {getQuestionTypeLabel(question.type)}
                  </span>
                  {question.required && (
                    <span className="text-sm font-medium text-red-600 bg-red-100 px-2 py-1 rounded">
                      Required
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {question.questionText}
                </h3>
              </div>
              
              {renderQuestionInput(question)}
            </motion.div>
          ))}

          {/* Submit Button */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <FiSend className="mr-3" />
                  Submit Survey
                </>
              )}
            </button>
          </motion.div>
        </motion.form>
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

export default GetSurvey