 import dotenv from 'dotenv'
 import path from 'path';

 const envfile= `.env.${process.env.NODE_ENV|| "development"}`

 dotenv.config({
    path:path.resolve(process.cwd(), envfile)
 })

 export const ENV ={
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || "5000",
    DB_URI: process.env.DB_URI || "",
    DEBUG: process.env.DEBUG === " true"
 }