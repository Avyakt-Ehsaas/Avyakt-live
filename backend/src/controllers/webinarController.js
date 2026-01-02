import axios from "axios";
import { getAccessToken } from "../util/zohoAccessToken.js";

const ZSOID = process.env.ZOHO_ZSOID;
const BASE_URL = `${process.env.ZOHO_WEBINAR_API}/${ZSOID}`;

if (!ZSOID || !process.env.ZOHO_WEBINAR_API) {
  throw new Error("Missing Zoho Webinar environment variables");
}

/**
 * CREATE WEBINAR
 */
export const createWebinar = async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.post(
      `${BASE_URL}/webinar.json`,
      req.body,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          "Content-Type": "application/json;charset=UTF-8"
        }
      }
    );

    return res.status(201).json(response.data);
  } catch (error) {
    console.error(
      "Create Webinar Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      message: "Failed to create webinar",
      error: error.response?.data
    });
  }
};

/**
 * GET ALL WEBINARS
 */
export const getAllWebinars = async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(
      `${BASE_URL}/webinar.json`,
      {
        params: {
          listtype: req.query.listtype || "upcoming",
          index: Number(req.query.index) || 1,
          count: Number(req.query.count) || 10
        },
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          "Content-Type": "application/json;charset=UTF-8"
        }
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Get Webinars Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      message: "Failed to fetch webinars",
      error: error.response?.data
    });
  }
};

/**
 * GET WEBINAR BY ID
 */
export const getWebinarById = async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(
      `${BASE_URL}/webinar/${req.params.id}.json`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          "Content-Type": "application/json;charset=UTF-8"
        }
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Get Webinar By ID Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      message: "Failed to fetch webinar",
      error: error.response?.data
    });
  }
};

/**
 * UPDATE WEBINAR
 */
export const updateWebinar = async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.put(
      `${BASE_URL}/webinar/${req.params.id}.json`,
      req.body,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          "Content-Type": "application/json;charset=UTF-8"
        }
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Update Webinar Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      message: "Failed to update webinar",
      error: error.response?.data
    });
  }
};

/**
 * DELETE WEBINAR
 */
export const deleteWebinarbyId = async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.delete(
      `${BASE_URL}/webinar/${req.params.id}.json`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          "Content-Type": "application/json;charset=UTF-8"
        }
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Delete Webinar Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      message: "Failed to delete webinar",
      error: error.response?.data
    });
  }
};
