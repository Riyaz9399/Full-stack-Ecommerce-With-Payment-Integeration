import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategories from "../helpers/productCategories";
import { SummaryApi } from "../common";
import SearchpageProduct from "../components/SearchPageProduct";

const CategoriesProducts = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const URLSearch = new URLSearchParams(location.search);
  const urlCategoriesListArray = URLSearch.getAll("category");

  const urlCategoriesListObject = {};
  urlCategoriesListArray.forEach((el) => {
    urlCategoriesListObject[el] = true;
  });

  const [selectCategories, setSelectCategories] = useState(urlCategoriesListObject);
  const [filterCategoriesList, setFilterCategoriesList] = useState(urlCategoriesListArray);
  const [sortBy,setSortBy] = useState("");
  const [sortBySet,setSortBySet] = useState("");
  console.log(sortBy);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.FilterProduct.url, {
      method: SummaryApi.FilterProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoriesList,
      }),
    });

    const dataResponse = await response.json();
    setData(dataResponse?.data);
    // console.log("Fetched Data:", dataResponse.data);
    setLoading(false);
  };

  const handleSelectCategories = (e) => {
    const { value, checked } = e.target;
    setSelectCategories((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoriesList]);

  useEffect(() => {
    const arrayCategories = Object.keys(selectCategories).filter((categoryKey) => selectCategories[categoryKey]);

    setFilterCategoriesList(arrayCategories);

    // Format the selected categories for URL
    const urlFormat = arrayCategories.map((el) => `category=${el}`).join("&");
    // console.log("URL Format:", urlFormat);

    // Navigate to the new URL with the updated query string
    navigate(`/product-categories?${urlFormat}`);
    // console.log("Selected Categories: ", arrayCategories);
  }, [selectCategories]);

  const handelChangeSortBy = (e)=>{
    const {value}  = e.target
    setSortBySet(value);
    if(value === "asc"){
      setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
    }
    if(value === "dsc"){
      setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
    }
  }

  useEffect (()=>{
    
  },[sortBy])


  return (
    <div className="container mx-auto p-4">
      {/* Desktop Version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* Left Side - Scrollable */}
        <div className="bg-white overflow-y-scroll h-[calc(100vh-120px)]">
          <div>
            <h2 className="text-lg uppercase font-medium text-slate-500 border-b pb-2 border-slate-200">
              Sort By
            </h2>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortby" checked={sortBy === 'asc' }  onChange={handelChangeSortBy} value={"asc"}/>
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="radio" name="sortby" checked={sortBy === 'dsc' }   onChange={handelChangeSortBy} value={"dsc"}/>
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter By */}
          <div>
            <h2 className="text-lg uppercase font-medium text-slate-500 border-b pb-2 border-slate-200">
              Filter By
            </h2>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategories.map((categoryName, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <input
                    type="checkbox"
                    name="category"
                    checked={selectCategories[categoryName.value] || false}
                    value={categoryName.value}
                    id={categoryName.value}
                    onChange={handleSelectCategories}
                  />
                  <label className="capitalize" htmlFor={categoryName.value}>
                    {categoryName.value}
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Right Side - Scrollable */}
        <div className="overflow-auto overflow-y-scroll h-[calc(100vh-120px)]">
          <p className="font-medium text-slate-500 text-lg my-2">Search Result : {data?.length}</p>
          <div className="bg-gray-200 ">
            {data.length !== 0 && !loading && (
              <SearchpageProduct products={data} heading="Recommended Products" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesProducts;
