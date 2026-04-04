import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllCoupons,
  createCoupon,
  deleteCoupon,
  toggleCoupon
} from "./CouponApi.js";

export const UseGetAllCoupons = () => {
  return useQuery({
    queryKey: ['coupons'],
    queryFn: getAllCoupons,
    refetchOnWindowFocus: true,
  });
};

export const UseCreateCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
  });
};

export const UseDeleteCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
  });
};

export const UseToggleCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
  });
};