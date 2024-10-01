import React, { useEffect, useState } from "react";
import { SummaryApi } from "../common";
import {Link} from "react-router-dom";

const CategoriesList = () => {
  const [categoriesproduct, setcategoriesproduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const catogoriesLoading = new Array(12).fill(null) 

  const fetchCategories = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.getProductWisecategories.url);
    const dataResponce = await response.json();
    setLoading(false);
    setcategoriesproduct(dataResponce.data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto  p-4  ">
      <div className="flex items-center justify-between gap-4 flex-row  overflow-hidden overflow-x-scroll scrollbar-none">


        {categoriesproduct.map((product, index) => {
          return (
            loading?(
              
                catogoriesLoading.map((el,index)=>{
                  return (
                    <div className="h-16 w-16 md-w-20 md-h-20 rounded-full overflow-hidden scrollbar-none bg-slate-100 animate-pulse "
                    key={"catogoriesLoading"+index}>
                    </div>
                  )
                })
              
              
            ):(
              <Link to={"/product-categories?category="+product.category} className="cursor-pointer" key={product?.category}>
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full  overflow-hidden p-4 bg-slate-200 flex items-center">
                <img
                  src={product?.ProductImage[0]}
                  alt={product?.category} 
                  
                  className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                />
              </div>
              <p className="text-center text-sm md:text-base capitalize">{product?.category}</p>
            </Link>
            )
            
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesList;
