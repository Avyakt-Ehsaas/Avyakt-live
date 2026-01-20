import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import API from '../../../utils/api'
import PreviewSurvey from '../../Surveys/PreviewSurvey'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const SurveyResponses = () => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('preview')
  const [survey, setSurvey] = useState(null)
  const [responses, setResponses] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResponses, setTotalResponses] = useState(0)
  const [expandedResponses, setExpandedResponses] = useState(new Set())
  
  const responsesPerPage = 10
  const totalPages = Math.ceil(totalResponses / responsesPerPage)

  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1', '#14b8a6']

  useEffect(() => {
    if (id && activeTab !== 'preview') {
      fetchTabData()
    }
  }, [id, activeTab, currentPage])

  const fetchTabData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'responses') {
        await fetchResponses()
      } else if (activeTab === 'analytics') {
        await fetchAnalytics()
      }
    } catch (error) {
      toast.error('Error loading data')
    } finally {
      setLoading(false)
    }
  }

  const fetchResponses = async () => {
    try {
      const response = await API.get(`/surveys/${id}/surveyResponses?page=${currentPage}&limit=${responsesPerPage}`)
      if (response?.data?.success) {
        // For now, return all responses and implement pagination on frontend
        // TODO: Backend should implement pagination
        const allResponses = response.data.responses
        const startIndex = (currentPage - 1) * responsesPerPage
        const endIndex = startIndex + responsesPerPage
        const paginatedResponses = allResponses.slice(startIndex, endIndex)
        
        setResponses(paginatedResponses)
        setTotalResponses(allResponses.length)
      } else {
        toast.error(response.data.message || 'Failed to load responses')
      }
    } catch (error) {
      toast.error('Error loading responses')
    }
  }

  const fetchAnalytics = async () => {
    try {
      // First fetch all responses to generate analytics
      const response = await API.get(`/surveys/${id}/surveyResponses`)
      if (response?.data?.success) {
        const analyticsData = generateAnalytics(response.data.responses)
        setAnalytics(analyticsData)
      } else {
        toast.error(response.data.message || 'Failed to load analytics')
      }
    } catch (error) {
      toast.error('Error loading analytics')
    }
  }

  const generateAnalytics = (responses) => {
    if (!responses || responses.length === 0) {
      return null
    }

    const questionMap = new Map()
    const totalResponses = responses.length

    // Collect all questions and their answers
    responses.forEach(response => {
      response.answers.forEach(answerObj => {
        const questionId = answerObj.question._id
        if (!questionMap.has(questionId)) {
          questionMap.set(questionId, {
            questionText: answerObj.question.questionText,
            type: answerObj.question.type,
            options: answerObj.question.options || [],
            answers: []
          })
        }
        questionMap.get(questionId).answers.push(answerObj.answer)
      })
    })

    // Generate analytics for each question
    const questionAnalytics = Array.from(questionMap.values()).map(question => {
      const analytics = {
        questionText: question.questionText,
        type: question.type,
        totalAnswers: question.answers.length
      }

      switch (question.type) {
        case 'mcq':
        case 'dropdown':
          const optionCounts = {}
          question.options.forEach(option => {
            optionCounts[option.value] = 0
          })
          
          question.answers.forEach(answer => {
            if (optionCounts.hasOwnProperty(answer)) {
              optionCounts[answer]++
            }
          })

          analytics.options = Object.entries(optionCounts).map(([label, count]) => ({
            label,
            count,
            percentage: ((count / totalResponses) * 100).toFixed(1)
          }))
          break

        case 'multi':
          const multiOptionCounts = {}
          question.options.forEach(option => {
            multiOptionCounts[option.label] = 0
          })
          
          question.answers.forEach(answer => {
            if (Array.isArray(answer)) {
              answer.forEach(selectedOption => {
                if (multiOptionCounts.hasOwnProperty(selectedOption)) {
                  multiOptionCounts[selectedOption]++
                }
              })
            }
          })

          analytics.options = Object.entries(multiOptionCounts).map(([label, count]) => ({
            label,
            // count,
            percentage: ((count / totalResponses) * 100).toFixed(1)
          }))
          break

        case 'rating':
        case 'scale':
          const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
          let totalRating = 0
          
          question.answers.forEach(answer => {
            const rating = parseInt(answer)
            if (rating >= 1 && rating <= 5) {
              ratingCounts[rating]++
              totalRating += rating
            }
          })

          analytics.ratingDistribution = Object.entries(ratingCounts).map(([rating, count]) => ({
            rating: `${rating}`,
            count
          }))
          
          const validRatings = question.answers.filter(a => {
            const rating = parseInt(a)
            return rating >= 1 && rating <= 5
          })
          
          analytics.averageRating = validRatings.length > 0 
            ? totalRating / validRatings.length 
            : 0
          break

        case 'yesno':
          let yesCount = 0
          let noCount = 0
          
          question.answers.forEach(answer => {
            if (answer === 'yes') yesCount++
            else if (answer === 'no') noCount++
          })

          analytics.yesCount = yesCount
          analytics.noCount = noCount
          analytics.yesNoDistribution = [
            { answer: 'Yes', count: yesCount },
            { answer: 'No', count: noCount }
          ]
          break

        case 'text':
          analytics.textResponseCount = question.answers.length
          break

        default:
          break
      }

      return analytics
    })

    return {
      totalResponses,
      completionRate: 100, // Since these are submitted responses
      questionAnalytics
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setCurrentPage(1)
    if (tab === 'responses') {
      setResponses([])
      setExpandedResponses(new Set())
    } else if (tab === 'analytics') {
      setAnalytics(null)
    }
  }

  console.log(responses)
  console.log(analytics)

  const toggleResponseExpansion = (responseId) => {
    setExpandedResponses(prev => {
      const newSet = new Set(prev)
      if (newSet.has(responseId)) {
        newSet.delete(responseId)
      } else {
        newSet.add(responseId)
      }
      return newSet
    })
  }

  const renderPreviewTab = () => {
    return <PreviewSurvey />
  }

  const renderResponsesTab = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-pulse"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-purple-600 border-r-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-lg font-medium text-gray-600">Loading responses...</p>
        </div>
      )
    }

    return (
      <div className="space-y-6 md:space-y-8">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl border border-white/50 p-4 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text text-transparent">
              Survey Responses
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-600">Live Data</span>
            </div>
          </div>
          
          {/* Result Statistics Summary */}
          {responses.length > 0 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              <h4 className="text-lg font-bold text-amber-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Result Distribution
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(() => {
                  const resultCounts = {}
                  responses.forEach(response => {
                    if (response.result) {
                      const title = response.result.title
                      resultCounts[title] = (resultCounts[title] || 0) + 1
                    }
                  })
                  
                  return Object.entries(resultCounts).map(([title, count]) => (
                    <div key={title} className="bg-white rounded-lg p-3 border border-amber-200 text-center">
                      <div className="text-lg font-bold text-amber-800">{count}</div>
                      <div className="text-xs text-gray-600 truncate">{title}</div>
                      <div className="text-xs text-amber-600">
                        {((count / responses.length) * 100).toFixed(1)}%
                      </div>
                    </div>
                  ))
                })()}
              </div>
            </div>
          )}
          
          {responses.length === 0 ? (
            <div className="text-center py-12 md:py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl md:rounded-3xl mb-4 md:mb-6">
                <span className="text-3xl md:text-4xl">📊</span>
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">No responses yet</h4>
              <p className="text-gray-600 max-w-md mx-auto text-sm md:text-base">Start sharing your survey to collect valuable responses and insights</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 md:space-y-6">
                {responses.map((response, index) => (
                  <div key={response._id} className="group bg-white/60 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/40 p-4 md:p-8 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:bg-white/80">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4 md:mb-6">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
                          <div className="relative">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white text-lg md:text-xl font-bold shadow-lg">
                              {response.user?.name?.charAt(0).toUpperCase() || 'A'}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
                              {response.user?.name || 'Anonymous User'}
                            </h4>
                            <p className="text-gray-600 flex items-center text-sm md:text-base">
                              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span className="truncate">{response.user?.email || response.email || 'No email provided'}</span>
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 md:mt-4 inline-flex items-center px-3 md:px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg md:rounded-xl border border-blue-200">
                          <svg className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs md:text-sm font-medium text-gray-700">
                            {new Date(response.submittedAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleResponseExpansion(response._id)}
                        className="group/btn px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 text-sm md:text-base"
                      >
                        <span>{expandedResponses.has(response._id) ? 'Hide' : 'View'} Answers</span>
                        <svg className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 ${expandedResponses.has(response._id) ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    
                    {expandedResponses.has(response._id) && (
                      <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-200/50">
                        {/* Result Section */}
                        {response.result && (
                          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                            <div className="flex items-center mb-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white mr-3">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <h5 className="text-lg font-bold text-blue-800">User Result</h5>
                            </div>
                            
                            <div className="text-center mb-3">
                              <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold text-sm mb-2">
                                {response.result.title}
                              </div>
                              <p className="text-gray-700 text-sm max-w-md mx-auto">
                                {response.result.description}
                              </p>
                              <div className="mt-2 text-xs text-gray-600">
                                Score: <span className="font-bold text-blue-600">{response.result.score}</span>
                              </div>
                            </div>

                            {/* Score Breakdown */}
                            {response.scoreMap && Object.keys(response.scoreMap).length > 0 && (
                              <div className="mt-4">
                                <h6 className="text-sm font-semibold text-gray-800 mb-2 flex items-center justify-center">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                  </svg>
                                  Score Breakdown
                                </h6>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {Object.entries(response.scoreMap).map(([key, score]) => (
                                    <div key={key} className="flex items-center justify-between bg-white rounded-lg p-2 border border-gray-200">
                                      <span className="text-xs font-medium text-gray-600 capitalize">
                                        {key.replace(/_/g, ' ')}
                                      </span>
                                      <div className="flex items-center">
                                        <div className="w-12 bg-gray-200 rounded-full h-1.5 mr-2">
                                          <div 
                                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
                                            style={{ 
                                              width: `${Math.min((score / Math.max(...Object.values(response.scoreMap))) * 100, 100)}%` 
                                            }}
                                          />
                                        </div>
                                        <span className="text-xs font-bold text-blue-600 w-6 text-right">
                                          {score}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <h5 className="text-base md:text-lg font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
                          <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          Response Details
                        </h5>
                        <div className="space-y-3 md:space-y-4">
                          {response.answers.map((answer, ansIndex) => (
                            <div key={ansIndex} className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-lg md:rounded-xl p-4 md:p-6 border border-gray-200/50">
                              <div className="flex items-start space-x-2 md:space-x-3 mb-2 md:mb-3">
                                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-xs md:text-sm font-bold flex-shrink-0">
                                  {ansIndex + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-gray-800 text-sm md:text-base mb-1 md:mb-2">
                                    {answer.question?.questionText || 'Question text not available'}
                                  </p>
                                  <div className="bg-white/80 rounded-lg p-3 md:p-4 border border-gray-200">
                                    <p className="text-gray-700 text-sm md:text-base break-words">
                                      {Array.isArray(answer.answer) 
                                        ? answer.answer.join(', ') 
                                        : answer.answer}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200/50 gap-4">
                  <div className="text-gray-600 text-sm md:text-base order-2 sm:order-1">
                    <span className="font-medium">Showing {((currentPage - 1) * responsesPerPage) + 1}-{Math.min(currentPage * responsesPerPage, totalResponses)}</span>
                    <span className="mx-2">of</span>
                    <span className="font-bold text-gray-800">{totalResponses}</span>
                    <span className="ml-2">responses</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 order-1 sm:order-2 w-full sm:w-auto">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="group px-3 py-2 md:px-6 md:py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg md:rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-1 md:space-x-2 text-sm md:text-base"
                    >
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="hidden sm:inline">Previous</span>
                    </button>
                    
                    <div className="flex items-center space-x-1 md:space-x-2">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                              currentPage === pageNum
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="group px-3 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg md:rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-1 md:space-x-2 text-sm md:text-base"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  }

  const renderAnalyticsTab = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 border-r-green-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-lg font-medium text-gray-600">Loading analytics...</p>
        </div>
      )
    }

    if (!analytics) {
      return (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-6">
            <span className="text-4xl">📊</span>
          </div>
          <h4 className="text-2xl font-bold text-gray-800 mb-3">No analytics data</h4>
          <p className="text-gray-600 max-w-md mx-auto">Submit some responses to see detailed analytics and insights</p>
        </div>
      )
    }

    return (
      <div className="space-y-8 md:space-y-10">
        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="group bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-purple-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg">
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-xs md:text-sm font-medium text-purple-600 mb-1">Total</p>
                <p className="text-2xl md:text-3xl font-bold text-purple-800">{analytics.totalResponses}</p>
              </div>
            </div>
            <h3 className="text-base md:text-lg font-bold text-gray-800">Total Responses</h3>
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">Complete survey submissions</p>
          </div>
          
          <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-green-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg">
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-xs md:text-sm font-medium text-green-600 mb-1">Rate</p>
                <p className="text-2xl md:text-3xl font-bold text-green-800">{analytics.completionRate}%</p>
              </div>
            </div>
            <h3 className="text-base md:text-lg font-bold text-gray-800">Completion Rate</h3>
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">Survey completion percentage</p>
          </div>
          
          {/* <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-blue-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg">
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-xs md:text-sm font-medium text-blue-600 mb-1">Average</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-800">{analytics.averageTime}</p>
              </div>
            </div>
            <h3 className="text-base md:text-lg font-bold text-gray-800">Avg. Time</h3>
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">Minutes per completion</p>
          </div> */}
        </div>

        {/* Premium Question Analytics */}
        <div className="space-y-6 md:space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Question Analytics</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
            {analytics.questionAnalytics?.map((question, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl border border-white/50 p-4 md:p-8 hover:shadow-3xl transition-all duration-500">
                <div className="mb-4 md:mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 md:mb-3 gap-2">
                    <h4 className="text-lg md:text-xl font-bold text-gray-800">
                      <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg text-white text-xs md:text-sm font-bold mr-2 md:mr-3">
                        {index + 1}
                      </span>
                      <span className="break-words">{question.questionText.length > 50 
                        ? `${question.questionText.substring(0, 50)}...` 
                        : question.questionText}</span>
                    </h4>
                  </div>
                  <div className="inline-flex items-center px-2 py-1 md:px-3 md:py-1 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full border border-purple-200">
                    <span className="text-xs md:text-sm font-medium text-purple-700">
                      {question.type.toUpperCase()}
                    </span>
                  </div>
                </div>
              
                {question.type === 'mcq' || question.type === 'dropdown' ? (
                  <div className="space-y-4 md:space-y-6">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-4 md:p-6 border border-gray-200 overflow-x-auto">
                      <div className="min-w-[300px] md:min-w-full">
                        <BarChart width={window.innerWidth < 768 ? 300 : 400} height={window.innerWidth < 768 ? 200 : 250} data={question.options}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.2)" />
                          <XAxis dataKey="label" stroke="#6b7280" fontSize={window.innerWidth < 768 ? 10 : 12} />
                          <YAxis stroke="#6b7280" fontSize={window.innerWidth < 768 ? 10 : 12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                              border: '1px solid #e5e7eb',
                              borderRadius: '12px',
                              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                            }} 
                          />
                          <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-4 md:p-6 border border-gray-200 overflow-x-auto">
                      <div className="min-w-[300px] md:min-w-full flex justify-center">
                        <PieChart width={window.innerWidth < 768 ? 300 : 200} height={window.innerWidth < 768 ? 200 : 200}>
                          <Pie
                            data={question.options}
                            cx={window.innerWidth < 768 ? 150 : 100}
                            cy={window.innerWidth < 768 ? 100 : 100}
                            labelLine={false}
                            label={({ name, percent }) => window.innerWidth < 768 ? `${(percent * 100).toFixed(0)}%` : `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={window.innerWidth < 768 ? 80 : 60}
                            fill="#8884d8"
                            dataKey="count"
                          >
                            {question.options.map((entry, idx) => (
                              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                              border: '1px solid #e5e7eb',
                              borderRadius: '12px',
                              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                            }} 
                          />
                        </PieChart>
                      </div>
                    </div>
                  </div>
                ) : question.type === 'rating' || question.type === 'scale' ? (
                  <div className="space-y-4 md:space-y-6">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-4 md:p-6 border border-gray-200 overflow-x-auto">
                      <div className="min-w-[300px] md:min-w-full">
                        <BarChart width={window.innerWidth < 768 ? 300 : 400} height={window.innerWidth < 768 ? 200 : 250} data={question.ratingDistribution}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.2)" />
                          <XAxis dataKey="rating" stroke="#6b7280" fontSize={window.innerWidth < 768 ? 10 : 12} />
                          <YAxis stroke="#6b7280" fontSize={window.innerWidth < 768 ? 10 : 12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                              border: '1px solid #e5e7eb',
                              borderRadius: '12px',
                              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                            }} 
                          />
                          <Legend />
                          <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 md:p-6 border border-yellow-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-sm md:text-base font-medium text-yellow-700 mb-1">Average Rating</p>
                          <p className="text-2xl md:text-3xl font-bold text-yellow-800">⭐ {question.averageRating?.toFixed(2)}</p>
                        </div>
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg">
                          <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : question.type === 'yesno' ? (
                  <div className="space-y-4 md:space-y-6">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-4 md:p-6 border border-gray-200 overflow-x-auto">
                      <div className="min-w-[300px] md:min-w-full">
                        <BarChart width={window.innerWidth < 768 ? 300 : 400} height={window.innerWidth < 768 ? 200 : 250} data={question.yesNoDistribution}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.2)" />
                          <XAxis dataKey="answer" stroke="#6b7280" fontSize={window.innerWidth < 768 ? 10 : 12} />
                          <YAxis stroke="#6b7280" fontSize={window.innerWidth < 768 ? 10 : 12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                              border: '1px solid #e5e7eb',
                              borderRadius: '12px',
                              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                            }} 
                          />
                          <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-green-200 text-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg md:rounded-xl flex items-center justify-center text-white mx-auto mb-2 md:mb-3">
                          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-green-800">{question.yesCount}</p>
                        <p className="text-xs md:text-sm font-medium text-green-600">Yes</p>
                      </div>
                      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-red-200 text-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg md:rounded-xl flex items-center justify-center text-white mx-auto mb-2 md:mb-3">
                          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-red-800">{question.noCount}</p>
                        <p className="text-xs md:text-sm font-medium text-red-600">No</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-6 md:p-8 border border-gray-200 text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white mx-auto mb-3 md:mb-4">
                      <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <p className="text-base md:text-lg font-bold text-gray-800 mb-1 md:mb-2">Text Responses</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-700 mb-2 md:mb-3">{question.textResponseCount}</p>
                    <p className="text-xs md:text-sm text-gray-600">Advanced text analytics coming soon!</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-blue-50/30 to-green-50/40'>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 via-pink-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Premium Header */}
          <div className="mb-8 text-center px-4">
       <div className="flex justify-center gap-4">
               <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-2xl mb-4 md:mb-6 transform hover:rotate-6 transition-transform duration-300">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mt-3 md:mt-1 mb-2 md:mb-4 leading-tight">
              Survey Analytics
            </h1>
       </div>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Advanced insights and comprehensive analysis of your survey responses
            </p>
          </div>

          {/* Premium Navigation Tabs */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl border border-white/50 overflow-hidden mb-6 md:mb-8">
            <div className="border-b border-gray-200/50">
              <nav className="flex flex-row justify-evenly -mb-px">
                <button
                  onClick={() => handleTabChange('preview')}
                  className={`group relative py-4 px-6 text-sm md:text-lg transition-all duration-300 ${
                    activeTab === 'preview'
                      ? 'text-purple-700  font-semibold bg-gradient-to-r from-purple-50 to-blue-50 border-b-3 border-purple-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
                  }`}
                >
                  <span className="flex items-center justify-center space-x-2 md:space-x-3">
                    <span className={`text-xl  transition-transform duration-300 ${activeTab === 'preview' ? 'scale-110' : 'group-hover:scale-110'}`}>
                      👁️
                    </span>
                    <span className="hidden sm:inline">Preview</span>
                  </span>
                  {activeTab === 'preview' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-full"></div>
                  )}
                </button>
                <button
                  onClick={() => handleTabChange('responses')}
                  className={`group relative py-4 px-6 text-sm md:text-lg transition-all duration-300 ${
                    activeTab === 'responses'
                      ? 'text-blue-700  font-semibold bg-gradient-to-r from-blue-50 to-cyan-50 border-b-3 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
                  }`}
                >
                  <span className="flex items-center justify-center space-x-2 md:space-x-3">
                    <span className={`text-xl transition-transform duration-300 ${activeTab === 'responses' ? 'scale-110' : 'group-hover:scale-110'}`}>
                      📊
                    </span>
                    <span className="hidden sm:inline">Responses</span>
                  </span>
                  {activeTab === 'responses' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-t-full"></div>
                  )}
                </button>
                <button
                  onClick={() => handleTabChange('analytics')}
                  className={`group relative py-4 px-6  text-sm md:text-lg transition-all duration-300 ${
                    activeTab === 'analytics'
                      ? 'text-green-700 font-semibold bg-gradient-to-r from-green-50 to-emerald-50 border-b-3 border-green-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
                  }`}
                >
                  <span className="flex items-center justify-center space-x-2 md:space-x-3">
                    <span className={`text-xl transition-transform duration-300 ${activeTab === 'analytics' ? 'scale-110' : 'group-hover:scale-110'}`}>
                      📈
                    </span>
                    <span className="hidden sm:inline">Analytics</span>
                  </span>
                  {activeTab === 'analytics' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-full"></div>
                  )}
                </button>
              </nav>
            </div>

            <div className="p-4 md:p-8">
              {activeTab === 'preview' && renderPreviewTab()}
              {activeTab === 'responses' && renderResponsesTab()}
              {activeTab === 'analytics' && renderAnalyticsTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SurveyResponses
