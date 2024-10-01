import { ProductModel } from "../../models/Product.model.js"


export const getProductController = async(req,res)=>{
    try{
      const dataAllproduct = await ProductModel.find().sort({createdAt:-1});
      return res.status(200).json({
        message:"all the product is display",
        error:false,
        success:true,
        data:dataAllproduct
      })
    }catch(error){
        return res.status(400).json({
            message:error.message || error,
            error :true,
            success:false
        })
    }
}

