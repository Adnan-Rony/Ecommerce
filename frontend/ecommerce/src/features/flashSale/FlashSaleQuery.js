import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getActiveFlashSale,
  getAllFlashSales,
  createFlashSale,
  updateFlashSale,
  deleteFlashSale,
  toggleFlashSale
} from "./FlashSaleApi.js";

export const UseGetActiveFlashSale = () => {
  return useQuery({
    queryKey: ['flashsale-active'],
    queryFn: getActiveFlashSale,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const UseGetAllFlashSales = () => {
  return useQuery({
    queryKey: ['flashsales'],
    queryFn: getAllFlashSales,
  });
};

export const UseCreateFlashSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFlashSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashsales'] });
      queryClient.invalidateQueries({ queryKey: ['flashsale-active'] });
    },
  });
};

export const UseUpdateFlashSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFlashSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashsales'] });
      queryClient.invalidateQueries({ queryKey: ['flashsale-active'] });
    },
  });
};

export const UseDeleteFlashSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFlashSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashsales'] });
      queryClient.invalidateQueries({ queryKey: ['flashsale-active'] });
    },
  });
};

export const UseToggleFlashSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleFlashSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashsales'] });
      queryClient.invalidateQueries({ queryKey: ['flashsale-active'] });
    },
  });
};