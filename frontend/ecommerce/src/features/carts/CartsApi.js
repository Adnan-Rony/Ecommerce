import axiosInstance from "../../api/axiosInstance.js"



export const AddToCart=async(CartId)=>{
    const res=await axiosInstance.post('/cart/add',CartId)
    return res.data
}

export const AllCart=async()=>{
    const res=await axiosInstance.get('/cart')
    return res.data
}

export const UpdateCart=async({CartId,UpdatedCart})=>{
    const res=await axiosInstance.put(`/cart/${CartId}`,UpdatedCart)
    return res.data
}

//modify this 
export const DeleteCart = async (productId) => {
  return await axiosInstance.delete("/cart/item", {
    data: { productId },
  });
};

