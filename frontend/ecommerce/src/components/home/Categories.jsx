import {
  FaMobileAlt,
  FaLaptop,
  FaMicrochip,
 
  FaHeadphonesAlt,
} from "react-icons/fa";
import { MdDevices } from "react-icons/md";

const categories = [
  {
    name: "Smartphones",
    icon: <FaMobileAlt className="text-3xl text-blue-600" />,
  },
  {
    name: "Laptops",
    icon: <FaLaptop className="text-3xl text-blue-600" />,
  },
  {
    name: "Hardware",
    icon: <FaMicrochip className="text-3xl text-blue-600" />,
  },
  {
    name: "Electronics",
    icon: <MdDevices className="text-3xl text-blue-600" />,
  },
  {
    name: "Headphones",
    icon: <FaHeadphonesAlt className="text-3xl text-blue-600" />,
  },
];

const CategoriesSection = () => {
  return (
    <section className=" py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className=" mb-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
        <p className="text-gray-500">Explore some categories</p>
      </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow hover:shadow-md hover:bg-blue-50 transition"
            >
              {cat.icon}
              <p className="mt-2 text-sm font-medium text-gray-700">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
