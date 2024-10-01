import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct.js";
import { SummaryApi } from "../common/index.js";
import AdminProductCart from "../components/AdminProductCart.js";
const Allproducts = () => {
  const [openUplaodProduct, setopenUplaodProduct] = useState(false);
  const [allProduct, setallProduct] = useState([]);

  const fetchAllproduct = async () => {
    try {
      const response = await fetch(SummaryApi.getProduct.url);
      const dataResponse = await response.json();
      console.log(dataResponse);
      setallProduct(dataResponse?.data || []); // Ensure it's an array
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchAllproduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center ">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          onClick={() => setopenUplaodProduct(true)}
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-1 px-3 rounded-full transition"
        >
          Upload Product
        </button>
      </div>
      {/* All product */}
      <div className="flex items-center gap-5 py-4  object-y-scroll flex-wrap overflow-y-auto max-h-[600px]">
        
      {
          allProduct.map((product, index) =>{
            return (
              <AdminProductCart fetchdata={fetchAllproduct} data={product} key={index+"Allproduct"}/>
             
            )
          })
      }
      </div>
      

      {/* Upload product component  */}
      {openUplaodProduct && (
        <UploadProduct onClose={() => setopenUplaodProduct(false)}  fetchdDate={fetchAllproduct}/>
      )}
    </div>
  );
};

export default Allproducts;
