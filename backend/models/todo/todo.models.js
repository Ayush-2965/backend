import mongoose from 'mongoose';

const todoSchema=new mongoose.Schema({
    
}) 

export const todo=mongoose.model("Todo",todoSchema)
