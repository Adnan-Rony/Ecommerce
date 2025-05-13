import axiosInstance from "../../api/axiosInstance.js"



export const myorderFetch=async()=>{
    const res=await axiosInstance.get('/order/my-orders')
    return res.data
}


export const ordercreate=async(orderId)=>{
    const res=await axiosInstance.get('/order/create',orderId)
    return res.data
}

export const singleMyorder=async(orderId)=>{
    const res=await axiosInstance.get(`/order/${orderId}`)
    return res.data
}


export const updateStatus=async({orderId,updateStatus})=>{
    const res=await axiosInstance.get(`order/status/${orderId}`,updateStatus)
    return res.data
}

