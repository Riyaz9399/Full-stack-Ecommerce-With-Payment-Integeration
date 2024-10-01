import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SummaryApi } from '../common';
import SearchingCartProduct from '../components/SearchingCartProduct';

const SearchProduct = () => {
    const query = useLocation()
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);

    console.log("Query",query.search);

    const fetchProduct = async()=>{
        setLoading(true);
        const responce = await fetch(SummaryApi.SearchProduct.url + query.search)
        const dataResponce = await responce.json();
        setLoading(false);
        setData(dataResponce.data);
        console.log("Data Responce ",dataResponce)
    }
   

  useEffect(()=>{
    fetchProduct()
  },[query.search])

  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading....</p>
        )
      }
      <p className='text-lg font-semibold my-3'>Search Result : {data.length}</p>
      {
        data.length === 0 && !loading && (
          <p className='bg-white text-lg text-center '>No Data Found....</p>
        )
      }

      {
        data.length !== 0 && !loading && (
          <SearchingCartProduct loading={loading} data={data} />     
        )        
      }
    </div>
  )
}

export default SearchProduct