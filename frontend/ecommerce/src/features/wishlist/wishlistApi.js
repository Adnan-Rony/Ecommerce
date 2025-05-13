import axiosInstance from "../../api/axiosInstance.js"



export const getAllWishlist=async()=>{
    const res=await axiosInstance.get('/wishlist')
    return res.data
}

export const AddWishlist=async(wishlistId)=>{
    const res=await axiosInstance.get('/wishlist/add',wishlistId)
    return res.data
}


export const DeleteWishlist=async(wishlistId)=>{
    const res=await axiosInstance.get(`/wishlist/${wishlistId}`)
    return res.data
}
