import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SummaryApi } from "./common";
import { useEffect ,useState} from "react";
import { Context } from "./context";
import { useDispatch } from "react-redux";
import { SetUserdetails } from "./store/UserSlice";


function App() {
  const dispatch = useDispatch();
  const [cartproductCount,setCartProductCount] = useState(0);
  

  const fetchUserDetails = async () => {
    const dataResponce = await fetch(SummaryApi.Current_User.url, {
      method: SummaryApi.Current_User.method,
      credentials: "include",
    });
    const dataApi = await dataResponce.json();

    if(dataApi.success){
     dispatch(SetUserdetails(dataApi.data))
    }
    console.log("data-user", dataApi);
  };

 const fetchUserAddtoCart = async ()=>{
  const dataResponce = await fetch(SummaryApi.countAddtoCartProduct.url, {
    method: SummaryApi.countAddtoCartProduct.method,
    credentials: "include",
  });
  const dataApi = await dataResponce.json();
  setCartProductCount(dataApi?.data?.count);
  console.log("Count of Cart Items", dataApi);
 }

  useEffect(() => {
    // userdetils
    fetchUserDetails();
    // User Cart product
    fetchUserAddtoCart();

  }, []);

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails, // user login 
        cartproductCount,  // Current user Cart Items Count
        fetchUserAddtoCart
      }}>
        <ToastContainer position="top-center"/>
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-20">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
