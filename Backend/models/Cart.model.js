import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    ref:"Product"
  },
  quantity: {
    type:Number,
    required: true, 
    min: 1
  },
  userId: {
    type:String,
    required: true
  }
}, {
  timestamps: true
});

export const CartModel = mongoose.model("Cart", CartSchema);
