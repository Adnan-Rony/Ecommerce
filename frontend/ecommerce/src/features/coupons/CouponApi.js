import axiosInstance from "../../api/axiosInstance.js";

export const getAllCoupons = async () => {
  const res = await axiosInstance.get('/coupon/all');
  return res.data;
};

export const createCoupon = async (couponData) => {
  const res = await axiosInstance.post('/coupon/create', couponData);
  return res.data;
};

export const deleteCoupon = async (id) => {
  const res = await axiosInstance.delete(`/coupon/${id}`);
  return res.data;
};

export const toggleCoupon = async (id) => {
  const res = await axiosInstance.patch(`/coupon/toggle/${id}`);
  return res.data;
};