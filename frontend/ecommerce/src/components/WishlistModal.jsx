import { useFetchWishlist } from "../features/wishlist/wishlistQuery.js";

const WishlistModal = ({ isOpen, onClose }) => {
  const { data, isLoading, isError } = useFetchWishlist();

  if (!isOpen) return null;
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load wishlist.</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">My Wishlist</h2>
        {data.wishlist?.length === 0 ? (
          <p>No items in wishlist.</p>
        ) : (
          <ul className="space-y-3">
            {data.wishlist.map((item) => (
              <li key={item._id} className="flex items-center justify-between">
                <span>{item.product.name}</span>
                <button className="text-sm text-blue-500 hover:underline">Add to Cart</button>
              </li>
            ))}
          </ul>
        )}
        <button className="mt-4 text-red-500" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default WishlistModal;
