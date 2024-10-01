import { ProductModel } from "../../models/Product.model.js";
import {uploadProductPermission} from "../../helper/permisson.js"
import userModel from "../../models/user.model.js"

export const Updateproduct = async(req,res)=>{
   try{
    
    const sessionUserId = req.user;
        const user = await userModel.findById(req.user);
        // console.log("User id",user);
        // console.log("Session id",sessionUserId);
        if (!sessionUserId) {
            return res.status(401).json({
                message: "Unauthorized",
                error:true
            });
        }
        const hasPermission = await uploadProductPermission(user);
        if(!hasPermission){
            return res.status(400).json({
                message:"Access Denied"
            }) 
        }

    const {_id,...restBody} = req.body

    const updateProduct = await ProductModel.findByIdAndUpdate(_id,restBody)
   

    return res.status(200).json({
        message:"The product is Successfully Edited",
        data:updateProduct,
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