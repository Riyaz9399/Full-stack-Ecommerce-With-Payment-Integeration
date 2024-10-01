import userModel from "../../models/user.model.js"

export const updateUser = async(req,res)=>{
    try{
        const sessionUser = req.userId;
        const {userId , name,email,role} = req.body;
        const payload = {
            ...(email && {email:email}),
            ...(name && {name:name}),
            ...(role && {role:role}),
        }

        const user = await userModel.findById(sessionUser);

        console.log("User Role",user,role);


        const updateUser = await userModel.findByIdAndUpdate(userId,payload);

        res.json({
            message:"User Updated",
            success:true,
            error:false
        })

    }catch(err){
        console.log(err);
    }
}