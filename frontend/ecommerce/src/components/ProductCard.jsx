import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Use react-router-dom instead of react-router
import { UseAddToCart } from "../features/carts/CardQuery.js";

import AddToCart from "./AddToCart.jsx";

const ProductCard = ({ product }) => {
    const [hovered, setHovered] = useState(false);

  const primaryImage = product.images?.[0];
  const secondaryImage = product.images?.[1] || primaryImage;
  

  return (
     <div
      className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between min-h-[380px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden">
          <img
            className="w-full h-40 object-contain mb-3 transform transition-transform duration-300 hover:scale-110"
            src={hovered ? secondaryImage : primaryImage}
            alt={product.name}
          />
        </div>
      </Link>

      <h3 className="text-sm font-semibold text-gray-900">{product.name}</h3>
      <p className="text-xs text-gray-500 mb-1">{product.brand}</p>

      <div className="flex items-center text-yellow-400 text-sm mb-1">
        {product.review || "☆ ☆"}
      </div>

      <p className="text-green-600 text-sm mb-1">
        ✔ In stock ({product.stock})
      </p>

      <div className="text-sm text-gray-800 mb-2">
        <span className="text-blue-600 font-bold">${product.price}</span>
      </div>

      <div className="mt-auto">
        <AddToCart product={product} key={product._id} />
      </div>
    </div>
  );
};

export default ProductCard;
