import { toast } from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import { useCart } from "../contex/CartContext.jsx";
import { UseFetchAllCart, useDeleteCartItem, useUpdateCartItem } from '../features/carts/CardQuery.js';
import { UseCurrentUser } from "../features/users/userQueries.js";
import { getGuestId } from "../utils/guestSession.js";
import axiosInstance from "../api/axiosInstance.js";
import { useQueryClient } from "@tanstack/react-query";

const CartItemsAll = () => {
  const { data, isLoading, isError } = UseFetchAllCart();
  const { data: user } = UseCurrentUser();
  const { cart: localCart, removeFromCart, updateQuantity } = useCart();
  const { mutate: deleteCartItem, isPending } = useDeleteCartItem();
  const queryClient = useQueryClient();

  const cartItems = user ? (data?.cart?.products || []) : localCart;

  if (isLoading && user) return <p>Loading cart...</p>;
  if (isError && user) return <p>Failed to load cart.</p>;

  const handleDelete = (productId) => {
    if (user) {
      deleteCartItem(productId, {
        onSuccess: () => toast.success('Item removed from cart'),
        onError: () => toast.error('Failed to remove item'),
      });
    } else {
      removeFromCart(productId);
      toast.success('Item removed from cart');
    }
  };

  const handleQuantityChange = async (productId, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;

    if (user) {
      try {
        await axiosInstance.put(`/cart/${productId}`, {
          productId,
          quantity: newQty,
        });
        queryClient.invalidateQueries({ queryKey: ['cartItems'] });
      } catch {
        toast.error('Failed to update quantity');
      }
    } else {
      updateQuantity(productId, newQty);
    }
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No items in cart.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => {
            const productId = user ? item?.product?._id : item._id;
            const name = user ? item?.product?.name : item.name;
            const image = user ? item?.product?.images?.[0] : item.images?.[0];
            const price = user ? item?.product?.price : item.price;
            const quantity = item.quantity || 1;

            return (
              <div
                key={item._id}
                className="w-full bg-white shadow rounded-xl p-4 space-y-3"
              >
                {/* Product Info */}
                <div className="flex gap-4 items-start">
                  <img
                    src={image}
                    alt={name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-sm font-semibold">{name}</h2>
                    <p className="text-green-600 font-bold mt-1">৳{price}</p>
                  </div>
                </div>

                {/* Quantity Control */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(productId, quantity, -1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 font-bold text-lg flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="font-bold text-lg w-6 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(productId, quantity, +1)}
                      className="w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 font-bold text-lg flex items-center justify-center text-blue-700"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <p className="font-semibold text-red-600">
                    ৳{price * quantity}
                  </p>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(productId)}
                    disabled={isPending}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdDelete className="text-2xl" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CartItemsAll;