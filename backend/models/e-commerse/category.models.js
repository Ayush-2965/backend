import mongoose from 'mongoose'

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },

},{timestamp:true});

export const  Category=mongoose.model("Category",userSchema)