import mongoose from 'mongoose'

const cartSchema=new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    totalProduct:{
        type:Number,
        default:0
    },
    totalprice:{
        type:Number,
        default:0
    }
},{timestamp:true});

export const  Cart=mongoose.model("Cart",userSchema)