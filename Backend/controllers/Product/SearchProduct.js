import { ProductModel } from "../../models/Product.model.js";

export const searchproduct = async (req, res) => {
  try {
    const query = req.query.q;

    const regex = new RegExp(query,"i");

    const product = await ProductModel.find({
      "$or": [
        {
          productName: regex,
        },
        {
          category: regex,
        },
      ],
    });

    return res.status(200).json({
        message:"Search Product List",
        error:false,
        success:true,
        data:product
    })
  } catch (error) {
    return res.status(404).json({
      message:
        error.message ||
        "Sorry, but The Product which You are Searching is not available.. ",
      error: true,
      success: false,
    });
  }
};
