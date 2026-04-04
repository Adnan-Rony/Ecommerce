import axiosInstance from "../../api/axiosInstance.js";

export const getActiveFlashSale = async () => {
  const res = await axiosInstance.get('/flashsale/active');
  return res.data;
};

export const getAllFlashSales = async () => {
  const res = await axiosInstance.get('/flashsale/all');
  return res.data;
};

export const createFlashSale = async (data) => {
  const res = await axiosInstance.post('/flashsale/create', data);
  return res.data;
};

export const updateFlashSale = async ({ id, data }) => {
  const res = await axiosInstance.put(`/flashsale/${id}`, data);
  return res.data;
};

export const deleteFlashSale = async (id) => {
  const res = await axiosInstance.delete(`/flashsale/${id}`);
  return res.data;
};

export const toggleFlashSale = async (id) => {
  const res = await axiosInstance.patch(`/flashsale/toggle/${id}`);
  return res.data;
};