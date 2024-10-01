const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;

export const uploadImage = async (image)=>{
   const formData = new FormData();
   formData.append("file",image);
   formData.append("upload_preset","Mern_Ecommerce")
   const dataResponse = await fetch(url,{
      method:"post",
      body:formData
   })
   return dataResponse.json();
}