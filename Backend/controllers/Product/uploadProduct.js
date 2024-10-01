import { ProductModel } from "../../models/Product.model.js";
import {uploadProductPermission} from "../../helper/permisson.js"
import userModel from "../../models/user.model.js"

export const uploadProduct = async(req,res)=>{
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
        const uploadProduct = new ProductModel(req.body)

        const saveProduct = await uploadProduct.save()

        return res.status(200).json({
            message:"Product Uplaod SuccessFully ",
            error:false,
            success:true,
            data:saveProduct
        })

    }catch(error){
        console.log(error);
        return res.status(400).json({
            message:error.message || error,
            error :true,
            success:false
        })
    }
}