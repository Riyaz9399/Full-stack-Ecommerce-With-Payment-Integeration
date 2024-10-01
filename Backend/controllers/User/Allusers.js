import userModel from "../../models/user.model.js"
export const Allusers = async(req, res)=>{
        try{
            const allUsers = await userModel.find()
             return res.status(200).json({
                message:"Check the api",
                data :allUsers,
                error:false,
                success:true
             })
        }catch(error){
            console.log(error)
            return res.status(404).json({
                message: "The users not found",
                error:true,
                success: false
            })
        }
}