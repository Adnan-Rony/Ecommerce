import axiosInstance from "../../api/axiosInstance.js"


export const LoginUser=async(user)=>{
    const res=await axiosInstance.post('/users/login',user)
    return res.data
}


export const RegisterUser=async(userId)=>{
    const res=await axiosInstance.post('/users/register',userId)
    return res.data
}

export const LogoutUser = async () => {

  await axiosInstance.post('/users/logout');


  localStorage.removeItem('accessToken');

 
};

export const CurrentUser = async () => {
  const res = await axiosInstance.get('/users/profile');
  return res.data;
};


export const FetchAdminUser=async(userId)=>{
    const res=await axiosInstance.get('/users',userId)
    return res.data
}

export const MakeAdminUser=async({id,Updateduser})=>{
    const res=await axiosInstance.put(`/users/makeadmin/${id}`,Updateduser)
    return res.data
}


export const deleteUser=async(userId)=>{
    const res=await axiosInstance.delete(`/users/${userId}`)
    return res.data
}

