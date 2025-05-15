import axiosInstance from "../../api/axiosInstance.js"


export const fetchProducts=async()=>{
    const res=await axiosInstance.get('/product')
    return res.data
}

export const fetchProductById = async (id) => {
  const res = await axiosInstance.get(`/product/${id}`);
  return res.data;
};



export const createProduct=async(productData)=>{
    const res=await axiosInstance.post('/product/create',productData)
    return res.data
}


export const updateProduct=async({id,updatedData})=>{
    const res=await axiosInstance.put(`/product/${id}`,updatedData)
    return res.data
}

export const deleteProduct=async(id)=>{
    const res=await axiosInstance.delete(`/product/delete/${id}`)
    return res.data
}


export const searchProducts = async (searchTerm) => {
  const res = await axiosInstance.get(`/product`, {
    params: { search: searchTerm },
  });
  return res.data;
};
