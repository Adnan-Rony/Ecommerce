import { Link } from "react-router-dom";
import img from "../assets/apple-macbook-air-13-space-gray-1-2-80x80.jpg";
import img3 from "../assets/outlet-580x326.png";
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
      <div className="grid grid-cols-2 justify-between items-center mb-6 border p-4 bg-blue-400 rounded-2xl text-white">
        <div>
          <p className="text-3xl font-semibold">Outlet Store</p>
          <p>
            Here you will find discounted products that have been found to have
            minor damage that does not affect performance.
          </p>
        </div>
        <div>
          <img src={img3} alt="Outlet Banner" />
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
