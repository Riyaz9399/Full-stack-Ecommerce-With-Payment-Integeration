import React from 'react'
import success from "../success.png"
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 mt-20'>
        <img src={success} width={150} height={150} alt='payment icon' className='mix-blend-multiply'/>
        <p className='text-green-600 font-bold text-xl'>Payment Successfully</p>
        <Link to={"/order"} className='p-2 px-3 my-5 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white'>GO TO ORDERS</Link>
    </div>
  )
}

export default Success