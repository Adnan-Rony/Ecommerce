import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaGithub,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-12 pb-6 px-4 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo + About */}
        <div>
          <Link to="/" className="text-2xl font-bold text-blue-600 mb-4 block">
            Tech<span className="text-yellow-400">Dev.</span>
          </Link>
          <p className="text-sm mb-4">
            Discover the best tech products, get support, and enjoy seamless shopping.
          </p>
          <p className="font-medium mb-2">Follow Us</p>
          <div className="flex gap-3 text-white text-lg">
            <a
              href="https://www.facebook.com/adnanrony19/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 p-2 rounded-full"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=+8801747430447"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 p-2 rounded-full"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://github.com/Adnan-Rony"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black p-2 rounded-full"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/allcategories?category=smartphones">Smartphones</Link></li>
            <li><Link to="/allcategories?category=laptops">Laptops</Link></li>
            <li><Link to="/allcategories?category=hardware">Hardware</Link></li>
            <li><Link to="/allcategories?category=cameras">Cameras</Link></li>
            <li><Link to="/allcategories?category=headphones">Headphones</Link></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Useful Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/blogs">Blog</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>
            <li><Link to="/myorder">My Orders</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Contact Info</h4>
          <ul className="space-y-2 text-sm">
            <li><span className="font-medium">Phone:</span> +880 1747 430 447</li>
            <li><span className="font-medium">Email:</span> adnanrony19@gmail.com</li>
            <li><span className="font-medium">Address:</span> Mirpur 01, Dhaka 1209</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TechDev. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
