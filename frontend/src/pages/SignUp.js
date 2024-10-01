import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../helpers/imageToBase64";
import { SummaryApi } from "../common/index.js";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmpassword, setShowconfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    ProfileImage: "",
  });

  const navigate = useNavigate();

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

  const handleUploadPic  = async (e)=>{
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file)
    setData((preve) =>{
      return {
        ...preve,
        ProfileImage :imagePic
      }
    })
    console.log("file",imagePic);
  }

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if(data.password === data.confirmPassword){
      const dataResponse = await fetch(SummaryApi.signUp
        .url,{method : SummaryApi.signUp.method,
          headers:{
            "content-type": "application/json"
          },
          body: JSON.stringify(data)
        })
        
  
        const dataApi = await dataResponse.json();
        if(dataApi.success){
          toast.success(dataApi.message);
          navigate("/login");
        }
        if(!dataApi.success){
          toast.error(dataApi.message);
        }

        console.log("data",dataApi);
    }else{
      console.log("Please confirm password ");
    }
     
  };

  

  return (
    <section id="login" className="mt-10">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 py-4 w-full max-w-md mx-auto item-center rounded-md ">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.ProfileImage || loginIcons} alt="login_icon" className="object-contain" />
            </div>
           <form>
           <label>
           <div className="text-xs p-1 text-center bg-opacity-80 bg-slate-200 text-red-500 w-full absolute top-10 right-0 rounded-md cursor-pointer">
              Upload photo
            </div>
            <input type="file" className="hidden" onChange={handleUploadPic}/>
           </label>
           </form>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handlerSubmit}>
            <div className="pt-6 ">
              <label>Name</label>
              <div className="bg-slate-100 rounded-xl">
                <input
                  type="text"
                  value={data.name}
                  name="name"
                  onChange={onChangeHandler}
                  required
                  placeholder="Enter Your email"
                  className="w-full h-full shadow-md p-2  rounded-xl outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label>Email</label>
              <div className="bg-slate-100 rounded-xl">
                <input
                  tyepe="email"
                  value={data.email}
                  onChange={onChangeHandler}
                  name="email"
                  required
                  placeholder="Enter Your email"
                  className="w-full h-full shadow-md p-2  rounded-xl outline-none bg-transparent"
                />
              </div>
            </div>
            {/* For password  */}
            <div>
              <label>Password:</label>
              <div className="bg-slate-100  rounded-xl relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  onChange={onChangeHandler}
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
            </div>

            {/* for Confirm Password */}
            <div>
              <label>Confirm Password:</label>
              <div className="bg-slate-100  rounded-xl relative">
                <input
                  type={showconfirmpassword ? "text" : "password"}
                  value={data.confirmPassword}
                  onChange={onChangeHandler}
                  name="confirmPassword"
                  required
                  placeholder="Enter Your password"
                  className="w-full h-full shadow-md p-2 outline-none rounded-xl  bg-transparent "
                />
                <div>
                  <span
                    className="absolute top-3 right-2 text-md cursor-pointer"
                    onClick={() => setShowconfirmPassword((preve) => !preve)}
                  >
                    {showconfirmpassword ? <FaEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
              </div>
            </div>
            <button type="submit"  className="bg-red-600 text-white w-full max-w-[150px] h-full rounded-full p-2  hover:scale-110 transition-all mx-auto block mt-4">
              SignUp
            </button>
          </form>
          <p className="my-2 text-center">
            IF you Have account ?
            <Link
              to={"/login"}
              className="hover:text-red-700 hover:underline"
              
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
