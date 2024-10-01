import React, { useContext, useEffect, useRef, useState } from "react";
import { fetchCategoriesWiseProduct } from "../helpers/fetchCategoriesWiseProduct.js";
import { displayINRCurrency } from "../helpers/DisplayCurrecy.js";
import { FaAngleLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { addToCart } from "../helpers/AddtoCart.js";
import { Context } from "../context/index.js";

const HorizonalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, SetLoading] = useState(true);
  const loadingList = new Array(12).fill(null);
  const scrollElement = useRef();

  const { fetchUserAddtoCart } = useContext(Context);

  const handleAddtoACart = async (e, id) => {
    await addToCart(e, id); // Ensure the cart is updated

    fetchUserAddtoCart(); // Update the UI with new cart state
  };

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

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden:md-block"
          onClick={scrollRight}
        >
          <FaChevronRight />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden:md-block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>

        {loading
          ? loadingList.map((product, index) => {
              return (
                <div
                  key={index}
                  className="w-full min-w-[280px] md:min-w-[340px] max-w-[280px] md:max-w-[340px] h-44 bg-white p-1 rounded-sm shadow-md flex"
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse "></div>
                  <div className="py-4 grid w-full gap-2">
                    <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-2 p-1 bg-slate-300 animate-pulse rounded-full"></h2>

                    <div className="flex gap-3 w-full">
                      <p className="text-red-600 font-medium bg-slate-300  w-full animate-pulse rounded-full"></p>
                      <p className="text-slate-500 line-through bg-slate-300  w-full animate-pulse rounded-full"></p>
                    </div>
                    <button className=" mx-2 my-2 px-3 py-1 rounded-full text-white bg-slate-300 animate-pulse "></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"/product-Details/" + product?._id}
                  key={index}
                  className="w-full min-w-[280px] md:min-w-[340px] max-w-[280px] md:max-w-[340px] h-44 bg-white rounded-sm shadow-md flex"
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                    <img
                      src={product.ProductImage[0]}
                      className="object-scale-down h-full overflow-hidden mix-blend-multiply hover:scale-110 transition-all"
                      alt={product?.productName || "Product image"} // Add meaningful alt text
                    />
                  </div>
                  <div className="py-4 px-2">
                    <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-2">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product.category}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    <button
                      className="bg-red-600 mx-2 my-2 px-3 py-1 rounded-full hover:bg-red-700 text-white"
                      onClick={(e) => handleAddtoACart(e, product?._id)}
                    >
                      Add to cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default HorizonalCardProduct;
