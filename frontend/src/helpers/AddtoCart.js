import { SummaryApi } from "../common/index.js";
import { toast } from "react-toastify";

export const addToCart = async (e, id) => {
  // Check if 'e' exists before calling stopPropagation or preventDefault
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }

  console.log(id);
  try {
    const response = await fetch(SummaryApi.AddproductIntoCart.url, {
      method: SummaryApi.AddproductIntoCart.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
      }),
    });
    
    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
    } else {
      toast.error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("Failed to add to cart. Please try again later.");
  }
};
