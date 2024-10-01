import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending"
  },
  razorpay_order_id: {
    type: String,
    required: true // Make this required if you want to ensure it's always provided
  },
  razorpay_payment_id: {
    type: String,
    required: true // Make this required if you want to ensure it's always provided
  },
  razorpay_signature: {
    type: String,
    required: true // Include this field
  }
}, {
  timestamps: true
});

export const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel