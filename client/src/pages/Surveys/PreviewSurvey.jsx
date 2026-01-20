import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import API from '../../utils/api'

const PreviewSurvey = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [survey, setSurvey] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [email, setEmail] = useState('')

  const questionsPerPage = 1
  const totalPages = Math.ceil(questions.length / questionsPerPage)
  const startIndex = (currentPage - 1) * questionsPerPage
  const endIndex = startIndex + questionsPerPage
  const currentQuestions = questions.slice(startIndex, endIndex)

  useEffect(() => {
    fetchSurvey()
  }, [id])

  const fetchSurvey = async () => {
    try {
      const response = await API.get(`/surveys/getSurvey/${id}`)
      if (response?.data?.success) {
        setSurvey(response.data.survey)
        setQuestions(response.data.questions)
      } else {
        toast.error(response.data.message || 'Failed to load survey')
      }
    } catch (error) {
      toast.error('Error loading survey')
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
      const isSelected = currentAnswers.includes(optionValue)
      
      if (isSelected) {
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

  const validateCurrentPage = () => {
    for (const question of currentQuestions) {
      if (question.required && !answers[question._id]) {
        toast.error(`Please answer: ${question.questionText}`)
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    if (validateCurrentPage()) {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateCurrentPage()) return

    // Check if all required questions are answered
    const requiredQuestions = questions.filter(q => q.required)
    for (const question of requiredQuestions) {
      if (!answers[question._id]) {
        toast.error(`Please answer all required questions`)
        return
      }
    }

    // Check if email is provided for anonymous users
    if (!email.trim()) {
      toast.error('Email is required to submit the survey')
      return
    }

    setSubmitting(true)
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
        question: questionId,
        answer: Array.isArray(answer) ? answer : answer
      }))

      const response = await API.post(`/surveys/${id}/submitSurvey`, {
        answers: formattedAnswers,
        email: email.trim()
      })
      
      if (response.data.success) {
        toast.success('Survey submitted successfully!')
        navigate('/surveys/thank-you', { 
          state: { 
            result: response.data.result,
            scoreMap: response.data.scoreMap,
            surveyTitle: survey.title
          } 
        })
      } else {
        toast.error(response.data.message || 'Failed to submit survey')
      }
    } catch (error) {
      toast.error('Error submitting survey')
    } finally {
      setSubmitting(false)
    }
  }

  const renderQuestion = (question) => {
    const answer = answers[question._id]

    switch (question.type) {
      case 'text':
        return (
          <textarea
            className="glass-input w-full p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            rows="3"
            value={answer || ''}
            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
            placeholder="Enter your answer..."
          />
        )

      case 'mcq':
        return (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question._id}`}
                  value={option.value}
                  checked={answer === option.value}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )

      case 'multi':
        return (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={answer?.includes(option.value) || false}
                  onChange={() => handleMultiSelectChange(question._id, option.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )

      case 'dropdown':
        return (
          <select
            className="glass-input w-full p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            value={answer || ''}
            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
          >
            <option value="">Select an option...</option>
            {question.options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case 'yesno':
        return (
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={`question-${question._id}`}
                value="yes"
                checked={answer === 'yes'}
                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={`question-${question._id}`}
                value="no"
                checked={answer === 'no'}
                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span>No</span>
            </label>
          </div>
        )

      case 'rating':
        return (
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map(rating => (
              <button
                key={rating}
                type="button"
                onClick={() => handleAnswerChange(question._id, rating)}
                className={`w-10 h-10 rounded-lg border-2 font-semibold transition-all ${
                  answer === rating
                    ? 'border-purple-500 bg-purple-500 text-white shadow-lg'
                    : 'glass-input border-gray-300 hover:border-purple-400'
                }`}
              >
                {rating}
              </button>
            ))}
          </div>
        )

      case 'scale':
        return (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>1 (Strongly Disagree)</span>
              <span>5 (Strongly Agree)</span>
            </div>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map(scale => (
                <button
                  key={scale}
                  type="button"
                  onClick={() => handleAnswerChange(question._id, scale)}
                  className={`flex-1 py-2 rounded-lg border-2 font-semibold transition-all ${
                    answer === scale
                      ? 'border-purple-500 bg-purple-500 text-white shadow-lg'
                      : 'glass-input border-gray-300 hover:border-purple-400'
                  }`}
                >
                  {scale}
                </button>
              ))}
            </div>
          </div>
        )

      default:
        return <div className="text-gray-500">Unsupported question type</div>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading survey...</div>
      </div>
    )
  }

  if (!survey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Survey not found</div>
      </div>
    )
  }

  console.log(survey)

  return (
    <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50'>
      <style>{`
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
        .glass-effect {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .glass-input {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute top-20 left-20 w-60 h-60 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-3000"></div>
      </div>
      <div className="min-h-screen py-8 relative">
        <div className="max-w-5xl mx-auto px-4">
          <div className=" glass-effect rounded-2xl shadow-2xl p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{survey.title}</h1>
              {survey.description && (
                <p className="text-gray-600">{survey.description}</p>
              )}
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </span>
                <span className="text-sm text-gray-500">
                  Question {startIndex + 1}-{Math.min(endIndex, questions.length)} of {questions.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentPage / totalPages) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input w-full p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter your email address"
                required
              />
            </div>
              {currentQuestions.map((question, index) => (
                <div key={question._id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="mb-3">
                    <span className="text-sm font-medium text-blue-600">
                      Question {startIndex + index + 1}
                    </span>
                    {question.required && (
                      <span className="ml-2 text-red-500 text-sm">*</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {question.questionText}
                  </h3>
                  {renderQuestion(question)}
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                  currentPage === 1
                    ? 'glass-input text-gray-400 cursor-not-allowed'
                    : 'glass-effect text-gray-700 hover:bg-white/30'
                }`}
              >
                Previous
              </button>

              {currentPage === totalPages ? (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {submitting ? 'Submitting...' : 'Submit Survey'}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PreviewSurvey