import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

//routes
import authRoutes from "./routes/authRoutes.js";

const app = express()

// these are the allowed origins for cors
const allowedOrigins = (process.env.FRONTEND_URL || "")
.split(",")
.map((origin) => origin.trim())
.filter((origin) => origin.length > 0)

const corsOptions = {
    origin : function(origin, callback){
        if(!origin) return callback(null,true)
        if(allowedOrigins.includes(origin)){
            callback(null,true)
        }else{
            callback(new Error('Not Allowed by Cors'))
        }
    },
    credentials : true , // allowed cookies 
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser);

// routes

app.use("/api/auth", authRoutes);




export default app
