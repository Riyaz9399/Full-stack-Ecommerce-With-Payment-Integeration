import React, { useEffect, useState } from "react";
import { SummaryApi } from "../common";
import moment from "moment";

const Orders = () => {
  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.getOrders.url, {
        method: SummaryApi.getOrders.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const responseData = await response.json();
      console.log("CART items", responseData);
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      console.error("Error fetching cart data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
    <h1 className="text-center text-red-600 py-5 font-semibold text-2xl">
      Orders
    </h1>
    {/* <div className="text-center text-lg my-3">
      {data.length === 0 && <p className="bg-white py-5">NO DATA</p>}
    </div> */}
    <div>
      {data.length > 0 ? (
        <div className="space-y-6">
          {data.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row items-center sm:items-start border border-gray-200"
            >
              
              {/* Left side with image and price */}
              <div className="flex-shrink-0 w-full sm:w-auto mb-4 sm:mb-0 sm:mr-6">
                <img
                  src={order.products[0]?.product.ProductImage[0]} // Displaying the first product image as an example
                  alt={order.products[0]?.product.productName}
                  className="rounded-md w-full sm:w-48" // Full width on mobile, fixed width on larger screens
                />
                <p className="font-semibold text-xl mt-4 text-center sm:text-left">
                  ₹{order.amount}
                </p>
              </div>
  
              {/* Right side with order details */}
              <div className="flex-grow w-full">
                <h2 className="text-lg font-semibold mb-2">
                  Order ID: {order.razorpay_order_id}
                </h2>
                <p className="text-gray-500 mb-2">Status: {order.status}</p>
                <p className="text-gray-500 mb-2">
                  Date Ordered: {moment(order.createdAt).format('LL')}
                </p>
  
                <div className="mt-4">
                  <h3 className="font-semibold text-base mb-2">Products:</h3>
                  {order.products.map((item) => (
                    <div key={item._id} className="mb-4">
                      <p className="font-semibold">{item.product.productName}</p>
                      <p className="text-sm text-gray-500">
                        Brand: {item.product.BrandName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Price: ₹{item.product.sellingPrice}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 py-5">No orders found.</p>
      )}
    </div>
  </div>
  
  )
};

export default Orders;
