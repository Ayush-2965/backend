import mongoose from "mongoose";

const orderHistory = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["pending", "accepted", "cancelled"],
    },
  },
  { timestamps: true }
);

const items = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
      required: true,
    },
    orderItems: [items],
    totalPrice: {
      type: Number,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "accepted", "cancelled"], //enumeration for choices .... you can give only these fields which must be of same case so no case issues
      default: "pending",
    },
    success: {
      type: Boolean,
      default: false,
    },
    orderHistory: [orderHistory],
  },
  { timestamp: true }
);

export const Order = mongoose.model("Order", orderSchema);
