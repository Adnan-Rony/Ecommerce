import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AllOrderFetch, myorderFetch, ordercreate, updateStatus } from "./OrderApi.js";

export const UseMyOrders = () => {
  return useQuery({
    queryKey: ["myorders"],
    queryFn: myorderFetch,
  });
};

export const UseMyOrderCreate = () => {
  return useMutation({
    mutationFn: ordercreate,
  });
};

export const UseAllOrderFetch = () => {
  return useQuery({
    queryKey: ['all-orders'],
    queryFn: AllOrderFetch,
    refetchOnWindowFocus: true,
  });
};

export const UseUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-orders'] });
    },
  });
};