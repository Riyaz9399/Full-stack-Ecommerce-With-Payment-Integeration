import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import AdminProductEdit from "./AdminProductEdit";
import { displayINRCurrency } from "../helpers/DisplayCurrecy";

const AdminProductCart = ({ data,fetchdata }) => {
  const [editproduct, Seteditproduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded ">
    <div className="w-40">
      <div className="w-32 h-32 flex justify-center items-center">
      <img
        src={data.ProductImage?.[0]} // Ensure ProductImage is an array and has at least one item
        alt={data.ProductName}
        width={120}
        height={120}
        className="object-fill h-full mx-auto"
      />
      </div>
    
      <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>

      <div>
        <p className="font-semibold">
          {
            displayINRCurrency(data.sellingPrice)
          }
        </p>
      <div className="w-fit ml-auto p-2 bg-green-400 hover:bg-green-600 rounded-full hover:text-white " onClick={()=>Seteditproduct(true)}>
        <FaEdit />
      </div>
      </div>
      
    </div>
      {
        editproduct && (
            <AdminProductEdit Productdata={data} fetchdata={fetchdata} onClose={()=>Seteditproduct(false)}/>
        )
      }
      
    </div>
  );
};

export default AdminProductCart;
