import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

//DB is in another continent

const connectDB=async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(connectionInstance);
        
        console.log(`MONGODB connected ....!!! DB HOST: ${(connectionInstance).connection.host}`);
        
    } catch (error) {
        console.error("MongoDB connection ERROR",error);
        process.exit(1)//to read in docs
    }
}

export default connectDB;