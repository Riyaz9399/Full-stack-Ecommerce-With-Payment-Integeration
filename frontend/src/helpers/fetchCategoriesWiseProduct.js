import { SummaryApi } from "../common/index.js"

export const fetchCategoriesWiseProduct = async (category)=>{
   const response = await fetch(SummaryApi.categorieWiseProduct.url,{
    method:SummaryApi.categorieWiseProduct.method,
    headers:{
        "content-type":"application/json"
    },
    body:JSON.stringify({
        category,
    })
   })

   const dataResponse = await response.json();
   return dataResponse
}