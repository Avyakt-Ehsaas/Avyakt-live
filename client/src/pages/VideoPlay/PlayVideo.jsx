import React from 'react'
import { useEffect , useState} from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import API from '../../utils/api';
import bg1 from "../../assets/bg1.webp";
import bg2 from "../../assets/bg2.webp";
import bg3 from "../../assets/bg3.webp";
import bg4 from "../../assets/bg4.webp";
import bg5 from "../../assets/bg5.jpg";
import bg6 from "../../assets/bg6.webp";
import bg7 from "../../assets/bg7.webp";
import { useMemo } from 'react';


const PlayVideo = () => {
    const { id } = useParams();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);

    // Array of background images
  const backgroundImages = [bg1, bg2, bg3, bg4, bg5, bg6, bg7];

    // Select random background image on component mount
  const backgroundImage = useMemo(() => {
  const index = Math.floor(Math.random() * backgroundImages.length);
  return backgroundImages[index];
}, []);


    const fetchVideo = async () => {
        try {
            const response = await API.get(`/media/${id}`);
            setVideo(response.data.media);
        } catch (error) {
            toast.error('Failed to load video');
            console.error('Fetch video error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchVideo();
        }
    }, [id]);

    const getEmbedUrl = (youtubeUrl) => {
        const videoId = youtubeUrl?.split('v=')[1]?.split('&')[0] || 
                      youtubeUrl?.split('youtu.be/')[1]?.split('?')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : youtubeUrl;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (!video) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Video Not Found</h2>
                    <p className="text-gray-600">The video you're looking for doesn't exist or has been removed.</p>
                </div>
            </div>
        );
    }

    return (
     <div
         className="min-h-screen flex items-center justify-center p-4 md:bg-transparent"
         style={{
             backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
             backgroundSize: "cover",
             backgroundPosition: "center",
             backgroundRepeat: "no-repeat"
         }}
     >
         {/* Black overlay for mobile only */}
         <div className="absolute inset-0 bg-black/60 md:hidden"></div>
         
         <div className="relative z-10 w-full md:w-[80%] max-w-7xl mx-auto">
             {/* Video Player */}
             <div className="bg-white my-12 md:mx-15 md:m-0 rounded-2xl shadow-2xl overflow-hidden">
                 <div className="relative aspect-video">
                     <iframe
                         src={`${getEmbedUrl(video.youtubeUrl)}?autoplay=1&controls=1&rel=0&showinfo=1&modestbranding=1`}
                         title={video.title}
                         className="w-full h-full"
                         style={{ border: 'none' }}
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                         allowFullScreen
                     />
                 </div>
             </div>
         </div>
     </div>
    );
};

export default PlayVideo;