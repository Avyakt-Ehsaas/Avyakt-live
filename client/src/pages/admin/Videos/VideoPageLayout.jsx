import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiMoreVertical, 
  FiEdit2, 
  FiTrash2, 
  FiEye,
  FiVideo,
  FiCalendar,
  FiUser,
  FiTag,
  FiPlay,
  FiPause,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiTrendingUp,
  FiClock
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import API from '../../../utils/api';
import { Link } from 'react-router-dom';

const VideoPageLayout = () => {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    category: ''
  });
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    description: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [categoryFormErrors, setCategoryFormErrors] = useState({});

  useEffect(() => {
    fetchCategories();
    fetchVideos();
  }, []);

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const response = await API.get('/categories/active');
      const activeCategories = response.data.categories || [];
      // Add "All Categories" option at the beginning
      setCategories([
        { _id: 'all', name: 'All Categories', color: 'bg-gray-500' },
        ...activeCategories.map((cat, index) => ({
          ...cat,
          color: getCategoryColor(index)
        }))
      ]);
    } catch (error) {
      toast.error('Failed to fetch categories');
      console.error('Fetch categories error:', error);
      // Fallback to default categories if API fails
      setCategories([
        { _id: 'all', name: 'All Categories', color: 'bg-gray-500' }
      ]);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const getCategoryColor = (index) => {
    const colors = [
      'bg-blue-500', 'bg-red-500', 'bg-purple-500', 'bg-yellow-500',
      'bg-green-500', 'bg-indigo-500', 'bg-teal-500', 'bg-pink-500',
      'bg-orange-500', 'bg-cyan-500'
    ];
    return colors[index % colors.length];
  };

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await API.get('/media/all');
      setVideos(response.data.media || []);
    } catch (error) {
      toast.error('Failed to fetch videos');
      console.error('Fetch videos error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideosByCategory = async (category) => {
    try {
      setLoading(true);
      const response = await API.get(`/media/category/${category}`);
      setVideos(response.data.media || []);
    } catch (error) {
      toast.error('Failed to fetch videos');
      console.error('Fetch videos error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      fetchVideos();
    } else {
      fetchVideosByCategory(category);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.youtubeUrl.trim()) errors.youtubeUrl = 'YouTube URL is required';
    if (!formData.category) errors.category = 'Category is required';
    
    // Basic YouTube URL validation
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    if (formData.youtubeUrl && !youtubeRegex.test(formData.youtubeUrl)) {
      errors.youtubeUrl = 'Invalid YouTube URL';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const payload = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim()
      };

      if (editingVideo) {
        await API.put(`/media/${editingVideo._id}`, payload);
        toast.success('Video updated successfully');
      } else {
        await API.post('/media/create', payload);
        toast.success('Video created successfully');
      }

      setShowCreateModal(false);
      setEditingVideo(null);
      setFormData({ title: '', description: '', youtubeUrl: '', category: 'anxiety' });
      setFormErrors({});
      fetchVideos();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save video');
      console.error('Save video error:', error);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description || '',
      youtubeUrl: video.youtubeUrl,
      category: video.category
    });
    setShowCreateModal(true);
    setFormErrors({});
  };

  const handleDelete = async (videoId) => {
    if (!confirm('Are you sure you want to deactivate this video?')) return;

    try {
      await API.delete(`/media/${videoId}/deactivate`);
      toast.success('Video deactivated successfully');
      fetchVideos();
    } catch (error) {
      toast.error('Failed to deactivate video');
      console.error('Delete video error:', error);
    }
  };

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (video.description && video.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || video.category?._id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryLabel = (categoryId) => {
    const cat = categories.find(c => c._id === categoryId);
    return cat ? cat.name : 'Unknown';
  };

  const validateCategoryForm = () => {
    const errors = {};
    if (!categoryFormData.name.trim()) errors.name = 'Category name is required';
    
    setCategoryFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    
    if (!validateCategoryForm()) return;

    try {
      const payload = {
        name: categoryFormData.name.trim(),
        description: categoryFormData.description.trim()
      };

      await API.post('/categories/create', payload);
      toast.success('Category created successfully');
      
      setShowCategoryModal(false);
      setCategoryFormData({ name: '', description: '' });
      setCategoryFormErrors({});
      fetchCategories(); // Refresh categories
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create category');
      console.error('Create category error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                <FiVideo className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Meditation Videos</h1>
                <p className="text-sm text-gray-600">Manage your meditation video library</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCategoryFormData({ name: '', description: '' });
                  setCategoryFormErrors({});
                  setShowCategoryModal(true);
                }}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
              >
                <FiTag className="w-5 h-5" />
                <span>Add Category</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setEditingVideo(null);
                  setFormData({ title: '', description: '', youtubeUrl: '', category: 'anxiety' });
                  setFormErrors({});
                  setShowCreateModal(true);
                }}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
              >
                <FiPlus className="w-5 h-5" />
                <span>Add Video</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Videos</p>
                <p className="text-2xl font-bold text-gray-900">{videos.length}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <FiVideo className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length - 1}</p>
              </div>
              <div className="p-3 bg-teal-100 rounded-xl">
                <FiTag className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{videos.filter(v => v.isActive).length}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <FiCheck className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Recently Added</p>
                <p className="text-2xl font-bold text-gray-900">
                  {videos.filter(v => {
                    const createdAt = new Date(v.createdAt);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return createdAt > weekAgo;
                  }).length}
                </p>
              </div>
              <div className="p-3 bg-lime-100 rounded-xl">
                <FiTrendingUp className="w-6 h-6 text-lime-600" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="px-6 pb-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div> */}
          
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <motion.button
                key={category._id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryChange(category._id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedCategory === category._id
                    ? `${category.color} text-white shadow-lg`
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

       
      {/* Videos Grid */}
      <div className="px-6 pb-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <FiVideo className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first meditation video'}
            </p>
            {!searchTerm && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Add Your First Video
              </motion.button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, index) => (
              <Link to={`/meditation-video/play/${video._id}`}>
              <motion.div
                key={video._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="p-3 bg-white/90 rounded-full opacity-0 hover:opacity-100 transition-all duration-300">
                      <FiPlay className="w-6 h-6 text-gray-900" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                      video.category?.color || 'bg-gray-500'
                    }`}>
                      {video.category?.name || getCategoryLabel(video.category)}
                    </span>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                  {video.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <FiCalendar className="w-3 h-3" />
                      <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      video.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {video.isActive ? 'Active' : 'Inactive'}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center space-x-1"
                    >
                      <FiEye className="w-4 h-4" />
                      <span>View</span>
                    </a>
                    
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(video)}
                        className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(video._id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
                
              </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingVideo ? 'Edit Video' : 'Add New Video'}
                </h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      formErrors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter video title"
                  />
                  {formErrors.title && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                  )}

                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    rows={3}
                    placeholder="Enter video description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    YouTube URL *
                  </label>
                  <input
                    type="url"
                    value={formData.youtubeUrl}
                    onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      formErrors.youtubeUrl ? 'border-red-500' : 'border-gray-300'
                    } focus:border-emerald-500`}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                  {formErrors.youtubeUrl && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.youtubeUrl}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      formErrors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories.filter(c => c._id !== 'all').map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.category && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    {editingVideo ? 'Update Video' : 'Add Video'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Modal */}
      <AnimatePresence>
        {showCategoryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCategoryModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Add New Category</h2>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCategorySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={categoryFormData.name}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      categoryFormErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter category name"
                  />
                  {categoryFormErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{categoryFormErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={categoryFormData.description}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    rows={3}
                    placeholder="Enter category description"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Add Category
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default VideoPageLayout;