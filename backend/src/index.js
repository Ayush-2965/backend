import connectDB from "./db/index.js"
import dotenv from "dotenv"
import { app } from "./app.js"
const PORT=process.env.PORT || 8000

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{

    app.on("error",(err)=>{
        console.log("App unable to listen to the PORT",err);
        throw err
    })
    app.listen(PORT,()=>{
        console.log(`Server listens to ... ${PORT}`);
        
    })
})
.catch((err)=>{
    console.log("MongoDB connection Failed !!!!!");
    
})





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