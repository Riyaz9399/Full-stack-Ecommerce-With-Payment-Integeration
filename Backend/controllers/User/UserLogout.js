export const  userLogout  = async (req,res)=>{
    try{
       res.clearCookie("token")
       res.json({
        message:"Logout successfully",
        success:true,
        error:false,
        data:[]
       })
    }catch(err){
        console.log(err);
    }
}