import mongoose from 'mongoose';

const subtodoSchema=new mongoose.Schema({})

export const subTodo=mongoose.model("SubTodo",subtodoSchema)