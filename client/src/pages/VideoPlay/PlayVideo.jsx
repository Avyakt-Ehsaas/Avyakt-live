import React, { useEffect, useState, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../utils/api";

import bg1 from "../../assets/bg1.webp";
import bg2 from "../../assets/bg2.webp";
import bg3 from "../../assets/bg3.webp";
import bg4 from "../../assets/bg4.webp";
import bg5 from "../../assets/bg5.jpg";
import bg6 from "../../assets/bg6.webp";
import bg7 from "../../assets/bg7.webp";

const PlayVideo = () => {
  const { id } = useParams();

  const playerRef = useRef(null);
  const iframeRef = useRef(null);
  const intervalRef = useRef(null);
  const lastAllowedTimeRef = useRef(0);

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const backgroundImages = [bg1, bg2, bg3, bg4, bg5, bg6, bg7];

  const backgroundImage = useMemo(() => {
    return backgroundImages[
      Math.floor(Math.random() * backgroundImages.length)
    ];
  }, []);

  // Fetch media
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await API.get(`/media/${id}`);
        setVideo(res.data.media);
      } catch {
        toast.error("Failed to load audio");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchVideo();
  }, [id]);

  // Load YouTube API
  useEffect(() => {
    if (window.YT) return;
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);
  }, []);

  // Init player
  useEffect(() => {
    if (!video || !window.YT || playerRef.current) return;

    const videoId =
      video.youtubeUrl?.split("v=")[1]?.split("&")[0] ||
      video.youtubeUrl?.split("youtu.be/")[1]?.split("?")[0];

    playerRef.current = new window.YT.Player(iframeRef.current, {
      videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        modestbranding: 1,
        rel: 0
      },
      events: {
        onReady: (e) => {
          setDuration(e.target.getDuration());
        },
        onStateChange: handleStateChange
      }
    });
  }, [video]);

  // Handle play state changes (IMPORTANT)
  const handleStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);

      // Start live tracking
      intervalRef.current = setInterval(() => {
        const time = playerRef.current.getCurrentTime();

        // 🚫 block skipping
        if (time > lastAllowedTimeRef.current + 1.5) {
          playerRef.current.seekTo(lastAllowedTimeRef.current, true);
          return;
        }

        lastAllowedTimeRef.current = time;
        setCurrentTime(time);
      }, 500);
    }

    if (
      event.data === window.YT.PlayerState.PAUSED ||
      event.data === window.YT.PlayerState.ENDED
    ) {
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    }
  };

  // Play / Pause
  const togglePlayPause = () => {
    if (!playerRef.current) return;
    isPlaying
      ? playerRef.current.pauseVideo()
      : playerRef.current.playVideo();
  };

  const progressPercent =
    duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (time) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="h-10 w-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Audio not found
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full max-w-md bg-black/80 backdrop-blur-xl rounded-2xl p-6 text-white">
        {/* Info */}
        <div className="flex gap-4 mb-6">
          <img
            src={video.thumbnail}
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">{video.title}</h2>
            <p className="text-sm text-gray-400">Avyakt-Ehsaas</p>
          </div>
        </div>

        {/* REAL LIVE PROGRESS */}
        <div className="w-full h-1 bg-gray-700 rounded-full mb-2">
          <div
            className="h-full bg-green-500 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-gray-400 mb-6">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex justify-center">
          <button
            onClick={togglePlayPause}
            className="text-5xl transition hover:scale-110"
          >
            {isPlaying ? "⏸" : "▶️"}
          </button>
        </div>

        {/* Hidden iframe */}
        <div className="hidden">
          <div ref={iframeRef}></div>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;