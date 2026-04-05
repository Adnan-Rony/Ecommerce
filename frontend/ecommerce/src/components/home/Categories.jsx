import { Link } from "react-router-dom";
import { MdKitchen, MdPets, MdLightbulb } from "react-icons/md";
import { BsSmartwatch } from "react-icons/bs";

const categories = [
  {
    name: "Gadgets",
    icon: <BsSmartwatch />,
    slug: "gadgets",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "hover:border-blue-400",
    description: "Tech & Smart devices"
  },
  {
    name: "Kitchen",
    icon: <MdKitchen />,
    slug: "kitchen accessories",
    bg: "bg-orange-50",
    iconColor: "text-orange-600",
    border: "hover:border-orange-400",
    description: "রান্নাঘরের সরঞ্জাম"
  },
  {
    name: "Light",
    icon: <MdLightbulb />,
    slug: "light",
    bg: "bg-yellow-50",
    iconColor: "text-yellow-500",
    border: "hover:border-yellow-400",
    description: "আলোকসজ্জা"
  },
  {
    name: "Pet Items",
    icon: <MdPets />,
    slug: "pet items",
    bg: "bg-green-50",
    iconColor: "text-green-600",
    border: "hover:border-green-400",
    description: "পোষা প্রাণীর সামগ্রী"
  },
];

const Categories = () => (
  <div className="py-8 sm:p-4">

    {/* Header */}
    <div className="flex items-center justify-between mb-6 px-1 sm:px-4">
      <div className="p-2">
        <h2 className="text-2xl font-bold text-gray-800 ">Shop by Category</h2>
        <p className="text-gray-500 text-sm mt-1">যা খুঁজছেন সহজে খুঁজে নিন</p>
      </div>
      <Link
        to="/allcategories"
        className="text-blue-600 btn hover:text-blue-800 text-sm font-semibold"
      >
        See More
      </Link>
    </div>

    {/* Category Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {categories.map((cat, i) => (
        <Link
          key={i}
          to={`/allcategories?category=${cat.slug}`}
          className={`group flex flex-col items-center gap-3 py-6 px-4 bg-white border-2 border-gray-100 rounded-2xl ${cat.border} hover:shadow-lg transition-all duration-200`}
        >
          <div className={`w-16 h-16 rounded-2xl ${cat.bg} flex items-center justify-center text-3xl ${cat.iconColor} group-hover:scale-110 transition-transform duration-200`}>
            {cat.icon}
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-gray-800 group-hover:text-[#1d4c9e] transition-colors">
              {cat.name}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{cat.description}</p>
          </div>
        </Link>
      ))}
    </div>

  </div>
);

export default Categories;