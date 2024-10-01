import express from "express";
import { userSignUpController } from "../controllers/User/UserSignUp.js"; // Ensure this path is correct
import { userLoginController } from "../controllers/User/UserLogin.js";
import { UserDeatil } from "../controllers/User/UserDetail.js";
import { Auth } from "../middleware/Auth.js";
import { userLogout } from "../controllers/User/UserLogout.js";
import {Allusers} from "../controllers/User/Allusers.js"
import { updateUser } from "../controllers/User/UpdateUser.js";
import { uploadProduct } from "../controllers/Product/uploadProduct.js";
import { getProductController } from "../controllers/Product/getProduct.js";
import { Updateproduct } from "../controllers/Product/UpdateProduct.js";
import { getCategoriesWiseproductOne } from "../controllers/Product/getCategoriesProductOne.js";
import { getCategerisWiseProduct } from "../controllers/Product/getCategoriesWiseproduct.js";
import { ProductDetails } from "../controllers/Product/ProductDetails.js";
import { addToCart } from "../controllers/User/AddToCart.controller.js";
import { countCartproduct } from "../controllers/User/CountAddToCart.js";
import { addToCartView } from "../controllers/User/ViewAddToCart.js";
import { UpdateAddtoCartProduct } from "../controllers/User/UpdateAddtoCart.js";
import { DeleteAddToCArtProduct } from "../controllers/User/DeleteAddToCartProduct.js";
import { searchproduct } from "../controllers/Product/SearchProduct.js";
import { filterproductController } from "../controllers/Product/filterproduct.js";
import { payment, paymentverification } from "../controllers/User/payment.js";
import { getOrders } from "../controllers/Product/Order.controller.js";

const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/login",userLoginController);

router.get("/user-details",Auth,UserDeatil);
router.get("/logout",userLogout);

// admin Panel

router.get("/all-users",Auth,Allusers);
router.post("/update-user",Auth,updateUser);

// Product 
router.post("/upload-Product",Auth,uploadProduct)
router.get("/get-Product",getProductController)
router.post("/edit-product",Auth,Updateproduct)
router.get("/get-categoryProduct",getCategoriesWiseproductOne)
router.post("/categories_product",getCategerisWiseProduct)
router.post("/product-Details",ProductDetails);
router.get("/search",searchproduct)
router.post("/filter-Product",filterproductController)


// Cart section
router.post("/Add-Cart",Auth,addToCart);
router.get("/countAddtoCartProduct",Auth,countCartproduct)
router.get("/CartProduct-View",Auth,addToCartView)
router.post("/update-cart",Auth,UpdateAddtoCartProduct)
router.post("/delete-product",Auth,DeleteAddToCArtProduct);
// for payment 
router.post("/payment",payment);
router.post("/paymentverification",Auth,paymentverification);
// for Order 
router.get("/get-Orders",Auth,getOrders)
export default router;
