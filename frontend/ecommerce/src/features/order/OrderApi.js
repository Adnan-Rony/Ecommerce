import axiosInstance from "../../api/axiosInstance.js"



export const AllCart=async()=>{
    const res=await axiosInstance.get('/cart')
    return res.data
}