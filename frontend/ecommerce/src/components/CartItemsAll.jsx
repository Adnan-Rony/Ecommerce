
import { UseFetchAllCart } from "../features/carts/CardQuery.js";
import { MdDelete } from "react-icons/md";
import { useDeleteCartItem } from './../features/carts/CardQuery';
import { toast } from 'react-hot-toast';

const CartItemsAll = ({productId}) => {
  const { data, isLoading, isError } = UseFetchAllCart();
  const { mutate: deleteCartItem, isPending } = useDeleteCartItem();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load cart.</p>;

  // Safely extract cart items
   const cartItems = data?.cart?.products || [];

   const handleDelete = (productId) => {
    deleteCartItem(productId, {
      onSuccess: () => toast.success('Item removed from cart'),
      onError: () => toast.error('Failed to remove item'),
    });
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <p>No item in Cart.</p>
      ) : (
        <div className="space-y-4 ">
       
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="w-full max-w-md mx-auto bg-white shadow-lg rounded-xl p-4 space-y-4 sm:space-y-5"
            >
              {/* Product Info */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <img
                  src={item?.products?.images?.[0] }
                  alt={item?.product?.name}
                  className="w-24 h-28 object-cover rounded mx-auto sm:mx-0"
                />
                <div className="flex-1 space-y-1">
                  <h2 className="text-sm font-semibold text-center sm:text-left">
                    {item?.product?.name}
                  </h2>
                  <div className="text-sm text-gray-500 line-through text-center sm:text-left">
                    ₹ {item?.product?.originalPrice || 750}
                  </div>
                  <div className="text-lg font-semibold text-red-600 text-center sm:text-left">
                    ₹ {item?.product?.price || 570}
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Quantity</label>
                  <p>{item?.quantity || 1}</p>
                </div>
              </div>

              {/* Subtotal */}
              <div className="flex items-center justify-between font-medium">
                <span>Subtotal</span>
                <span className="text-red-600 font-bold">
                  ₹ {item?.product?.price * item?.quantity || 0}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                <button className="flex items-center gap-2 text-white bg-black px-4 py-1.5 text-sm rounded shadow hover:bg-gray-800 w-full sm:w-auto justify-center">
                  Add another Size
                </button>

                <button 
                onClick={()=>handleDelete(item?.product?._id)}  disabled={isPending}
                 className="text-red-600 hover:text-red-800">
                  <MdDelete className="text-2xl" />
                </button>



              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItemsAll;
