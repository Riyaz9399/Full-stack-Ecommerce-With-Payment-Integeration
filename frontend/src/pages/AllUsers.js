import React, { useEffect, useState } from 'react'
import { SummaryApi } from '../common/index.js';
import { toast } from "react-toastify";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from '../components/ChangeUserRole.js';

const AllUsers = () => {
    const [allUser,setAllusers] = useState([]);
    const [openUpdateRole,setopenUpdateRole] = useState("");
    const [UpdateUserDetails , setUpdateUserDetails] = useState({
      email:"",
      name:"",
      role:"",
      _id:""
    });
     const fetchAllUsers = async ()=>{
        const fetchData = await fetch(SummaryApi.allUsers.url,{
            method:SummaryApi.allUsers.method,
            credentials:"include"
        });

        const dataResponce = await fetchData.json();
        if(dataResponce.success){
          setAllusers(dataResponce.data);
        }
        if(!dataResponce.success){
          toast.error(dataResponce.message);
        }
        console.log(dataResponce);
     }  

    useEffect(()=>{
        fetchAllUsers();
    },[])
  return (
    <div className='bg-white p-4'>
      <table className='w-full user-table'>
        <thead className='bg-black text-white'>
          <tr>
          <th>Sr.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Roll</th>
          <th>Created Date</th>
          <th>Action</th>
          </tr> 
        </thead>
        <tbody>
            {
              allUser.map((el,index)=>{
                return (
                  <tr >
                      <td>{index+1}</td>
                      <td>{el?.name}</td>
                      <td>{el?.email}</td>
                      <td>{el?.role}</td>
                      <td>{moment(el?.createdAt).format("LL")}</td>
                      <td>
                        <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-300 hover:text-white' 
                        onClick={()=>{
                          setUpdateUserDetails(el)
                          setopenUpdateRole(true)
                        }
                      }
                          

                        >
                          <FaEdit />
                          </button>
                      </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
            {
              openUpdateRole && (
                <ChangeUserRole 
                onClose={()=>setopenUpdateRole(false)}
                name={UpdateUserDetails.name} 
                email= {UpdateUserDetails.email}
                role = {UpdateUserDetails.role}
                userId={UpdateUserDetails._id}
                callFunction = {fetchAllUsers}
                />
              )
            }
      
    </div>
  )
}

export default AllUsers