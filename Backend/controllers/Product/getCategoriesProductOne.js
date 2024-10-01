import { ProductModel } from "../../models/Product.model.js";

export const getCategoriesWiseproductOne = async (req, res) => {
  try {
    // Fetch distinct categories from the product model
    const productCategory = await ProductModel.distinct("category");

    console.log("Categories", productCategory);

    // Array to store one product from each category
    const productByCatogery = [];

    // Fetch one product for each category
    for (const category of productCategory) {
      const product = await ProductModel.findOne({ category });

      if (product) {
        productByCatogery.push(product);
      }
    }

    // Return the list of products by category
    return res.json({
      data: productByCatogery, // Send the correct array
      message: "Products fetched successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
