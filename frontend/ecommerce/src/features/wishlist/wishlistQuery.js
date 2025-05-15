import { useMutation, useQuery } from "@tanstack/react-query"
import { AddWishlist, getAllWishlist } from "./wishlistApi.js"


export const UseWishlistCreate=()=>{
    return useMutation({
        mutationFn:AddWishlist
    })

}

export const useFetchWishlist = () => {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn:getAllWishlist
  });
};

