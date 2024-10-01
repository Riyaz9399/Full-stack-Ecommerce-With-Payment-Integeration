import { ProductModel } from "../../models/Product.model.js";


export const getCategerisWiseProduct = async (req,res)=>{
  try{
    const {category} = req?.body ;
    const product = await ProductModel.find({category})

    res.json({
        message :"Products ",
        data:product,
        success:true,
        error:false
    })
  }catch(error){
    return res.status(400).json({
        message:error.message || error,
        error :true,
        success:false
    })
  }
}