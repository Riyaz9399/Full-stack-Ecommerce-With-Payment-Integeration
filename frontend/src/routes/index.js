import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import Adminpanel from "../pages/Adminpanel";
import SignUp from "../pages/SignUp";
import AllUsers from "../pages/AllUsers";
import Allproducts from "../pages/Allproducts";
import CategoriesProducts from "../pages/CategoriesProducts";
import { ProductDetails } from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Success from "../pages/Success";
import Cancle from "../pages/Cancle";
import Orders from "../pages/Orders";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", // Keep URLs lowercase for consistency
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forget-password", // Keep paths lowercase and consistent
        element: <ForgetPassword />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "product-categories", 
        element: <CategoriesProducts />,
      },{
        path: "product-Details/:_id", 
        element: <ProductDetails />,
      },
      {
        path:"Cart",
        element:<Cart/>
      },{
        path:"search",
        element : <SearchProduct/>
      },{
        path:"order",
        element:<Orders/>
      },{
        path:"success",
        element:<Success/>
      },{
        path:"cancle",
        element:<Cancle/>
      },
      {
        path: "admin-panel", 
        element: <Adminpanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "Product", // Adjust the path to lowercase and keep it consistent
            element: <Allproducts />,
          },
        ],
      },
    ],
  },
]);

export default router;
