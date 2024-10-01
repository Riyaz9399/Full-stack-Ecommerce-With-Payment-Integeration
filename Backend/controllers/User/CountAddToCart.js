import { CartModel } from "../../models/Cart.model.js";


export const countCartproduct = async(req,res)=>{
    try{
        const userid = req?.user;
        const countItems = await CartModel.countDocuments({
            userId:userid
        })

        return res.status(200).json({
            data:{
                count:countItems
            },
            message:"OK",
            success:true,
            error:false
        })

    }catch(error){
        return res.status(404).json({
            message: "The data is not Found in Cart",
            error:true,
            success: false
        })
    }
}