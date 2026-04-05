import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdLocalShipping, MdVerified, MdSupportAgent } from "react-icons/md";
import { FaBolt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0a1628] text-gray-300">

      {/* Trust Bar */}
      <div className="bg-[#0f2d6e] py-4 px-4">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: <MdLocalShipping className="text-2xl text-yellow-400" />,
              title: "Free Delivery",
              sub: "সারা বাংলাদেশে",
            },
            {
              icon: <MdVerified className="text-2xl text-green-400" />,
              title: "100% Original",
              sub: "যাচাইকৃত পণ্য",
            },
            {
              icon: <FaBolt className="text-2xl text-yellow-400" />,
              title: "Cash on Delivery",
              sub: "পেমেন্টে ঝামেলা নেই",
            },
            {
              icon: <MdSupportAgent className="text-2xl text-blue-400" />,
              title: "24/7 Support",
              sub: "WhatsApp এ যোগাযোগ",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              {item.icon}
              <div>
                <p className="text-white font-semibold text-sm">
                  {item.title}
                </p>
                <p className="text-blue-300 text-xs">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-screen-xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <Link to="/" className="inline-block mb-4">
            <h2 className="text-2xl font-extrabold text-white">
              Zap<span className="text-yellow-400">Zone</span>
              <span className="text-xs ml-1 bg-yellow-400 text-blue-900 px-1.5 py-0.5 rounded font-bold">
                BD
              </span>
            </h2>
          </Link>

          <p className="text-sm text-gray-400 leading-relaxed mb-5">
            বাংলাদেশের সেরা অনলাইন গ্যাজেট শপ। সেরা দামে সেরা পণ্য — ক্যাশ অন ডেলিভারিতে।
          </p>

          {/* Social */}
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
            Follow Us
          </p>

          <div className="flex gap-2">
            {[
              {
                icon: <FaFacebookF />,
                href: "https://www.facebook.com/adnanrony19/",
                bg: "bg-blue-600 hover:bg-blue-700",
              },
              {
                icon: <FaWhatsapp />,
                href: "https://wa.me/8801618094828",
                bg: "bg-green-500 hover:bg-green-600",
              },
              {
                icon: <FaInstagram />,
                href: "#",
                bg: "bg-pink-600 hover:bg-pink-700",
              },
              {
                icon: <FaYoutube />,
                href: "#",
                bg: "bg-red-600 hover:bg-red-700",
              },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${s.bg} text-white p-2 rounded-xl transition text-sm hover:scale-110`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-bold text-base mb-5 flex items-center gap-2">
            <span className="w-1 h-4 bg-yellow-400 rounded-full inline-block" />
            Categories
          </h4>

          <ul className="space-y-2.5 text-sm">
            {[
              { name: "Gadgets", slug: "gadgets" },
              { name: "Kitchen Accessories", slug: "kitchen accessories" },
              { name: "Light", slug: "light" },
              { name: "Pet Items", slug: "pet items" },
            ].map((cat, i) => (
              <li key={i}>
                <Link
                  to={`/allcategories?category=${cat.slug}`}
                  className="text-gray-400 hover:text-yellow-400 transition flex items-center gap-2"
                >
                  <span className="text-yellow-400 text-xs">›</span>
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-base mb-5 flex items-center gap-2">
            <span className="w-1 h-4 bg-yellow-400 rounded-full inline-block" />
            Quick Links
          </h4>

          <ul className="space-y-2.5 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "All Products", path: "/allcategories" },
              { name: "Track Order", path: "/track-order" },
              { name: "Blog", path: "/blogs" },
              { name: "Contact Us", path: "/contact" },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className="text-gray-400 hover:text-yellow-400 transition flex items-center gap-2"
                >
                  <span className="text-yellow-400 text-xs">›</span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold text-base mb-5 flex items-center gap-2">
            <span className="w-1 h-4 bg-yellow-400 rounded-full inline-block" />
            Contact Info
          </h4>

          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 mt-0.5">📞</span>
              <div>
                <p className="text-gray-500 text-xs">Phone / WhatsApp</p>
                <a
                  href="tel:+8801618094828"
                  className="text-gray-300 hover:text-yellow-400 transition font-medium"
                >
                  +880 1618 094 828
                </a>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-yellow-400 mt-0.5">📧</span>
              <div>
                <p className="text-gray-500 text-xs">Email</p>
                <a
                  href="mailto:adnanrony19@gmail.com"
                  className="text-gray-300 hover:text-yellow-400 transition font-medium"
                >
                  adnanrony19@gmail.com
                </a>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-yellow-400 mt-0.5">📍</span>
              <div>
                <p className="text-gray-500 text-xs">Address</p>
                <p className="text-gray-300 font-medium">
                  Savar, Dhaka, Bangladesh
                </p>
              </div>
            </li>
          </ul>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/8801618094828"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2.5 rounded-xl transition text-sm w-fit"
          >
            <FaWhatsapp className="text-lg" />
            Chat with Us
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 px-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ZapZone BD. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Designed & Developed by Adnan Al Rony</span>
            <span className="text-yellow-400">🇧🇩 Made in Bangladesh</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;