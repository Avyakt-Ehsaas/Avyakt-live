import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

let accessToken = null;
let tokenExpiry = null;

export async function getAccessToken() {
  try {
    const now = new Date();

    // Return cached token if still valid
    if (accessToken && tokenExpiry && now < tokenExpiry) {
      return accessToken;
    }

    // Validate env variables
    if (
      !process.env.ZOHO_REFRESH_TOKEN ||
      !process.env.ZOHO_CLIENT_ID ||
      !process.env.ZOHO_CLIENT_SECRET
    ) {
      throw new Error("Zoho OAuth environment variables missing");
    }

    // Request new access token
    const response = await axios.post(
      "https://accounts.zoho.in/oauth/v2/token",
      null,
      {
        params: {
          refresh_token: process.env.ZOHO_REFRESH_TOKEN,
          client_id: process.env.ZOHO_CLIENT_ID,
          client_secret: process.env.ZOHO_CLIENT_SECRET,
          grant_type: "refresh_token",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    accessToken = response.data.access_token;

    // Expiry buffer of 60 seconds
    tokenExpiry = new Date(
      now.getTime() + response.data.expires_in * 1000 - 60_000
    );

    return accessToken;
  } catch (error) {
    console.error(
      "Zoho Access Token Error:",
      error.response?.data || error.message
    );
    throw new Error("Failed to generate Zoho access token");
  }
}

export default getAccessToken;
