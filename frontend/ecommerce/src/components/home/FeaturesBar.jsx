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
      icon: <FaTruck />,
      title: "Free Delivery",
      subtitle: "From $100",
    },
    {
      icon: <FaHeadset />,
      title: "Support 24/7",
      subtitle: "Online 24 hours",
    },
    {
      icon: <FaUndoAlt />,
      title: "Free Return",
      subtitle: "365 days",
    },
    {
      icon: <FaCreditCard />,
      title: "Payment Method",
      subtitle: "Secure payment",
    },
    {
      icon: <FaCoins />,
      title: "Big Saving",
      subtitle: "Weekend Sales",
    },
  ];

  return (
    <section
      aria-label="Site Features"
      className="bg-white shadow-md rounded-lg max-w-7xl mx-auto px-6 py-8"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center text-gray-900 text-sm font-semibold">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-4 py-4 cursor-default
              ${idx !== features.length - 1 ? "md:border-r md:border-gray-300 md:pr-8" : ""}
              hover:bg-blue-50 transition-colors rounded-md`}
            role="group"
            tabIndex={0}
          >
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 text-2xl shadow-md">
              {feature.icon}
            </div>
            <div>
              <p className="text-lg font-semibold leading-tight">{feature.title}</p>
              <p className="text-xs font-normal text-gray-500 mt-1">{feature.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesBar;
