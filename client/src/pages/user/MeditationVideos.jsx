import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiPlay, FiMusic, FiHeadphones, FiClock, FiTrendingUp, FiMoreHorizontal, FiSearch, FiGrid, FiList } from 'react-icons/fi'
import UserSidebar from '../../components/layout/UserSidebar'
import API from '../../utils/api'

const MeditationVideos = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [isCategoryLoading, setIsCategoryLoading] = useState(false)
  const [categoryError, setCategoryError] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [medias, setMedias] = useState([])
  const [isMediaLoading, setIsMediaLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  const fetchVideoCategories = async () => {
    try {
      setIsCategoryLoading(true)
      const response = await API.get("/categories/all")
      setCategories(response.data.categories || [])
    } catch (error) {
      setCategoryError(true)
      console.error('Failed to fetch categories:', error)
    } finally {
      setIsCategoryLoading(false)
    }
  }

  const fetchMediasByCategory = async (categoryId) => {
    try {
      setIsMediaLoading(true)
      if (categoryId === 'all') {
        const response = await API.get("/media/all")
        setMedias(response.data.media || [])
      } else {
        const response = await API.get(`/media/category/${categoryId}`)
        setMedias(response.data.media || [])
      }
    } catch (error) {
      console.error('Failed to fetch medias:', error)
    } finally {
      setIsMediaLoading(false)
    }
  }

  useEffect(() => {
    fetchVideoCategories()
  }, [])

  useEffect(() => {
    fetchMediasByCategory(selectedCategory)
  }, [selectedCategory])

  const visibleCategories = showAllCategories 
    ? categories 
    : categories.slice(0, 6) // Show max 6 categories + "More" button

  const filteredMedias = medias.filter(media => 
    media.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    media.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <motion.div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 text-gray-800 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-white to-pink-100/30" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-200/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-200/20 rounded-full filter blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="relative z-10">
        <UserSidebar />
        
        {/* Main Content */}
        <div className="p-8">
          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Meditation & Music
            </h1>
            <p className="text-gray-600 text-lg">Find your inner peace with our curated collection</p>
          </motion.div>

          {/* Search and Controls */}
          <motion.div 
            className="flex flex-col md:flex-row gap-4 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search meditations, music, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-md border border-purple-200/50 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white/90 transition-all shadow-sm"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-white/80 backdrop-blur-md border border-purple-200/50 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-purple-500 text-white shadow-md' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-purple-500 text-white shadow-md' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Categories Section */}
          <motion.div 
            className="mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Categories</h2>
            
            {isCategoryLoading ? (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="min-w-[120px] h-12 bg-white/60 rounded-full animate-pulse border border-purple-100" />
                ))}
              </div>
            ) : categoryError ? (
              <div className="text-red-500 bg-red-50 border border-red-200 rounded-xl p-4">Failed to load categories</div>
            ) : (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {/* All Categories Button */}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all transform hover:scale-105 shadow-sm ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg border border-purple-400'
                      : 'bg-white/80 text-gray-700 hover:bg-white hover:border-purple-200 border border-purple-100'
                  }`}
                >
                  All
                </button>

                {/* Category Buttons */}
                {visibleCategories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setSelectedCategory(category._id)}
                    className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all transform hover:scale-105 shadow-sm ${
                      selectedCategory === category._id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg border border-purple-400'
                        : 'bg-white/80 text-gray-700 hover:bg-white hover:border-purple-200 border border-purple-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}

                {/* More Categories Button */}
                {categories.length > 6 && (
                  <button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all transform hover:scale-105 shadow-sm ${
                      showAllCategories
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg border border-purple-400'
                        : 'bg-white/80 text-gray-700 hover:bg-white hover:border-purple-200 border border-purple-100'
                    }`}
                  >
                    {showAllCategories ? 'Less' : 'More'}
                  </button>
                )}
              </div>
            )}
          </motion.div>

          {/* Media Grid/List */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {isMediaLoading ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                : "space-y-4"
              }>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white/80 backdrop-blur-md rounded-xl p-4 animate-pulse border border-purple-100 shadow-sm">
                    <div className="h-32 bg-purple-100 rounded-lg mb-4" />
                    <div className="h-4 bg-purple-100 rounded mb-2" />
                    <div className="h-3 bg-purple-100 rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : filteredMedias.length === 0 ? (
              <div className="text-center py-12 bg-white/60 backdrop-blur-md rounded-2xl border border-purple-100">
                <FiHeadphones className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No meditations found</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedCategory}-${viewMode}`}
                  className={viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                    : "space-y-4"
                  }
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredMedias.map((media, index) => (
                    <motion.div
                      key={media._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => navigate(`/meditation-video/play/${media._id}`)}
                      className={`group cursor-pointer bg-white/80 backdrop-blur-md rounded-xl overflow-hidden hover:bg-white/90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-purple-100 ${
                        viewMode === 'list' ? 'flex gap-4 p-4' : 'p-4'
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className={`relative ${
                        viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'h-32 mb-4'
                      }`}>
                        <img
                          src={media.thumbnail || '/placeholder-music.jpg'}
                          alt={media.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-purple-600/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <FiPlay className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 mb-1 truncate">
                          {media.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {media.description}
                        </p>
                        <div className="flex items-center gap-4 text-gray-500 text-xs">                          <span className="flex items-center gap-1">
                            <FiMusic className="w-3 h-3" />
                            {media.category?.name || 'Meditation'}
                          </span>
                        </div>
                      </div>

                      {/* More Options */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle more options
                        }}
                        className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                      >
                        <FiMoreHorizontal className="w-4 h-4 text-gray-500" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </motion.div>
  )
}

export default MeditationVideos