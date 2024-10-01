import userModel from "../../models/user.model.js"

export const UserDeatil = async (req,res)=>{
    try{
     console.log("user Id" ,req.user)

     const user = await userModel.findById(req.user);
     console.log(user);
     return res.status(200).json({
            data:user,
            success:true,
            error:false,
            message:"Users details "
     })
    }catch(error){
        return res.status(400).json({
            message:error.message || error,
            error :true,
            success:false
        })
    }
}