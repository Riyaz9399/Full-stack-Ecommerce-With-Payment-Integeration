import React, { useState, useContext, useEffect } from "react";
import Logo from "./Logo";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";
import { SetUserdetails } from "../store/UserSlice.js";
import { ROLE } from "../common/role.js";
import { Context } from "../context/index.js";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setmenuDisplay] = useState(false);
  const location = useLocation();
  const context = useContext(Context);
  const navigate = useNavigate(); 
  const searchInput = useLocation();
  const urlSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = urlSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery);

  // console.log("user Header" , user);
  console.log("user cart item count ", context);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout.url, {
      method: SummaryApi.logout.method,
      credentials: "include",
    });

    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(SetUserdetails(null));
      navigate("/")
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    setmenuDisplay(false); // Close the menu when the route changes
  }, [location]);


  const handleSearchProduct = (e) => {
    const { value } = e.target
    setSearch(value)
    if (value) {
      navigate(`/search?q=${value}`);
    }else{
      navigate("/search")
    }
  };
  
  return (
    <header className="h-20 shadow-sm bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center justify-between ">
        <div className="flex items-center justify-center gap-4">
          <div className="grid text-center">
          <Link to="">
            <Logo w="100px" h="100px"/>
          </Link>
          </div>

          <div className="flex gap-2 ">
          <div>
        <Link to="/">
          <p className="font-mediam  hover:text-red-600" >HOME</p>
          </Link>
        </div>
          <div>
        <Link to="/cart">
          <p className="font-mediam hover:text-red-600" >CART</p>
          </Link>
        </div>
        <div>
        <Link to="/order">
          <p className="font-mediam hover:text-red-600" >ORDERS</p>
          </Link>
        </div>
          </div>
        </div>
        
        {/* for Search */}
        <div className="hidden lg:flex items-center justify-between w-full max-w-sm border rounded-full focus-within:shadow-md">
          <input
            type="text"
            placeholder="Search the product"
            onChange={handleSearchProduct}
            value={search}
            className="w-full outline-none rounded-l-full p-1 px-4"
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center  justify-center rounded-r-full text-white">
            <FaSearch />
          </div>
        </div>

        {/* for user Icons */}

        <div className="flex  flex-row gap-4 ">
          {/* for user icon */}
          <div
            className="relative  flex justify-center"
            onClick={() => setmenuDisplay((prev) => !prev)}
          >
            <div className="cursor-pointer text-5xl">
              {user?.ProfileImage ? (
                <img
                  src={user?.ProfileImage}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <FaUserCircle />
              )}
            </div>
            {menuDisplay && (
              <div className="absolute  bg-white bottom-0 top-11 h-fit p-2 rounded-sm  shadow-lg ">
                <nav>
                  {user?.role == ROLE.ADMIN && (
                    <span>
                      <Link
                        to={"/admin-panel/Product"}
                        className={
                          "whitespace-nowrap hidden md:block hover:bg-slate-200"
                        }
                        onClick={() => setmenuDisplay(false)}
                      >
                        Admin panel
                      </Link>
                    </span>
                  )}
                </nav>
              </div>
            )}
          </div>
          {/* for cart icons */}
          {user?._id && (
            <Link to={"/Cart"} className="cursor-pointer text-3xl relative">
              <span>
                <FaShoppingCart />
              </span>

              <div className="text-white w-5 h-5  bg-red-600  flex items-center justify-center text-sm rounded-full  absolute -top-1 -right-2">
                <p>{context.cartproductCount}</p>
              </div>
            </Link>
          )}

          {/* for button */}
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full bg-red-500 hover:bg-red-600 "
              >
                Logout
              </button>
            ) : (
              <Link to="login">
                <button className="px-3 py-1 rounded-full bg-red-500 hover:bg-red-600 ">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
