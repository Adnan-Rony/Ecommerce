import { UseFetchProducts } from "../../features/products/ProductsQuery.js";
import { Link } from "react-router-dom";

// Skeleton placeholder component
const BannerSkeleton = () => {
  return (
    <div className="relative rounded-lg overflow-hidden min-h-[130px] bg-gray-200 animate-pulse shadow-md" />
  );
};

const RightSideBanners = () => {
  const { data: products, isLoading, isError } = UseFetchProducts();
  const banners = products?.slice(0, 4) || [];

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Skeleton loader */}
      {isLoading &&
        Array.from({ length: 4 }).map((_, i) => <BannerSkeleton key={i} />)}

      {/* Loaded banners */}
      {!isLoading &&
        !isError &&
        banners.map((product) => (
          <div
            key={product._id}
            className="relative rounded-lg overflow-hidden min-h-[130px] group shadow-md transition-transform duration-300 hover:scale-[1.02]"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:scale-105"
              style={{
                backgroundImage: `url(${product.images?.[0]})`,
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>

            {/* Content */}
            <div className="relative z-20 p-3 flex flex-col justify-between h-full text-white">
              <div>
                <h4 className="font-semibold text-sm mb-1 truncate">
                  {product.name}
                </h4>
              </div>
              <Link
                to={`/product/${product._id}`}
                className="inline-block mt-2 text-xs font-medium bg-white text-black px-3 py-1 rounded-full hover:bg-blue-700 hover:text-white transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}

      {/* Error message */}
      {!isLoading && isError && (
        <p className="text-red-500 col-span-2">Failed to load banners</p>
      )}
    </div>
  );
};

export default RightSideBanners;
