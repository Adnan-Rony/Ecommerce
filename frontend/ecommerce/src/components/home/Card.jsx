import React from "react";
import img1 from "../../assets/apple-macbook-air-13-space-gray-1-2-80x80.jpg";
import { Link } from "react-router";

const Card = () => {
  const products = [
    {
      id: 1,
      name: "Apple MacBook Pro 16″ M1 Pro",
      brand: "Apple MacBook",
      rating: 5,
      inStock: true,
      price: 2499.0,
      oldPrice: null,
      isHot: true,
      isNew: true,
      image: img1,
      sku: "30876",
      hasOptions: true,
    },
    {
      id: 2,
      name: "ASUS ZenBook OLED 13",
      brand: "Business Laptop",
      rating: 0,
      inStock: true,
      price: 1600.0,
      oldPrice: null,
      isHot: true,
      isNew: false,
      image: img1,
      sku: "30884",
      hasOptions: false,
    },
    {
      id: 3,
      name: "Lenovo Yoga Slim 7",
      brand: "Business Laptop",
      rating: 0,
      inStock: true,
      price: 900.0,
      oldPrice: null,
      isHot: true,
      isNew: false,
      image: img1,
      sku: "30887",
      hasOptions: false,
    },
    {
      id: 4,
      name: "HP Victus 16-e0174nw",
      brand: "Gaming Laptop",
      rating: 0,
      inStock: true,
      price: 918.0,
      oldPrice: 1020.0,
      isHot: true,
      discount: "-10%",
      image: img1,
      sku: "30888",
      hasOptions: false,
    },
    {
      id: 5,
      name: "Microsoft Surface Laptop",
      brand: "Ultrabook",
      rating: 0,
      inStock: true,
      price: 1800.0,
      oldPrice: null,
      isHot: true,
      image: img1,
      sku: "30902",
      hasOptions: false,
    },
  ];

  return (
    <div>
      {/* <div className="text-center ">
        <small className="text-blue-500">Hurry up to buy</small>
        <p className="text-4xl ">New Arrivals</p>
      </div> */}

      <div className="px-4 py-10 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">New Arrivals</h2>

        <Link to="/allcategories">
          <button className="btn btn-ghost rounded-2xl">More Products </button>
        </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <Link to="/categories">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-contain mb-3"
                  />

                  {/* {product.isNew && (
                  <span className="absolute top-2 left-12 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                    NEW
                  </span>
                )} */}
                </div>
              </Link>

              <h3 className="text-sm font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 mb-1">{product.brand}</p>

              <div className="flex items-center text-yellow-400 text-sm mb-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>{i < product.rating ? "★" : "☆"}</span>
                ))}
              </div>

              <p className="text-green-600 text-sm mb-1">
                {product.inStock ? "✔ In stock" : "Out of stock"}
              </p>

              <div className="text-sm text-gray-800 mb-2">
                <span className="text-blue-600 font-bold">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
                {product.hasOptions ? "Select Options" : "Add To Cart"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
