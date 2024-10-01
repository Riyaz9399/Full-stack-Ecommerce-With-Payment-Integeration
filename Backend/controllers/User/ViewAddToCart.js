import { CartModel } from "../../models/Cart.model.js"
export const addToCartView = async(req,res)=>{
    try{
        const currentUser = req.user; 
        console.log("current user",currentUser)
        const allproduct = await CartModel.find({
            userId:currentUser
        }).populate("productId")

        return res.status(200).json({
            data:allproduct,
            success:true,
            error:false
        })
    }catch(error){
        res.status(400).json({
            message:error.message || error,
            error:true,
            success : false 
        })
    }
}