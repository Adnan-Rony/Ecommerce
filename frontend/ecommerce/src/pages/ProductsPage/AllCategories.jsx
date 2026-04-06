import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard.jsx";
import CategorySectionLoading from "../../components/loader/CategorySectionLoading.jsx";
import { UseFetchProducts } from "../../features/products/ProductsQuery.js";
import { SlidersHorizontal, Search, ChevronLeft, ChevronRight, X, LayoutGrid, List } from "lucide-react";
import useSEO from "../../hooks/useSEO.js";

const ITEMS_PER_PAGE = 9;




// ── Sort options ──────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { value: "default",    label: "Default" },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name-asc",   label: "Name: A → Z" },
  { value: "newest",     label: "Newest First" },
];

// ── Breadcrumb ────────────────────────────────────────────────────────────
const Breadcrumb = ({ category }) => (
  <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
    <Link to="/" className="hover:text-[#1d4c9e] transition">Home</Link>
    <span>/</span>
    <Link to="/allcategories" className="hover:text-[#1d4c9e] transition">Products</Link>
    {category !== "all" && (
      <>
        <span>/</span>
        <span className="text-gray-700 font-medium capitalize">{category}</span>
      </>
    )}
  </nav>
);



// ── Sidebar ───────────────────────────────────────────────────────────────
const Sidebar = ({


  
  categories, selectedCategory, setSelectedCategory,
  minPrice, setMinPrice, maxPrice, setMaxPrice,
  onReset, totalFiltered,
}) => {
  const hasFilters = selectedCategory !== "all" || minPrice > 0 || maxPrice < 100000;

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={15} className="text-[#1d4c9e]" />
            <span className="text-sm font-semibold text-gray-800">Filters</span>
          </div>
          {hasFilters && (
            <button
              onClick={onReset}
              className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 transition"
            >
              <X size={12} /> Clear all
            </button>
          )}
        </div>

        <div className="p-5 space-y-6">
          {/* Category */}
          <div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Category
            </p>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition flex items-center justify-between ${
                  selectedCategory === "all"
                    ? "bg-[#1d4c9e] text-white font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span>All Products</span>
              </button>
              {categories.map(({ name, count }) => (
                <button
                  key={name}
                  onClick={() => setSelectedCategory(name)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition flex items-center justify-between ${
                    selectedCategory === name
                      ? "bg-[#1d4c9e] text-white font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="capitalize">{name}</span>
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                    selectedCategory === name ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"
                  }`}>
                    {count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Price Range (৳)
            </p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-gray-400 mb-1 block">Min</label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    min={0}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-400 mb-1 block">Max</label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    min={0}
                    placeholder="100000"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center">
                ৳{minPrice.toLocaleString()} — ৳{maxPrice.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Result count */}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">
              <span className="font-semibold text-gray-700">{totalFiltered}</span> products found
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

// ── Pagination ────────────────────────────────────────────────────────────
const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible = pages.filter(
    (p) => p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)
  );

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      <button
        onClick={() => setCurrentPage((p) => p - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:border-[#1d4c9e] hover:text-[#1d4c9e] disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft size={16} />
      </button>

      {visible.map((page, i) => {
        const prev = visible[i - 1];
        const showEllipsis = prev && page - prev > 1;
        return (
          <span key={page} className="flex items-center gap-1.5">
            {showEllipsis && <span className="text-gray-300 px-1">…</span>}
            <button
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                currentPage === page
                  ? "bg-[#1d4c9e] text-white"
                  : "border border-gray-200 text-gray-600 hover:border-[#1d4c9e] hover:text-[#1d4c9e]"
              }`}
            >
              {page}
            </button>
          </span>
        );
      })}

      <button
        onClick={() => setCurrentPage((p) => p + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:border-[#1d4c9e] hover:text-[#1d4c9e] disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────
const AllCategories = () => {
  const { data: products, isLoading, isError } = UseFetchProducts();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm]   = useState("");
  const [minPrice, setMinPrice]       = useState(0);
  const [maxPrice, setMaxPrice]       = useState(100000);
  const [sortBy, setSortBy]           = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const safeProducts = products || [];

  // Build category list with counts
  const categories = useMemo(() => {
    const map = {};
    safeProducts.forEach((p) => {
      const cat = (p.category || "others").toLowerCase();
      map[cat] = (map[cat] || 0) + 1;
    });
    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [safeProducts]);

  // Filter
  const filteredProducts = useMemo(() => {
    let list = [...safeProducts];
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category?.toLowerCase() === selectedCategory);
    }
    list = list.filter(
      (p) =>
        p.price >= minPrice &&
        p.price <= maxPrice &&
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Sort
    if (sortBy === "price-asc")  list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "name-asc")   list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "newest")     list.reverse();
    return list;
  }, [safeProducts, selectedCategory, minPrice, maxPrice, searchTerm, sortBy]);

  const totalPages       = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (fn) => (...args) => { fn(...args); setCurrentPage(1); };

  const resetFilters = () => {
    setSelectedCategory("all");
    setMinPrice(0);
    setMaxPrice(100000);
    setSearchTerm("");
    setSortBy("default");
    setCurrentPage(1);
  };

  if (isLoading) return <CategorySectionLoading />;
  if (isError)   return <p className="text-center py-20 text-red-500">Failed to load products.</p>;

  return (
    <div className="bg-gray-50 min-h-screen">

    
      <div className="relative h-52 sm:h-64 md:h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1600&q=80"
          alt="All Products"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/85 via-[#1d4c9e]/50 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full w-fit mb-3">
            <span className="w-1.5 h-1.5 bg-yellow-700 rounded-full" />
            {safeProducts.length}+ Products Available
          </span>
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            Shop All Products
          </h1>
          <p className="text-white/75 text-sm mt-2 max-w-md">
            Gadgets, electronics, kitchen accessories & pet items — all in one place.
          </p>
          {/* Breadcrumb in banner */}
          <nav className="flex items-center gap-1.5 text-xs text-white/50 mt-4">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-white/80">All Products</span>
          </nav>
        </div>
      </div>

      {/* ── Page Content ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Top bar: search + sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Result count */}
          <span className="text-sm text-gray-400 whitespace-nowrap hidden sm:block">
            <span className="font-semibold text-gray-700">{filteredProducts.length}</span> results
          </span>
        </div>

        {/* Main layout: sidebar + grid */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar */}
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleFilterChange(setSelectedCategory)}
            minPrice={minPrice}
            setMinPrice={handleFilterChange(setMinPrice)}
            maxPrice={maxPrice}
            setMaxPrice={handleFilterChange(setMaxPrice)}
            onReset={resetFilters}
            totalFiltered={filteredProducts.length}
          />

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {paginatedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search size={24} className="text-gray-300" />
                </div>
                <p className="text-gray-500 font-medium">No products found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-5 py-2 border border-[#1d4c9e] text-[#1d4c9e] text-sm rounded-full hover:bg-[#1d4c9e] hover:text-white transition"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategories;