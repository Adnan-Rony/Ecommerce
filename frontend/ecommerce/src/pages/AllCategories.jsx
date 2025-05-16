import { Link } from "react-router-dom";
import img from "../assets/apple-macbook-air-13-space-gray-1-2-80x80.jpg";
import bannerBg from "../assets/slide-1.jpg";
import { UseFetchProducts } from "../features/products/ProductsQuery.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ProductCard from "../components/ProductCard.jsx";

const AllCategories = ({product}) => {
  const { data: products, isLoading, isError } = UseFetchProducts();

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <p>Error fetching products</p>;

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const category = (product.category || "Others").toLowerCase();
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="bg-gray-50">
  <div
      className="w-full h-[300px] flex items-center justify-between px-10 rounded-2xl overflow-hidden text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerBg})` }}
    >
      
      <div className="max-w-md">
        <h2 className="text-4xl font-bold mb-2">Laptop UltraSlim i5 14</h2>
        <p className="text-sm mb-4">
          Discount on the line of laptops and tablets of the Elite series
        </p>
        <div className="flex items-center gap-4 text-lg">
          <span className="line-through text-gray-300">$2220</span>
          <span className="text-blue-400 font-semibold">$1800</span>
        </div>
      </div>

     
    </div>

      {Object.entries(groupedProducts).map(([category, items]) => (
        <div key={category} className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{category}</h2>
            <Link to={`/categories/${category.toLowerCase()}`}>
              <button className="btn btn-ghost rounded-2xl">
                More Products
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
            {items.map((product) => (
              <ProductCard key={product._id} product={product}></ProductCard>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllCategories;
