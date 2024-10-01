import { ProductModel } from "../../models/Product.model.js"

export const ProductDetails = async(req,res)=>{
    try{

        const {productID} = req.body;
        console.log("Received productID:", productID)

        const product = await ProductModel.findById(productID)

        return res.status(200).json({
            data:product,
            message:"Display product details",
            success:true,
            error:false
        })

    } catch(error){
        return res.status(400).json({
            message:error?.message || error,
            error :true,
            success:false
        })
    }
}