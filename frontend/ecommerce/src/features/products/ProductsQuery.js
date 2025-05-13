import {  useMutation, useQuery } from "@tanstack/react-query";

import { fetchProducts } from "./ProductsApi.js";



export const UseFetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
     select: (data) => data.products,
  });
};