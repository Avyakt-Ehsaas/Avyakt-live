import Media from "../models/Media.js";
import { extractYouTubeVideoId } from "../util/youtubeVideoExtraction.js"

//admin route 
export const createMedia = async(req,res) => {
    try {
    const { title, description, youtubeUrl, category } = req.body;

    if (!title || !youtubeUrl || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, YouTube URL and category are required"
      });
    }

    const videoId = extractYouTubeVideoId(youtubeUrl);
     if (!videoId) {
      return res.status(400).json({
        success: false,
        message: "Invalid YouTube URL"
      });
    }
    
    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

     const media = await Media.create({
      title,
      description,
      youtubeUrl,
      youtubeVideoId: videoId,
      thumbnail,
      category,
      uploadedBy: req.user._id // from auth middleware
    });

    res.status(201).json({
      success: true,
      message: "Media uploaded successfully",
      media
    });
        } catch (error) {
        res.status(500).send({
            success : false,
            message : "Unable to create media,Internal Server Error"
        })
    }
}

export const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find({
      isActive: true
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: media.length,
      media
    });
  } catch (error) {
    console.error("Get All Media Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const getMediaByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const media = await Media.find({
      category,
      isActive: true
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: media.length,
      media
    });
  } catch (error) {
    console.error("Get Media Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

export const getSingleMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media not found"
      });
    }

    res.status(200).json({
      success: true,
      media
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const deactivateMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media not found"
      });
    }

    media.isActive = false;
    await media.save();

    res.status(200).json({
      success: true,
      message: "Media deactivated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
