import React, { useState } from "react";
import { ROLE } from "../common/role";
import { IoClose } from "react-icons/io5";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, onClose ,userId,callFunction}) => {
  const [UserRole, SetUserRole] = useState(role);
  const handleOnChageSelect = (e) => {
    SetUserRole(e.target.value);
  };
  const UserUpdate = async()=>{
    const dataResponse = await fetch(SummaryApi.updateUser.url,{
      method:SummaryApi.updateUser.method,
      credentials:"include",
      headers:{
        "content-type" : "application/json"
      },
      body:JSON.stringify({
        userId : userId,
        role:UserRole
      })
    })

    const responseData = await dataResponse.json();
    if(responseData.success){
      toast.success(responseData.message);
      onClose();
      callFunction();
    }
    console.log("role Updated",responseData);




  }

  return (
    <div className="fixed  top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto p-4 bg-white shadow-md w-full max-w-sm">
        <button className="block  ml-auto" onClick={onClose}>
          <IoClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <div className="flex items-center justify-between my-4">
          <p>Role :</p>
          <section className="border px-4 py-1">
            <select value={UserRole} onChange={handleOnChageSelect}>
              {Object.values(ROLE).map((el) => (
                <option value={el} key={el}>
                  {el}
                </option>
              ))}
            </select>
          </section>
        </div>
        <button className="w-fit mx-auto block py-2 px-2 rounded-full bg-red-600 text-white hover:bg-red-700 border-none" onClick={UserUpdate}>
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
