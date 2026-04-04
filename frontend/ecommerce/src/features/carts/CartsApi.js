import axiosInstance from "../../api/axiosInstance.js";
import { getGuestId } from "../../utils/guestSession.js";

export const AddToCart = async ({ productId, quantity = 1, size }) => {
  const guestId = getGuestId();
  const res = await axiosInstance.post('/cart/add', {
    productId,
    quantity,
    size,
    guestId
  });
  return res.data;
};

export const AllCart = async () => {
  const guestId = getGuestId();
  const res = await axiosInstance.get(`/cart?guestId=${guestId}`);
  return res.data;
};

export const UpdateCart = async ({ CartId, UpdatedCart }) => {
  const guestId = getGuestId();
  const res = await axiosInstance.put(`/cart/${CartId}`, {
    ...UpdatedCart,
    guestId
  });
  return res.data;
};

export const DeleteCart = async (productId) => {
  const guestId = getGuestId();
  return await axiosInstance.delete("/cart/item", {
    data: { productId, guestId },
  });
};

export const applyCoupon = async ({ code, orderAmount }) => {
  const res = await axiosInstance.post('/coupon/apply', { code, orderAmount });
  return res.data;
};