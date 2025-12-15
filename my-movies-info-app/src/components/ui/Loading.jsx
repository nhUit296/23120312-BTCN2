// src/components/ui/Loading.jsx
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#121212] z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Vòng tròn xoay */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 text-sm animate-pulse">
          Loading content...
        </p>
      </div>
    </div>
  );
};

export default Loading;
