import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiClock, FiX, FiArrowLeft } from 'react-icons/fi';
import Image from "../assets/aboutUs.webp";

const thumbnailQualities = ["maxresdefault.jpg", "hqdefault.jpg", "mqdefault.jpg", "default.jpg"];

const getVideoId = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/);
  return match ? match[1] : null;
};

const VideoCard = ({ video, onSelect }) => {
  const videoId = getVideoId(video.url);
  const [thumbIndex, setThumbIndex] = useState(0);

  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/${thumbnailQualities[thumbIndex]}`
    : Image;

  return (
    <motion.div 
      className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer hover:scale-105"
      onClick={() => onSelect(video)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="relative pb-[56.25%] bg-gray-100">
          <img 
            src={thumbnailUrl} 
            alt={video.title}
            onError={(e) => {
              if (thumbIndex < thumbnailQualities.length - 1) {
                setThumbIndex(thumbIndex + 1);
              } else {
                e.currentTarget.onerror = null;
                e.currentTarget.src = Image;
              }
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
            <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FiPlay className="text-purple-600 text-2xl ml-1" />
            </div>
          </div>
        </div>
        <div className="p-5">
          <h4 className="font-bold text-gray-800 line-clamp-2 text-lg mb-2">{video.title}</h4>
          {video.duration && (
            <div className="flex items-center text-sm text-gray-600">
              <FiClock className="mr-2 text-purple-500" />
              <span>{video.duration}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const VideoPlayer = ({ video, onClose, onBack }) => {
  const videoId = getVideoId(video.url);
  const embedUrl = videoId 
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0`
    : "";

  return (
    <motion.div 
      className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{video.title}</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 hover:bg-white/60 transition-all duration-300 hover:scale-110"
          >
            <FiX className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        {embedUrl ? (
          <div className="aspect-w-16 aspect-h-9 mb-6">
            <iframe
              className="w-full h-96 rounded-xl shadow-lg"
              src={embedUrl}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <img src={Image} alt="Video not available" className="w-full h-96 object-cover rounded-xl mb-6" />
        )}
        <button
          onClick={onBack}
          className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
        >
          <FiArrowLeft className="mr-2 group-hover:translate-x-[-2px] transition-transform duration-300" />
          Back to videos
        </button>
      </div>
    </motion.div>
  );
};

const SavedVideos = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="min-h-screen pt-10 md:pt-20 px-4 sm:px-6 lg:px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="group relative bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 p-8">
            <motion.div 
              className="flex flex-col items-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-xl mb-4">
                <FiPlay className="w-8 h-8" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent text-center">
                Meditation Videos
              </h1>
              <p className="mt-3 text-lg text-gray-600 font-light text-center">
                Find your inner peace with our guided meditation sessions
              </p>
            </motion.div>
            
            {selectedVideo ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <VideoPlayer 
                  video={selectedVideo} 
                  onClose={() => setSelectedVideo(null)}
                  onBack={() => setSelectedVideo(null)}
                />
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
                initial="hidden"
                animate="visible"
              >
                {videos.map((video, index) => (
                  <VideoCard 
                    key={video.id} 
                    video={video} 
                    onSelect={setSelectedVideo} 
                  />
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SavedVideos;
