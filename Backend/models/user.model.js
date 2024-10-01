import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
    type:String,
    required:true
    },
    ProfileImage :String,
    role:String,
  },
  { 
    timestamps:true
  }
);

 const userModel = mongoose.model("user",UserSchema)

export default userModel