import React, { useEffect } from 'react';
import {useSelector} from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ROLE } from '../common/role';

function Adminpanel() {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();
    useEffect(()=>{
      if(user?.role !== ROLE.ADMIN){
        navigate("Home");
      }
     
    }, [user])
    
  return (
    <div className='min-h-[calc(100vh-115px)] md:flex hidden '>
        <aside className='bg-white min-h-full w-full max-w-60  customShadow '>
         <div className='h-32 flex justify-center items-center flex-col'>
         <div className="cursor-pointer text-5xl flex justify-center">
            {
              user?.ProfileImage ?(
                <img src={user?.ProfileImage} alt={user?.name} className="w-12 h-12 rounded-full"/>
              ):(
                <FaUserCircle />
              )

            }
          </div>
          <p className='captalize text-lg font-semibold '>
            {user?.name}
          </p>
          <p className="text-sm"> {user?.role}</p>
         </div>

         {/* navigation */}
         <div>
              <nav className='grid p-4'>
                <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-200 '  >All users</Link>
                <Link to={"Product"}  className='px-2 py-1 hover:bg-slate-200' >Product</Link>
                
              </nav>
         </div>
        </aside>
         
        <main className='w-full h-full p-2'>

         <Outlet/>
        </main>
    </div>
  )
}

export default Adminpanel