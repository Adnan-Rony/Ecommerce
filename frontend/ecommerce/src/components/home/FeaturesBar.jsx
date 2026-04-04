import { FaTruck, FaHeadset, FaUndoAlt, FaCreditCard, FaCoins } from "react-icons/fa";

const features = [
  { icon: <FaTruck />,      title: "Free Delivery",  subtitle: "Orders above ৳1000" },
  { icon: <FaHeadset />,    title: "24/7 Support",   subtitle: "Always here for you" },
  { icon: <FaUndoAlt />,    title: "Easy Returns",   subtitle: "365 day policy" },
  { icon: <FaCreditCard />, title: "Secure Payment", subtitle: "SSL encrypted" },
  { icon: <FaCoins />,      title: "Weekend Deals",  subtitle: "Big savings weekly" },
];

const FeaturesBar = () => (
  <section className="max-w-7xl mx-auto px-4 ">
    <div className="grid grid-cols-2 md:grid-cols-5 border border-gray-100 rounded-xl overflow-hidden bg-white">
      {features.map((f, i) => (
        <div
          key={i}
          className={`flex items-center gap-2.5 px-3 py-3 hover:bg-gray-50 transition-colors cursor-default group
            ${i !== features.length - 1 ? "border-b md:border-b-0 md:border-r border-gray-100" : ""}
            ${i % 2 === 0 && i !== features.length - 1 ? "border-r md:border-r-0 border-gray-100" : ""}
          `}
        >
          <span className="text-gray-400 group-hover:text-[#1d4c9e] transition-colors text-base flex-shrink-0">
            {f.icon}
          </span>
          <div>
            <p className="text-[11.5px] font-semibold text-gray-800 leading-tight">{f.title}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{f.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesBar;