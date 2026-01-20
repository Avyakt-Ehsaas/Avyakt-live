import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiCheckCircle, FiClock, FiArrowRight, FiGift, FiStar, FiAward, FiTrendingUp, FiTarget, FiBarChart2 } from 'react-icons/fi'

const ThankYouPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [countdown, setCountdown] = useState(10)
  const [progress, setProgress] = useState(0)
  const [showConfetti, setShowConfetti] = useState(true)

  // Get result data from navigation state
  const { result, scoreMap, surveyTitle } = location.state || {}

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/surveys')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prev + 10
      })
    }, 1000)

    return () => clearInterval(progressTimer)
  }, [])

  useEffect(() => {
    const confettiTimer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(confettiTimer)
  }, [])

  const handleRedirectNow = () => {
    navigate('/surveys')
  }

  return (
    <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50'>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(147, 51, 234, 0.4); }
          50% { box-shadow: 0 0 60px rgba(147, 51, 234, 0.8); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes ribbon-wave {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-ribbon {
          animation: ribbon-wave 3s ease-in-out infinite;
        }
        .animate-confetti {
          animation: confetti-fall 3s linear infinite;
        }
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .glass-effect {
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
        }
      `}</style>

      {/* Celebration Ribbons */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none">
        <div className="flex justify-between">
          <div className="animate-ribbon">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-br-full rounded-tl-full shadow-lg transform -rotate-12">
              <span className="font-bold text-sm">🎉 Thank You! 🎊</span>
            </div>
          </div>
          <div className="animate-ribbon animation-delay-1000">
            <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-2 rounded-bl-full rounded-tr-full shadow-lg transform rotate-12">
              <span className="font-bold text-sm">✨ Success! ✨</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#FFD700', '#FF69B4'][Math.floor(Math.random() * 7)]
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute top-20 left-20 w-60 h-60 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-3000"></div>
      </div>

      <div className="min-h-screen flex items-center justify-center px-4 pt-5 md:pt-10">
        <div className="max-w-4xl w-full">
          {/* Main Content Card */}
          <div className="glass-effect rounded-3xl shadow-2xl p-8 md:p-12 text-center relative overflow-hidden">
            
            {/* Success Icon with Stars */}
            <div className="mb-8 relative">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse-glow relative">
                <FiCheckCircle className="w-8 h-8 md:w-10 md:h-10 text-white animate-float" />
                {/* Sparkle Stars */}
                <FiStar className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-sparkle" />
                <FiStar className="absolute -bottom-2 -left-2 w-5 h-5 text-yellow-300 animate-sparkle animation-delay-1000" />
                <FiStar className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 text-yellow-300 animate-sparkle animation-delay-2000" />
              </div>
            </div>

            {/* Thank You Message */}
            <h1 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Thank You!
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-4">
              Your survey response has been successfully submitted.
            </p>
            <p className="text-base md:text-lg text-gray-600 mb-8">
              We appreciate your time and valuable feedback.
            </p>

            {/* Result Section */}
            {result && (
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                <div className="flex items-center justify-center mb-4">
                  <FiTarget className="w-8 h-8 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-blue-800">Your Result</h2>
                </div>
                
                <div className="text-center mb-4">
                  <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold text-lg mb-3">
                    {result.title}
                  </div>
                  <p className="text-gray-700 text-base md:text-lg max-w-md mx-auto">
                    {result.description}
                  </p>
                </div>

                {/* Score Breakdown */}
                {scoreMap && Object.keys(scoreMap).length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-center">
                      <FiBarChart2 className="w-5 h-5 mr-2" />
                      Score Breakdown
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                      {Object.entries(scoreMap).map(([key, score]) => (
                        <div key={key} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                          <span className="text-sm font-medium text-gray-600 capitalize">
                            {key.replace(/_/g, ' ')}
                          </span>
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                style={{ 
                                  width: `${Math.min((score / Math.max(...Object.values(scoreMap))) * 100, 100)}%` 
                                }}
                              />
                            </div>
                            <span className="text-sm font-bold text-blue-600 w-8 text-right">
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

            {/* Achievement Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 rounded-full px-6 py-3 mb-8">
              <FiAward className="w-5 h-5 text-amber-600 mr-2" />
              <span className="text-amber-800 font-semibold">
                {result ? `Result: ${result.title}` : 'Survey Completed Successfully!'}
              </span>
            </div>

            {/* Countdown Section */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <FiClock className="w-5 h-5 md:w-6 md:h-6 text-purple-600 mr-2" />
                <span className="text-base md:text-lg font-medium text-gray-700">
                  Redirecting in <span className="text-xl md:text-2xl font-bold text-purple-600">{countdown}</span> seconds
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 md:h-3 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Redirect Button */}
            <button
              onClick={handleRedirectNow}
              className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FiGift className="mr-2 w-5 h-5" />
              Explore More Surveys
              <FiArrowRight className="ml-2 w-5 h-5" />
            </button>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-16 h-16 md:w-20 md:h-20 bg-purple-200 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 md:w-16 md:h-16 bg-pink-200 rounded-full opacity-20 blur-xl"></div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ThankYouPage