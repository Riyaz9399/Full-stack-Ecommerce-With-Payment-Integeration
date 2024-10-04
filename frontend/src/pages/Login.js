import React, { useContext, useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";
import { Context } from "../context/index.js";



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const {fetchUserDetails , fetchUserAddtoCart} = useContext(Context);


  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
    // To check data is comming or not 
    console.log(data);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const dataResponce = await fetch(SummaryApi.login.url,
      {method:SummaryApi.login.method,
        credentials:"include",
        headers:{
          "content-type" :"application/json"
        },body:JSON.stringify(data)
      }, )

      const dataApi =  await dataResponce.json();
      if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/");
        fetchUserDetails();
        fetchUserAddtoCart();
      }else{
        toast.error(dataApi.message);
      }

  };

  return (
    <section id="login" className="mt-20">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 py-4 w-full max-w-md mx-auto item-center rounded-md ">
          <div className="w-20 h-20 mx-auto text-black">
            <img src={loginIcons} alt="login_icon" />
          </div>
          <form onSubmit={handlerSubmit} className="flex flex-col gap-4">
            <div className="grid pt-6">
              <label>Email:</label>
              <div className="bg-slate-100 rounded-xl">
                <input
                  tyepe="email"
                  onChange={onChangeHandler}
                  value={data.email}
                  name="email"
                  required
                  placeholder="Enter Your email"
                  className="w-full h-full shadow-md p-2  rounded-xl outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label>Password:</label>
              <div className="bg-slate-100  rounded-xl relative">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={onChangeHandler}
                  value={data.password}
                  name="password"
                  required
                  placeholder="Enter Your password"
                  className="w-full h-full shadow-md p-2 outline-none rounded-xl  bg-transparent "
                />
                <div>
                  <span
                    className="absolute top-3 right-2 text-md cursor-pointer"
                    onClick={() => setShowPassword((preve) => !preve)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
              </div>
              {/* <Link
                to={"/Forget-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-700 "
              >
                Forget password
              </Link> */}
            </div>

            <button type="submit" className="bg-red-600 text-white w-full max-w-[150px] h-full rounded-full p-2  hover:scale-110 transition-all mx-auto block mt-4">
              Login
            </button>
          </form>
          <p className="my-2 text-center">
            Dont't Have account ? <Link to={"/signup"} className="hover:text-red-700 hover:underline" >Sign up</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
