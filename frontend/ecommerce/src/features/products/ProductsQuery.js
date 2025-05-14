import {  useMutation, useQuery } from "@tanstack/react-query";

import { fetchProductById, fetchProducts, searchProducts } from "./ProductsApi.js";



export const UseFetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
     select: (data) => data.products,
  });
};


export const UseFetchProductsById = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    // extract the actual product from response
    select: (data) => data.product,
  });
};


export const useSearchProducts = (searchTerm) => {
  return useQuery({
    queryKey: ["searchProducts", searchTerm],
    queryFn: () => searchProducts(searchTerm),
    enabled: !!searchTerm?.trim(),
  });
};