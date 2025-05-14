import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AddToCart, AllCart } from "./CartsApi.js";



export const UseAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AddToCart,
    onSuccess: () => {
      // Invalidate the cartItems query so it refetches
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
    },
  });
};


export const UseFetchAllCart=()=>{
    return useQuery({
        queryKey:['cartItems'],
        queryFn:AllCart,
         refetchOnWindowFocus: true,
        
    })
}