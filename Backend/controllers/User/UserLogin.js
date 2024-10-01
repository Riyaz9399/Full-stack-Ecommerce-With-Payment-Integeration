import userModel from "../../models/user.model.js"
import bcrypt from "bcryptjs";
import jsonwebToken from "jsonwebtoken";

export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email)
      return res
        .status(401)
        .json({ message: "Provide an Email ", success: false });
    if (!password)
      return res
        .status(401)
        .json({ message: "Provide a Password ", success: false });
        // console for the testing purpose 
        // console.log("email",email);
        // console.log("password",password);
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "The user is not found in our database",
        success: false,
      });
    }
    
    // console.log("Hashed password:", user.password);
    // console.log("Input password:", password);
    
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid password.",
          success: false,
        });
      }else{
        const tokenData = {
            _id : user._id,
            email:user.email
        }
        const tokenOption = {
          httpOnly :true,
          secure:true
        }
        const token = await jsonwebToken.sign(tokenData,process.env.secreat_key,{expiresIn : 60 * 60 * 8})
          return res.cookie("token",token,tokenOption).json({
            data:token,
            message: "Login successful!",
            success: true,
            error:false
          });
      }
    
  } catch (error) {
    console.log(error);
  }
};
