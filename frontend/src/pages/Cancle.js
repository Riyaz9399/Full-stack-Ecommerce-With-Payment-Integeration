import React from 'react'
import { Link } from 'react-router-dom'
import cancle from "../cancle.webp" 

const Cancle = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 mt-20'>
    <img src={cancle} width={150} height={150} alt='Cancle Logo'  className='mix-blend-multiply'/>
    <p className='text-red-600 font-bold text-xl'>Payment cancelled</p>
    <Link to={"/cart"} className='p-2 px-3 my-5 border-2 border-red-600 font-semibold text-red-600 hover:bg-red-600 hover:text-white'>BACK TO CART</Link>
</div>

  )
}

export default Cancle