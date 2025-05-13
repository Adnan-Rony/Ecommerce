import img from "../assets/apple-iphone-13-pink-2.jpg"

const CartItemsAll = () => {
    return (
        <div>
            <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-xl p-4 space-y-4 sm:space-y-5">
      {/* Product Info */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <img
          src={img}
          alt="Product"
          className="w-24 h-28 object-cover rounded mx-auto sm:mx-0"
        />
        <div className="flex-1 space-y-1">
          <h2 className="text-sm font-semibold text-center sm:text-left">
            Mens Premium Sports Active Wear T-shirt - Vigilant
          </h2>
          <div className="text-sm text-gray-500 line-through text-center sm:text-left">
            ₹ 750
          </div>
          <div className="text-lg font-semibold text-red-600 text-center sm:text-left">
            ₹ 570
          </div>
        </div>
      </div>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Quantity</label>
          <p>1</p>
        </div>
      </div>

      {/* Subtotal */}
      <div className="flex items-center justify-between font-medium">
        <span>Subtotal</span>
        <div>
          <span className="text-sm line-through text-gray-500 mr-2">₹ 1500</span>
          <span className="text-red-600 font-bold">₹ 1140</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <button className="flex items-center gap-2 text-white bg-black px-4 py-1.5 text-sm rounded shadow hover:bg-gray-800 w-full sm:w-auto justify-center">
          
          Add another Size
        </button>
        <button className="text-red-600 hover:text-red-800">
        
        </button>
      </div>
    </div>
        </div>
    );
};

export default CartItemsAll;