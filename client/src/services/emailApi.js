import axios from "axios";
import API from "../utils/api";

export const sendCsvEmails = async(FormData) => {
    return API.post("/email/send-csv",
        FormData,{
            headers :
            {
                 "Content-Type": "multipart/form-data",
            }
        }
    )
}