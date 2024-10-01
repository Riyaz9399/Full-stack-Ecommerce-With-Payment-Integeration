import { OrderModel } from "../../models/Order.model.js";

export const getOrders = async (req, res) => {
    try {
        const currentUser = req.user; 
        console.log("current user", currentUser);
        
        // Fetch all orders for the current user and populate the products field
        const allOrders = await OrderModel.find({
            userId: currentUser
        }).populate({
            path: 'products.product', // Populate the product field inside products
            model: 'Product'           // Ensure the model is set correctly
        });
        if (allOrders.length === 0) {
          return res.status(404).json({
              message: "No orders found for this user.",
              success: false,
              error: true
          });
      }

        return res.status(200).json({
            data: allOrders,
            success: true,
            error: false
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false 
        });
    }
};
