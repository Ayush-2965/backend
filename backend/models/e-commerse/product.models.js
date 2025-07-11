import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock:{
        type:Number,
        default:0
    },
    productImage:{
        type:[String] //mutliple url
    },
    offer: {
      type: String,
    },
  },
  { timestamp: true }
);

export const Product = mongoose.model("Product", userSchema);
