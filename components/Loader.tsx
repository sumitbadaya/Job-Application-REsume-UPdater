
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800/50 border border-gray-700 rounded-lg">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      <p className="mt-4 text-lg font-semibold text-gray-300">Analyzing job description...</p>
      <p className="text-sm text-gray-500">Crafting your application materials.</p>
    </div>
  );
};

export default Loader;
