import React, { useContext } from "react";
import { displayINRCurrency } from "../helpers/DisplayCurrecy.js";
import { Link } from "react-router-dom";
import { addToCart } from "../helpers/AddtoCart.js";
import { Context } from "../context/index.js";

const SearchpageProduct = ({ products, heading }) => {
  const loadingList = new Array(12).fill(null);


  const { fetchUserAddtoCart } = useContext(Context);
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id); // Ensure the cart is updated

    fetchUserAddtoCart(); // Update the UI with new cart state
  };

  return (
    <div className="container mx-4 p-2  relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-scroll scrollbar-none transition-all">
        {
          products.length === 0 ? (
            loadingList.map((_, index) => (
              <div key={index} className="w-full min-w-[280px] md:min-w-[340px] max-w-[280px] md:max-w-[340px] h-100 bg-white rounded-sm shadow-md ">
                {/* Skeleton for loading */}
                <div className="bg-slate-200 h-40 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center"></div>
                <div className="py-4 grid w-full gap-2">
                  <div className="font-semibold text-base md:text-lg bg-slate-300 animate-pulse rounded-full h-6 w-full"></div>
                  <div className="capitalize text-slate-500 bg-slate-300 animate-pulse rounded-full h-4 w-full"></div>
                  <div className="flex gap-3">
                    <div className="text-red-600 bg-slate-300 animate-pulse rounded-full h-4 w-full"></div>
                    <div className="text-slate-500 bg-slate-300 animate-pulse rounded-full h-4 w-full"></div>
                  </div>
                  <div className="bg-slate-300 animate-pulse rounded-full h-8 w-full"></div>
                </div>
              </div>
            ))
          ) : (
            products.map((product, index) => (
              <Link to={`/product-Details/${product._id}`} key={index} className="w-full min-w-[280px] md:min-w-[340px] max-w-[280px] md:max-w-[340px] h-100 bg-white rounded-sm shadow-md">
                <div className="bg-slate-200 h-40 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                  <img
                    src={product.ProductImage[0]}
                    className="object-scale-down h-full overflow-hidden mix-blend-multiply hover:scale-110 transition-all"
                    alt={product?.productName || "Product image"} 
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
                  <button
                    className="bg-red-600 mx-2 my-2 px-3 py-1 rounded-full hover:bg-red-700 text-white"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            ))
          )
        }
      </div>
    </div>
  );
};

export default SearchpageProduct;
