import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        
    }
});

export const User=mongoose.model("User",userSchema)

// here as good practice we will use the model name in code in singular form
// in mongodb when this model name will be seen then it will be in lowercase with prural form
// i.e ===> "users"