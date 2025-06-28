import React, { useState, useMemo } from "react";
import ProductCard from "../../components/ProductCard.jsx";
import CategorySectionLoading from "../../components/loader/CategorySectionLoading.jsx";
import { UseFetchProducts } from "../../features/products/ProductsQuery.js";
import bannerBg from "../../assets/slide-1.jpg";

const AllCategories = () => {
  const { data: products, isLoading, isError } = UseFetchProducts();

  // Filter & pagination state
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const safeProducts = products || [];

  // Group products for category list
  const groupedProducts = useMemo(() => {
    return safeProducts.reduce((acc, product) => {
      const category = (product.category || "Others").toLowerCase();
      if (!acc[category]) acc[category] = [];
      acc[category].push(product);
      return acc;
    }, {});
  }, [safeProducts]);

  // Apply filters including search
  const filteredProducts = useMemo(() => {
    let filtered = safeProducts;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    filtered = filtered.filter(
      (p) =>
        p.price >= minPrice &&
        p.price <= maxPrice &&
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered;
  }, [safeProducts, selectedCategory, minPrice, maxPrice, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Conditional rendering after all hooks
  if (isLoading) return <CategorySectionLoading />;
  if (isError) return <p>Error fetching products</p>;

  return (
    <div className="max-w-screen-xl  mx-auto">
      {/* Banner */}
      <div
        className="w-full h-[300px] flex items-center justify-between px-10 overflow-hidden text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerBg})` }}
      >
        <div className="lg:max-w-md max-w-60">
          <h2 className="lg:text-4xl text-xl font-bold mb-2">
            Laptop UltraSlim i5 14
          </h2>
          <p className="text-sm mb-4">
            Discount on the line of laptops and tablets of the Elite series
          </p>
          <div className="flex items-center gap-4 text-lg">
            <span className="line-through text-gray-300">$2220</span>
            <span className="text-blue-400 font-semibold">$1800</span>
          </div>
        </div>
      </div>

      {/* Filters + Product Grid */}
      <div className="flex flex-col lg:flex-row gap-6 my-6">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-1/4 bg-white rounded-lg p-4 shadow">
          {/* Search Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Search Products</h3>
            <input
              type="text"
              placeholder="Search by product name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Category</h3>
            <select
              className="w-full border p-2 rounded"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All</option>
              {Object.keys(groupedProducts).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Price Range</h3>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full border p-2 rounded"
                min={0}
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full border p-2 rounded"
                min={0}
              />
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
            {paginatedProducts.length === 0 ? (
              <p>No products found</p>
            ) : (
              paginatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-2">
              {currentPage} / {totalPages || 1}
            </span>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategories;
