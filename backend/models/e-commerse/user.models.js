import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    isAdmin:{
        type:Boolean,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    }

},{timestamp:true});

export const  user=mongoose.model("User",userSchema)

//best practice ===> keep variable name and the model name same 

//  variable name responsible if we want to import the model any where whereas
//  Users ==> i.e model name will be used for reference in other schemas