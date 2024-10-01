import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SummaryApi } from "../common/index.js";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { displayINRCurrency } from "../helpers/DisplayCurrecy.js";
import Recommendedproduct from "../components/RecomendedProduct.js";
import { addToCart } from "../helpers/AddtoCart.js";
import { Context } from "../context/index.js";

export const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    BrandName: "",
    category: "",
    ProductImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [loading, setLoading] = useState(false);
  const ProductImageLoading = new Array(3).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [ZoomImage,setZoomImage] = useState({
    x:0,
    y:0
  })
  const navigate = useNavigate();

   const {fetchUserAddtoCart} = useContext(Context);

  const [OpenImageZoom ,setOpenImageZoom] = useState(false);
 
  // Destructure the id from useParams (no argument needed)
  const { _id } = useParams(); // Must match the name from the route

  const fetchProductDetail = async () => {
    setLoading(true);
    try {
      console.log("Fetching product details for ID:", _id); // Log the product ID

      const response = await fetch(SummaryApi.ProductsDetails.url, {
        method: SummaryApi.ProductsDetails.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          productID: _id, // Send productID in request body
        }),
      });

      const dataResponse = await response.json(); // Await the JSON response
      console.log("Product details fetched:", dataResponse); // Log response

      if (dataResponse?.data) {
        setData(dataResponse?.data); // Set data if response is valid
        setActiveImage(dataResponse?.data.ProductImage[0]);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (_id) {
      fetchProductDetail(); // Fetch product details only if _id exists
    }
  }, [_id]); // Ensure the effect runs when _id changes

  const handleMouseEnterproduct = (imageurl) => {
    setActiveImage(imageurl);
  };

  const handleZoomImage = useCallback((e)=>{
    setOpenImageZoom(true);
    const {left,top,width,height} = e.target.getBoundingClientRect()
    console.log("cordimate",left,top,width,height);
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    
    setZoomImage({x,y})
  },[ZoomImage])

  const handleLeaveOutImage = ()=>{
    setOpenImageZoom(false)
  }

  const handleAddToCart = async(e,id)=>{
   await addToCart(e,id);
   fetchUserAddtoCart()
  }

  const handleByeproduct = async(e,id)=>{
    await addToCart(e,id);
   fetchUserAddtoCart();
   navigate("/cart")
  }


  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Produtimage */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4 ">
          <div className="h-[300px] w-[300px] lg:h-96  bg-slate-200 relative p-2 ">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={(e) => handleZoomImage(e)} onMouseLeave={(e)=>handleLeaveOutImage(e)}
            />
            {/* Product Zoom  */}
            {
              OpenImageZoom && (
                <div className="hidden lg:block absolute -right-[400px]  overflow-hidden top-0 min-w-[400px] min-h-[400px] bg-slate-200 p-1">
               <div className="w-full h-full min-h-[400px] min-w-[400px] mix-blend-multiply scale-125" style={{
                backgroundImage:`url(${activeImage})`,
                backgroundRepeat:'no-repeat',
                  backgroundPosition:`${ZoomImage.x * 100}% ${ZoomImage.y * 100}%`
                 
                 }}>

               </div>
            </div>
              )
            }
            
            
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {ProductImageLoading.map((el,index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse" 
                      key={"Loadingimage"+index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.ProductImage?.map((imageurl, product) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded"
                      key={imageurl}
                    >
                      <img
                        src={imageurl}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterproduct(imageurl)}
                        onClick={() => handleMouseEnterproduct(imageurl)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ProductDetaials */}
        {
          loading ? (
            <div className="flex flex-col gap-1 w-full">
          <p className="bg-red-200 text-slate-600 px-2 rounded-full h-4  w-full" >
            
          </p>
          <h2 className="bg-slate-200 text-2xl lg:text-3xl font-medium px-2 py-2 h-4 animate-pulse w-full">
            
          </h2>
          <p className="capitalize text-slate-400 animate-pulse h-6 w-full"></p>
          <div className="text-slate-200 flex items-center gap-1 bg-slate-200 h-6 animate-pulse w-full">
            
          </div>
          <div className="flex items-center gap-3 text-xl lg:text-2xl font-medium h-6 animate-pulse  w-full">
            <p className="bg-slate-200 text-slate-200"></p>
            <p className="bg-slate-200 text-slate-200 line-through"></p>
          </div>

            <div className=" flex items-center gap-1 my-2">
            <button className="border-2 rounded h-6 px-3 py-1 min-w-[120px] w-full text-slate-600 font-medium hover:bg-slate-200 hover:text-white"></button>
            <button className="border-2 rounded h-6 px-3 py-1 min-w-[120px] w-full text-slate-600 font-medium hover:bg-slate-200 hover:text-white"></button>
            </div>
            <div>
              <p className=" font-medium py-1 h-6 bg-slate-200 animate-pulse w-full "></p>
              <p className=" font-medium py-1 h-6 bg-slate-200 animate-pulse w-full"></p> 
            </div>
        </div>
          ):(
            <div className="flex flex-col gap-1">
          <p className="bg-red-200 text-red-600 px-2 rounded-full w-fit">
            {data?.BrandName}
          </p>
          <h2 className="text-2xl lg:text-3xl font-medium">
            {data?.productName}
          </h2>
          <p className="capitalize text-slate-400">{data?.category}</p>
          <div className="text-red-600 flex items-center gap-1">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
          </div>
          <div className="flex items-center gap-3 text-xl lg:text-2xl font-medium ">
            <p className="text-red-600">{displayINRCurrency(data.sellingPrice)}</p>
            <p className="text-slate-400 line-through">{displayINRCurrency(data.price)}</p>
          </div>

            <div className=" flex items-center gap-1 my-2">
            <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"  onClick={(e) => handleByeproduct(e, data?._id)}>Buy</button>
            <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px]  text-red-600 font-medium hover:bg-red-600 hover:text-white"  onClick={(e) => handleAddToCart(e, data?._id)}>Add to Cart</button>
            </div>
            <div>
              <p className="text-slate-600 font-medium py-1">Description:</p>
              <p className="font-medium py-1">{data.description}</p> 
            </div>
        </div>
          )
        }



      </div>

        {
          data.category && (
            <Recommendedproduct  category={data?.category} heading={"Recommended products"} />
          )
        }


    </div>
  );
};
