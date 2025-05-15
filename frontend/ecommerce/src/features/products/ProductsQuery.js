import {   useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createProduct, deleteProduct, fetchProductById, fetchProducts, searchProducts } from "./ProductsApi.js";



export const UseFetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
     select: (data) => data.products,
  });
};

export const UseCreateProduct=()=>{
  return useMutation({
    mutationFn:createProduct
  })
}



export const UseFetchProductsById = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  
    select: (data) => data.product,
  });
};


export const UseDeleteProductsById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // Adjust to your actual query key
    },
  });
};


export const useSearchProducts = (searchTerm) => {
  return useQuery({
    queryKey: ["searchProducts", searchTerm],
    queryFn: () => searchProducts(searchTerm),
    enabled: !!searchTerm?.trim(),
  });
};