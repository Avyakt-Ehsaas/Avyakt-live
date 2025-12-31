import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

let accessToken = null; //zoho access token
let tokenExpiry = null;  // expriy of token

async function getAccessToken(){
    const now = new Date(); 

    if(accessToken && tokenExpiry && now < tokenExpiry){
        return accessToken; //still valid
    }

    //request new access token using refresh token 
    const response = await axios.post(
         'https://accounts.zoho.in/oauth/v2/token',
         null,
         {
            params : {
                refresh_token : process.env.ZOHO_REFRESH_TOKEN,
                client_id : process.env.ZOHO_CLIENT_ID,
                client_secret : process.env.ZOHO_CLIENT_SECRET,
                grant_type : "refresh_token"
            }
         }
    );

    accessToken = response.data.access_token;
    tokenExpiry = new Date(now.getTime() + response.data.expires_in * 1000 - 60000);
    return accessToken;
}