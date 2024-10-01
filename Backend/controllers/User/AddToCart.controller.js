import { CartModel } from "../../models/Cart.model.js";

export const addToCart = async(req,res)=>{
  try{
    const {productId} = req?.body;
    console.log(productId);
    const currentuser = req.user;
    console.log(currentuser);

    const isproductAvailable = await CartModel.findOne({
        productId: productId,
      });
    if(isproductAvailable) {
        return res.status(401).json({
            message:"This Product is Already Exists in Cart Section",
            error:true,
            success:false
        })

    } 
    const payload={
        productId :productId,
        quantity:1,
        userId:currentuser,
    }

    const newAddToCart = new CartModel(payload);
    const savedCart = await newAddToCart.save();

    return res.status(200).json({
      message: "The product has been added to the Cart",
      error: false,
      success: true,
      data: savedCart
    });

  }catch(error){
    return res.status(404).json({
        message: "The product is not added in cart",
        error:true,
        success: false
    })
  }
}