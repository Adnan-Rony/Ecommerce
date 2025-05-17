import React from "react";
import { FiShoppingCart, FiUsers, FiPackage, FiDollarSign } from "react-icons/fi";

const DashboardOverview = () => {
  // Example metrics – replace these values with data fetched from your API
  const metrics = [
    {
      title: "Total Sales",
      value: "$20400",
      icon: <FiDollarSign className="w-6 h-6 text-green-600" />,
      description: "15% increase from last month",
    },
    {
      title: "Total Orders",
      value: "15",
      icon: <FiShoppingCart className="w-6 h-6 text-blue-600" />,
      description: "5% increase from last month",
    },
    {
      title: "Total Users",
      value: "08",
      icon: <FiUsers className="w-6 h-6 text-purple-600" />,
      description: "New registrations increased",
    },
    {
      title: "Total Products",
      value: "19",
      icon: <FiPackage className="w-6 h-6 text-orange-600" />,
      description: "Stock is well-managed",
    },
  ];

  return (
    <div className="p-4 md:p-6 bg-gray-100">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-full mr-4">
                {metric.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-700">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{metric.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
