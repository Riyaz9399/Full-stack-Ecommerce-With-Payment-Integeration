import { CartModel } from "../../models/Cart.model.js";


export const UpdateAddtoCartProduct = async(req,res)=>{
    try{
        const currentUser = req.user 
        const addtoCartProductId = req.body?._id;
        const qty = req.body.quantity

        const updateAddtoCartProduct = await CartModel.updateOne(
            { _id: addtoCartProductId },
            {...(qty && {quantity : qty})}
        )

        return res.json({
            message:"Product Updated ",
            success:true,
            error:false
        })
    }catch(error){
        return res.json({
            message:error?.message || error,
            success:false,
            error:true
        })
    }
}