import userModel from "../../models/user.model.js"
import bcrypt from "bcryptjs"

export const  userSignUpController = async (req,res)=>{
    try{
      const {email,password,name} = req.body
      const user = await userModel.findOne({email});

      if(user) return res.status(401).json({message:"This email is alreay exists please try with another email ",success:false});

      if(!email) return res.status(401).json({ message:"Provide an Email ",success:false ,})
      if(!password) return res.status(401).json({message:"Provide a Password ", success:false})
      if(!name)  return res.status(401).json({message:"Provide your username ", success:false})
      
        // password hassing 
        const salt = await bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password,salt )
        
        if(!hashPassword) return res.status(500).json({message:"Something went wrong with your password please try again ",success:false});

        const payload={
            ...req.body,
            role:"GENERAL",
            password:hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await  userData.save()

       return res.status(200).json({
            message:"SignUp successfully",
            data:saveUser,
            success:true
        })
        
    }catch(error){
        console.log(error);
    }
}