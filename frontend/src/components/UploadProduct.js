import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import productCategories from "../helpers/productCategories.js";
import { FaCloudUploadAlt } from "react-icons/fa";
import { uploadImage } from "../helpers/uploadImage.js";
import DisplayImage from "./DisplayImage.js";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SummaryApi } from "../common/index.js";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose ,fetchdDate}) => {
  const [data, setData] = useState({
    productName: "",
    BrandName: "",
    category: "",
    ProductImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [uploadProductImageInput, setUploadProductImageInput] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    setUploadProductImageInput(file.name);

    try {
      const uploadImageCloudinary = await uploadImage(file);
      setData((prev) => ({
        ...prev,
        ProductImage: [...prev.ProductImage, uploadImageCloudinary.url],
      }));
    } catch (error) {
      toast.error("Image upload failed. Please try again.");
      console.error(error);
    }
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.ProductImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      ProductImage: newProductImage,
    }));
  };

  // Upload Product
  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadProduct.url,{
      method : SummaryApi.uploadProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data),
      
    })
    console.log("data",data);

    const responseData = await response.json()

    if(responseData.success){
        toast.success(responseData?.message)
        onClose()
        fetchdDate()
       
    }


    if(responseData.error){
      toast.error(responseData?.message)
    }
  

  };

  return (
    <div className="fixed bg-slate-200 bg-opacity-50 w-full h-full top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit ml-auto text-lg hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <IoClose />
          </div>
        </div>

        <form className="grid p-4 gap-3 overflow-y-scroll h-full pb-20" onSubmit={submitHandler}>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter Product name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="BrandName">Brand Name:</label>
          <input
            type="text"
            id="BrandName"
            placeholder="Enter Brand name"
            name="BrandName"
            value={data.BrandName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="category">Category</label>
          <select
            value={data.category}
            className="p-2 bg-slate-100 border rounded"
            onChange={handleOnChange}
            id="category"
            name="category"
            required
          >
            <option value="">Select Category</option>
            {productCategories.map((el, index) => (
              <option value={el.value} key={el.value + index}>
                {el.label}
              </option>
            ))}
          </select>

          <label htmlFor="ProductImage">Product Image</label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden cursor-pointer"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>

          <div>
            {data.ProductImage.length > 0 ? (
              <div className="flex items-center gap-2">
                {data.ProductImage.map((el, index) => (
                  <div className="relative group" key={index}>
                    <img
                      src={el}
                      alt={el}
                      width={80}
                      height={100}
                      className="bg-slate-100 border p-2 cursor-pointer"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div
                      className="text-white absolute bg-red-500 rounded-full p-2 bottom-0 right-0 cursor-pointer hidden group-hover:block"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <RiDeleteBin6Line />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-600 text-xs">*Please upload product image</p>
            )}
          </div>

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            placeholder="Enter price"
            value={data.price}
            name="price"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="sellingPrice">Selling Price:</label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Enter selling price"
            value={data.sellingPrice}
            name="sellingPrice"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="description">Product Description:</label>
          <textarea
            id="description"
            value={data.description}
            name="description"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 h-28 border rounded"
            placeholder="Enter product description"
            required
          ></textarea>

          <button className="border-2 border-red-600 bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-full transition">
            Upload Product
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imageurl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
