import React, { useState } from "react";
import CreateProducts from "./CreateProducts.jsx";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateProduct = (data) => {
    console.log("Product Data Submitted:", data);
    // Send data to backend using Axios here
  };

  return (
    <div className="min-h-screen">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add New Product
      </button>
      <CreateProducts
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProduct}
      />
    </div>
  );
};

export default AdminDashboard;
