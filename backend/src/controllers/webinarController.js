import axios from "axios";
import { getAccessToken } from "../util/zohoAccessToken.js";

const ZSOID = process.env.ZOHO_ZSOID;
const BASE_URL = `${process.env.ZOHO_WEBINAR_API}`;

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
 */export const getAllWebinars = async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(
      `${process.env.ZOHO_WEBINAR_API}/webinars`,
      {
        params: {
          listtype: req.query.listtype || "upcoming"
        },
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          Accept: "application/json"
        }
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Zoho Error:", error.response?.data);
    return res.status(500).json({ message: "Zoho fetch failed" });
  }
};


/**
 * GET WEBINAR BY ID
 */
export const getWebinarById = async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(
      `${BASE_URL}/webinar/${req.params.id}`,
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
      `${BASE_URL}/webinar/${req.params.id}`,
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
      `${BASE_URL}/webinar/${req.params.id}`,
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

/**
 * GET ONGOING WEBINARS WITH JOINING LINKS
 */
export const getOngoingWebinars = async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(
      `${BASE_URL}/webinars`,
      {
        params: {
          listtype: "ongoing",
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
      "Get Ongoing Webinars Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      message: "Failed to fetch ongoing webinars",
      error: error.response?.data
    });
  }
};

/**
 * GET WEBINAR ATTENDEES REPORT
 */
export const getWebinarAttendees = async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(
      `${BASE_URL}/webinar/${req.params.id}/attendees`,
      {
        params: {
          index: Number(req.query.index) || 1,
          count: Number(req.query.count) || 100
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
      "Get Webinar Attendees Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      message: "Failed to fetch webinar attendees",
      error: error.response?.data
    });
  }
};

/**
 * REGISTER ATTENDEE FOR WEBINAR
 */
export const registerAttendee = async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.post(
      `${BASE_URL}/webinar/${req.params.id}/register`,
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
      "Register Attendee Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      message: "Failed to register attendee",
      error: error.response?.data
    });
  }
};

/**
 * GET WEBINAR SESSIONS (for recurring webinars)
 */
export const getWebinarSessions = async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(
      `${BASE_URL}/webinar/${req.params.id}/sessions`,
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
      "Get Webinar Sessions Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      message: "Failed to fetch webinar sessions",
      error: error.response?.data
    });
  }
};
