import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddToCart, AllCart, DeleteCart, UpdateCart } from "./CartsApi.js";
import { getGuestId } from "../../utils/guestSession.js";

export const UseAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AddToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
    },
  });
};

export const UseFetchAllCart = () => {
  return useQuery({
    queryKey: ['cartItems'],
    queryFn: AllCart,
    refetchOnWindowFocus: true,
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UpdateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
    },
  });
};