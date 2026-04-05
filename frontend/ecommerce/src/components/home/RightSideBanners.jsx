import { UseFetchProducts } from "../../features/products/ProductsQuery.js";
import { Link } from "react-router-dom";

const BannerSkeleton = () => (
  <div className="relative rounded-2xl overflow-hidden h-[130px] bg-gray-200 animate-pulse" />
);

const RightSideBanners = () => {
  const { data: products, isLoading, isError } = UseFetchProducts();

  // Featured products for right banners
  const banners = products
    ?.filter(p => p.isFeatured && p.stock > 0)
    ?.slice(0, 4) ||
    products?.slice(0, 4) || [];

  return (
    <div className="grid grid-cols-2 gap-3">
      {isLoading && Array.from({ length: 4 }).map((_, i) => (
        <BannerSkeleton key={i} />
      ))}

      {!isLoading && !isError && banners.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="relative rounded-2xl overflow-hidden h-[130px] group shadow-md block"
        >
          {/* Background */}
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 p-3 flex flex-col justify-end">
            <p className="text-white text-xs font-bold leading-tight line-clamp-2">
              {product.name}
            </p>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-yellow-400 text-xs font-extrabold">
                ৳{product.price}
              </span>
              <span className="bg-white text-blue-900 text-xs font-bold px-2 py-0.5 rounded-full">
                Buy
              </span>
            </div>
          </div>

          {/* Stock badge */}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
              {product.stock} left!
            </span>
          )}
        </Link>
      ))}

      {!isLoading && isError && (
        <p className="text-red-500 col-span-2 text-center text-sm">
          Failed to load banners
        </p>
      )}
    </div>
  );
};

export default RightSideBanners;