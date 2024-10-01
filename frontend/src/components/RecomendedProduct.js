import React, { useEffect, useRef, useState } from "react";
import { fetchCategoriesWiseProduct } from "../helpers/fetchCategoriesWiseProduct.js";
import { displayINRCurrency } from "../helpers/DisplayCurrecy.js";
import { FaAngleLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import {Link} from "react-router-dom";
import { addToCart } from "../helpers/AddtoCart.js";

const Recommendedproduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, SetLoading] = useState(false);
  const loadingList = new Array(12).fill(null);
  const scrollElement = useRef();

  useEffect(() => {
    const fetchData = async () => {
      SetLoading(true);
      const categoriesProduct = await fetchCategoriesWiseProduct(category); // Pass category directly
      SetLoading(false);
      console.log("horizontal data", categoriesProduct.data);
      setData(categoriesProduct.data);
    };

    fetchData(); // Call fetchData inside useEffect
  }, [category]); // Add category as dependency

  

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div className=" grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-scroll scrollbar-none transition-all">
       
        {
        
        loading ? (
            loadingList.map((product, index) => {
                return (
                  <div key={index} className="w-full  min-w-[280px] md:min-w-[340px] max-w-[280px] md:max-w-[340px] h-100 bg-white rounded-sm shadow-md ">
                    <div className="bg-slate-200 h-40 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                      
                    </div>
                    <div className="py-4 grid w-full gap-2">
                      <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-2 bg-slate-300 animate-pulse rounded-full">
                        
                      </h2>
                      <p className="capitalize text-slate-500 bg-slate-300 animate-pulse rounded-full"></p>
                      <div className="flex gap-3 w-full">
                        <p className="text-red-600 font-medium bg-slate-300 animate-pulse rounded-full w-full">
                       
                        </p>
                        <p className="text-slate-500 line-through bg-slate-300 animate-pulse rounded-full w-full">
                        
                        </p>
                      </div>
                      <button className="mx-2 my-2 px-3 py-2  text-white bg-slate-300 animate-pulse rounded-full">
                       
                      </button>
                    </div>
                  </div>
                );
              })
        ):(
            data.map((product, index) => {
                return (
                    <Link to={"/product-Details/"+product?._id}
                     key={index} className="w-full  min-w-[280px] md:min-w-[340px] max-w-[280px] md:max-w-[340px] h-100 bg-white rounded-sm shadow-md ">
                    <div className="bg-slate-200 h-40 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                      <img
                        src={product.ProductImage[0]}
                        className="object-scale-down h-full overflow-hidden mix-blend-multiply hover:scale-110 transition-all"
                        alt={product?.productName || "Product image"} // Add meaningful alt text
                      />
                    </div>
                    <div className="py-4 grid gap-2 px-2">
                      <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-2">
                        {product?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">{product.category}</p>
                      <div className="flex gap-3">
                        <p className="text-red-600 font-medium">
                          {displayINRCurrency(product?.sellingPrice)}
                        </p>
                        <p className="text-slate-500 line-through">
                          {displayINRCurrency(product?.price)}
                        </p>
                      </div>
                      <button className="bg-red-600 mx-2 my-2 px-3 py-1 rounded-full hover:bg-red-700 text-white" onClick={(e)=> addToCart(e,product?._id)}>
                        Add to cart
                      </button>
                    </div>
                  </Link>
                );
              })
        )
        }
      </div>
    </div>
  );
};

export default Recommendedproduct;
