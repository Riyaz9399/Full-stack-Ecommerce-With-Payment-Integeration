import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,  // Add validation if needed
  },
  BrandName: {
    type: String,
    required: true,  // Add validation if needed
  },
  category: {
    type: String,
    required: true,  // Add validation if needed
  },
  ProductImage: [{
    type: String,  // Define as an array of strings (URLs)
  }],
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,  // Convert price to a number if needed
  },
  sellingPrice: {
    type: Number,
    required: true,  // Convert sellingPrice to a number if needed
  },
}, {
  timestamps: true
});

export const ProductModel = mongoose.model("Product", ProductSchema);
