import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white py-10 px-4 md:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 text-sm text-gray-600">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">
            <span className="text-blue-600">⦿</span>    Techlio.
          </h2>
          <p className="mb-4">Condimentum adipiscing vel neque dis nam parturient orci at scelerisque.</p>
          <p className="font-semibold mb-2">Subscribe us</p>
          <div className="flex gap-2 text-white text-lg">
            <span className="bg-blue-600 p-2 rounded-full"><FaFacebookF /></span>
            <span className="bg-black p-2 rounded-full"><FaXTwitter /></span>
            <span className="bg-pink-500 p-2 rounded-full"><FaInstagram /></span>
            <span className="bg-red-600 p-2 rounded-full"><FaYoutube /></span>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-black font-semibold mb-3">Categories</h3>
          <ul className="space-y-2">
            <li>Smartphones</li>
            <li>Laptops</li>
            <li>Hardware</li>
            <li>Cameras</li>
            <li>Headphones</li>
            <li>Bathroom</li>
          </ul>
        </div>

        {/* Useful Links 1 */}
        <div>
          <h3 className="text-black font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-2">
            <li>Promotions</li>
            <li>Stores</li>
            <li>Our contacts</li>
            <li>Delivery & Return</li>
            <li>Outlet</li>
          </ul>
        </div>

        {/* Useful Links 2 */}
        <div>
          <h3 className="text-black font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-2">
            <li>Blog</li>
            <li>Our contacts</li>
            <li>Promotions</li>
            <li>Stores</li>
            <li>Delivery & Return</li>
          </ul>
        </div>

        {/* App Downloads */}
        <div>
          <h3 className="text-black font-semibold mb-3">Download App on Mobile:</h3>
          <p className="mb-3 text-gray-500">15% discount on your first purchase</p>
          <div className="flex gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="w-32"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="w-32"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
