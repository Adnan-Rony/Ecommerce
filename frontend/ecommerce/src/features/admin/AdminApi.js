import axiosInstance from "../../api/axiosInstance.js"


export const getAllStats=async()=>{
    const res=await axiosInstance.get('/admin/stats')
    return res.data
}

export const getAllStatsReport=async()=>{
    const res=await axiosInstance.get('/admin/stats-report')
    return res.data
}