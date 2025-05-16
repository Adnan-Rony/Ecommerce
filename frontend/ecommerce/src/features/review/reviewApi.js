
import axiosInstance from './../../api/axiosInstance';

export const createReview = async ({ productId, comment, rating }) => {
  const res = await axiosInstance.post(`/review/${productId}`, { comment, rating });
  return res.data;
};

export const getProductReviews = async (productId) => {
  const res = await axiosInstance.get(`/review/${productId}`);
  return res.data;  
};

