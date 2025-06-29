// src/components/ui/card.jsx

import React from "react";

const Card = ({ children, className }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-200 ${className || ""}`}
    >
      {children}
    </div>
  );
};

const CardContent = ({ children, className }) => {
  return (
    <div className={`p-4 ${className || ""}`}>
      {children}
    </div>
  );
};

export { Card, CardContent };
