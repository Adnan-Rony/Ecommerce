import {
  FaTruck,
  FaHeadset,
  FaUndoAlt,
  FaCreditCard,
  FaCoins,
} from "react-icons/fa";

const FeaturesBar = () => {
  const features = [
    {
      icon: <FaTruck className="text-2xl text-blue-700" />,
      title: "Free Delivery",
      subtitle: "From $59.89",
    },
    {
      icon: <FaHeadset className="text-2xl text-blue-700" />,
      title: "Support 24/7",
      subtitle: "Online 24 hours",
    },
    {
      icon: <FaUndoAlt className="text-2xl text-blue-700" />,
      title: "Free Return",
      subtitle: "365 a day",
    },
    {
      icon: <FaCreditCard className="text-2xl text-blue-700" />,
      title: "Payment Method",
      subtitle: "Secure payment",
    },
    {
      icon: <FaCoins className="text-2xl text-blue-700" />,
      title: "Big Saving",
      subtitle: "Weekend Sales",
    },
  ];

  return (
    <div className="bg-gray-100 max-w-7xl mx-auto px-6 py-6 rounded-md shadow-md">
      <div className="flex justify-between items-center text-gray-800 text-sm font-semibold">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-3 ${
              idx !== features.length - 1 ? "border-r border-gray-300 pr-6" : ""
            }`}
          >
            <div>{feature.icon}</div>
            <div>
              <p className="text-base">{feature.title}</p>
              <p className="text-xs font-normal text-gray-500">{feature.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesBar;
