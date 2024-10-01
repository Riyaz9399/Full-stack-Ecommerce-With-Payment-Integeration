import Razorpay from "razorpay";
import crypto from "crypto";
import {OrderModel} from "../../models/Order.model.js"
import {CartModel} from "../../models/Cart.model.js"

export const payment = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;
    
    // Add validation to check if amount is valid
    if (!amount || isNaN(amount)) {
      return res.status(400).json({
        message: "Invalid or missing amount.",
      });
    } 
    const razorpay = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_Secret,
    });

    const amountInPaise = Number(amount) * 100;
    const options = {
      amount: amountInPaise, // Amount in paise
      currency, // Currency, default is INR
      receipt, // Receipt ID, optional but recommended
    };

    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).send("ERROR");
    }
    res.json(order);
  } catch (error) {
    return res.status(400).json({
      message:  error,
    });
  }
};



export const paymentverification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const userId = req.user; // Get user from session

  // Verify payment
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto.createHmac('sha256', process.env.KEY_Secret)
                                   .update(body.toString())
                                   .digest('hex');

  if (expectedSignature === razorpay_signature) {
    // Payment verified successfully

   
    // Step 1: Fetch user's cart
    const cart = await CartModel.find({ userId }).populate('productId');

    let totalPrice = 0;
    const products = cart.map(item => {
      totalPrice += item.quantity * item.productId.sellingPrice; // Calculate the total price
      
      return {
        product: {
          _id: item.productId._id,  // The product ID
        },
        quantity: item.quantity
      };
    });

    // Step 2: Move cart items to orders collection
    const newOrder = await OrderModel.create({
      userId,
      products,   // Array of product details with quantity
      amount: totalPrice,
      status: "Paid",
      razorpay_order_id: req.body.razorpay_order_id,
      razorpay_payment_id: req.body.razorpay_payment_id,
      razorpay_signature: req.body.razorpay_signature
    });

    // Step 3: Clear the user's cart
    await CartModel.deleteMany({ userId });
          return res.redirect(`${process.env.FRONTEND_URL}/success?reference=${razorpay_payment_id}`);

    // Step 4: Send success respons
  } else {
    return res.redirect(`${process.env.FRONTEND_URL}/cancle`);
  }
};

