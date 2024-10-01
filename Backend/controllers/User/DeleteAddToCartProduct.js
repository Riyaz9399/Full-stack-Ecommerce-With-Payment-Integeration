import { CartModel } from "../../models/Cart.model.js";

export const DeleteAddToCArtProduct = async(req,res)=>{
    try{
        const currentUserId = req.user;
        const addToCartproductID = req.body._id;


        const deleteProduct = await CartModel.deleteOne( { _id: addToCartproductID },)

        return res.status(200).json({
            message:"The Items is deleted from the Cart",
            error:false,
            success:true,
            data:deleteProduct
        })



    }catch(error){
        return res.status(400).json({
            message:error.message || error ||"The Product is not Deleted please try again",
            error:true,
            success:false
        })

    }
}