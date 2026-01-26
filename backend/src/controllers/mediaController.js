import Media from "../models/Media.js";
import Category from "../models/Category.js";
import { extractYouTubeVideoId } from "../util/youtubeVideoExtraction.js";

// =============================
// CREATE MEDIA (ADMIN)
// =============================
export const createMedia = async (req, res) => {
  try {
    const { title, description, youtubeUrl, category } = req.body;

    if (!title || !youtubeUrl || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, YouTube URL and category are required"
      });
    }

    // ✅ Check category exists & active
    const categoryExists = await Category.findOne({
      _id: category,
      isActive: true
    });

    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid or inactive category"
      });
    }

    // ✅ Extract YouTube ID
    const videoId = extractYouTubeVideoId(youtubeUrl);
    if (!videoId) {
      return res.status(400).json({
        success: false,
        message: "Invalid YouTube URL"
      });
    }

    // ✅ Auto thumbnail
    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    const media = await Media.create({
      title,
      description,
      youtubeUrl,
      youtubeVideoId: videoId,
      thumbnail,
      category: categoryExists._id, // ObjectId ref
      uploadedBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Media uploaded successfully",
      media
    });

  } catch (error) {
    console.error("Create Media Error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to create media, Internal Server Error"
    });
  }
};



// =============================
// GET ALL MEDIA
// =============================
export const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find({ isActive: true })
      .populate("category", "name")   // ✅ populate category
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

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



// =============================
// GET MEDIA BY CATEGORY
// =============================
export const getMediaByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params; // 👈 ObjectId

    // validate category
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    const media = await Media.find({
      category: categoryId,
      isActive: true
    })
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: media.length,
      media
    });
  } catch (error) {
    console.error("Get Media By Category Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};



// =============================
// GET SINGLE MEDIA
// =============================
export const getSingleMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id)
      .populate("category", "name")
      .populate("uploadedBy", "name email");

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



// =============================
// DEACTIVATE MEDIA
// =============================
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


export const getSingleMediaByCategory = async(req,res) => {
  try {
    const categoryId = req.params.categoryId;

    const media = await Media.findOne({
      category: categoryId,
      isActive: true
    });
    if(!media){
      res.status(404).json({
        success: false,
        message: "Media not found"
      })
    }
    res.status(200).json({
      success: true,
      media
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error, unable to get survey result"
    })
  }
}