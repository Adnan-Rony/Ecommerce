import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useParams, Link } from "react-router";
import { FaWhatsapp, FaFacebook, FaLink } from "react-icons/fa";
import { MdLocalShipping, MdVerified } from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";
import toast from "react-hot-toast";

import { UseFetchProductsById } from "../features/products/ProductsQuery.js";
import AddToCart from "../components/AddToCart.jsx";
import RecommendedProducts from "../components/Products/Recommadation.jsx";
import DetailsPageLoading from "../components/loader/DetailsPageLoading.jsx";
import ProductTabs from "./ProductTabs.jsx";
import useSEO from "../hooks/useSEO.js";

const WHATSAPP_NUMBER = "8801618094828";

const SingleProduct = () => {



  useSEO({
  title: products?.name,
  description: `Buy ${products?.name} at ৳${products?.price} in Bangladesh. Brand: ${products?.brand}.`,
  image: products?.images?.[0],
  url: `https://zapzonebd.vercel.app/product/${id}`,
});


  const { id } = useParams();
  const { data: products, isLoading, isError } = UseFetchProductsById(id);

  if (isLoading) return <DetailsPageLoading />;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">
        Error loading product.
      </p>
    );
  if (!products)
    return (
      <p className="text-center mt-10 text-gray-500">
        No product found
      </p>
    );

  const currentUrl = window.location.href;

  const whatsappMessage = encodeURIComponent(
    `হ্যালো! আমি এই product টি order করতে চাই:\n\n` +
      `Product: ${products?.name}\n` +
      `Price: ${products?.price}\n` +
      `Link: ${currentUrl}\n\n` +
      `আমাকে details জানান। ধন্যবাদ!`
  );

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    currentUrl
  )}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    toast.success("Link copied!");
  };

  return (
    <div className="max-w-screen-xl mx-auto p-2">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 px-4 pt-4 pb-2">
        <Link to="/" className="hover:text-blue-600 transition">
          Home
        </Link>
        <span>/</span>
        <Link
          to="/allcategories"
          className="hover:text-blue-600 transition"
        >
          Products
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium truncate max-w-[200px]">
          {products?.name}
        </span>
      </nav>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 p-4">

        {/* Left */}
        <div className="p-4 flex justify-center">
          {products?.images?.length > 0 ? (
            <Carousel
              className="w-full max-w-md"
              showThumbs
              showStatus={false}
              infiniteLoop
              autoPlay
              interval={3000}
            >
              {products.images.map((url, index) => (
                <div key={index}>
                  <img
                    src={url}
                    alt={`Product image ${index + 1}`}
                    className="w-full object-cover rounded-xl"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <p>No images available</p>
          )}
        </div>

        {/* Right */}
        <div className="space-y-4 my-6">

          {/* Name & Price */}
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {products?.name}
            </p>

            <div className="flex items-center gap-3">
              <p className="font-bold text-3xl text-green-600">
                ৳ {products?.price}
              </p>

              {products?.originalPrice && (
                <p className="text-gray-400 line-through text-lg">
                  ৳{products.originalPrice}
                </p>
              )}
            </div>
          </div>

          {/* Stock */}
          <div>
            {products?.stock > 10 ? (
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                In Stock
              </span>
            ) : products?.stock > 0 ? (
              <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                মাত্র {products.stock}টা বাকি!
              </span>
            ) : (
              <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
                Stock নেই
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <AddToCart product={products} />
            </div>

            {/* ✅ FIXED WhatsApp Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition text-sm"
            >
              <FaWhatsapp className="text-xl" />
              Order via WhatsApp
            </a>
          </div>

          {/* Share */}
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-500">Share:</p>

            {/* ✅ FIXED Facebook */}
            <a
              href={facebookShare}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-lg"
            >
              <FaFacebook />
              Facebook
            </a>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-2 rounded-lg"
            >
              <FaLink />
              Copy Link
            </button>
          </div>

          {/* Trust */}
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center bg-blue-50 p-3 rounded-xl">
              <MdLocalShipping className="text-2xl text-blue-600" />
              <p className="text-xs">Free Delivery</p>
            </div>

            <div className="flex flex-col items-center bg-green-50 p-3 rounded-xl">
              <MdVerified className="text-2xl text-green-600" />
              <p className="text-xs">100% Original</p>
            </div>

            <div className="flex flex-col items-center bg-purple-50 p-3 rounded-xl">
              <BsShieldCheck className="text-2xl text-purple-600" />
              <p className="text-xs">COD Available</p>
            </div>
          </div>

          <hr />

          <ProductTabs product={products} />
        </div>
      </div>

      <hr className="my-6" />

      <RecommendedProducts />

      {/* ✅ FIXED Floating WhatsApp */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center gap-2 transition group"
      >
        <FaWhatsapp className="text-2xl" />
        <span className="text-sm font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
          Order Now
        </span>
      </a>

    </div>
  );
};

export default SingleProduct;