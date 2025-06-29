import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen  ">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          <span className="text-blue-600">Tech</span><span className="text-purple-600">Dev</span>
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
