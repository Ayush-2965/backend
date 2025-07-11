import connectDB from "./db/index.js"
import dotenv from "dotenv"

dotenv.config({
    path:'./env'
})

connectDB()






//using IIFE

// import mongoose from "mongoose"
// import {DB_NAME} from "./constants"
// import express from "express"
// const app=express()
// ;(async ()=>{

//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",(err)=>{
//             console.log("app not able to listen");
//             throw err
            
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log("app listens to",`${process.env.PORT}`);
            
//         })
//     } catch (error) {
//         console.error("Error",error);
//         throw error;
        
//     }
// })()