import  { ProductModel } from "../../models/Product.model.js"
export const  filterproductController = async(req,res)=>{
    try{
        const categoiesList = req?.body?.category || [];


        const product = await ProductModel.find({
            category :{
                "$in" :categoiesList
            }
        })

        return res.json({
            data:product,
            message:"Product",
            error:false,
            success:true
        })
    }catch(error){
        return res.json({
            message:error.message || error,
            error :true,
            success:false
        })
    }
}