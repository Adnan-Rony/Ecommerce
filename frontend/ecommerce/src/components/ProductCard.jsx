import React from 'react';
import { Link } from 'react-router';

const ProductCard = ({product}) => {
    return (
        <div>
            <div
              key={product._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between min-h-[380px]"
            >
              <Link to={`/product/${product._id}`}>
                <div className="relative">
                  <img
                    className="w-full h-40 object-contain mb-3"
                    src={product.images}
                    alt={product.name}
                  />
                </div>
              </Link>

              <h3 className="text-sm font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
              <div className="flex items-center text-yellow-400 text-sm mb-1">
                ☆ ☆ ☆ ☆
              </div>
              <p className="text-green-600 text-sm mb-1">
                ✔ In stock ({product.stock})
              </p>
              <div className="text-sm text-gray-800 mb-2">
                <span className="text-blue-600 font-bold">
                  ${product.price}
                </span>
              </div>

              <div className="mt-auto">
                <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm">
                  Add To Cart
                </button>
              </div>
            </div>
        </div>
    );
};

export default ProductCard;