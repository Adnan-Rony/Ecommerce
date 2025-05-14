const PromoBanner = () => {
  return (
<div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
  backgroundImage: `url('https://img.lazcdn.com/us/domino/880440e1-ac70-4ddd-acce-f5ab6943c587_BD-1976-688.jpg_2200x2200q80.jpg')`,
}}

      ></div>

      {/* Overlay with 50% black */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-2">Mega Sale is Live!</h2>
        <p className="text-sm md:text-lg mb-4">Up to 50% off on selected products.</p>
        <button className="bg-white text-blue-700 font-semibold px-6 py-2 rounded hover:bg-gray-100">
          Shop Now
        </button>
      </div>
    </div>
  );
};


export default PromoBanner