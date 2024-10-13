import React, { useContext, useEffect, useState } from "react";
import { SummaryApi } from "../common";
import { Context } from "../context";
import { displayINRCurrency } from "../helpers/DisplayCurrecy";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.ViewCartProduct.url, {
        method: SummaryApi.ViewCartProduct.method,
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
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateQty = (id, qty) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const PaymentHandler = async () => {
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      body: JSON.stringify({
        amount: totalPrice,
        currency: "INR",
        products: data.map((product) => ({
          id: product._id,
          quantity: product.quantity,
        })),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    
    const options = {
      key: process.env.REACT_APP_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Sakshi Kirana Store",
      description: "Safety Stay here",
      order_id: order.id,
      callback_url: `${process.env.REACT_APP_BACKEND_URL}/api/paymentverification`,
      prefill: {
        name: "Sakshi Kushwaha",
        email: "sakshikushwaha5460@gmail.com",
        contact: "99999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
      modal: {
        ondismiss: function () {
          window.location.href = `https://full-stack-ecommerce-with-payment-integeration-wdfce.vercel.app/cancle`;
        },
      },
    };
  
    const razor = new window.Razorpay(options);
    
    razor.on('payment.success', async (response) => {
      console.log("Payment Success:", response);
      
      // Ensure data and totalPrice are available here
     
      
      const verificationResponse = await fetch(SummaryApi.paymentverification.url, {
        method: SummaryApi.paymentverification.method,
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,

        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      const verificationResult = await verificationResponse.json();
      console.log('Payment Verification Result:', verificationResult);
      
      if (verificationResult.success) {
        window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/success?reference=${response.razorpay_payment_id}`;
      } else {
        console.error('Verification failed:', verificationResult.message);
      }
    });
    
    razor.open();
  };
  
  

  const increaseQty = async (id, qty) => {
    const newQty = qty + 1;
    await updateCartQuantity(id, newQty);
    updateQty(id, newQty);
  };

  const decreaseQty = async (id, qty) => {
    if (qty > 1) {
      const newQty = qty - 1;
      await updateCartQuantity(id, newQty);
      updateQty(id, newQty);
    }
  };

  const updateCartQuantity = async (id, qty) => {
    const response = await fetch(SummaryApi.UpdateCartProduct.url, {
      method: SummaryApi.UpdateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      context.fetchUserAddtoCart();
    }
  };

  const deleteProduct = async (id) => {
    const response = await fetch(SummaryApi.DeleteCartProduct.url, {
      method: SummaryApi.DeleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData((prevData) => prevData.filter((item) => item._id !== id));
      context.fetchUserAddtoCart();
    }
  };

  const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr.productId.sellingPrice,
    0
  );

  return (
    <div className="">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">NO DATA</p>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-between p-4">
        {/* View Product */}
        <div className="w-full max-w-3xl">
          {loading
            ? Array.from({ length: context.cartproductCount }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="w-full bg-slate-200 h-32 my-2 border-slate-300 animate-pulse"
                  ></div>
                )
              )
            : data.map((product) => (
                <div
                  key={product?._id + "Add to cart loading"}
                  className="w-full bg-white h-36 my-2 border-slate-300 rounded grid grid-cols-[128px,1fr]"
                >
                  <div className="w-32 h-32 bg-slate-200">
                    <img
                      src={product?.productId?.ProductImage[0]}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                      alt={product?.productId?.productName}
                    />
                  </div>
                  <div className="px-4 py-4 relative ">
                    {/* Delete Product */}
                    <div
                      className="mx-2 absolute right-0 text-red-600 rounded-full p-2 hover:text-white hover:bg-red-600"
                      onClick={() => deleteProduct(product?._id)}
                    >
                      <MdDelete />
                    </div>
                    <h2 className="text-lg lg:text-2xl text-ellipsis line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.productId?.category}
                    </p>
                    <div className="flex items-center justify-between ">
                      <p className="text-red-600 font-medium text-lg">
                        {displayINRCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-slate-600 font-semibold text-lg">
                        {displayINRCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                      <button
                        className="border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white"
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                      >
                        +
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        className="border border-red-600 text-red-600 w-6 h-6 justify-center items-center rounded hover:bg-red-600 hover:text-white"
                        onClick={() =>
                          decreaseQty(product?._id, product?.quantity)
                        }
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        {/* Summary */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-36 bg-white">
              <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-500">
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>
              <button
                onClick={PaymentHandler}
                className="bg-blue-600 p-2 my-2 text-white w-full"
              >
                Pay with Razorpay
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
