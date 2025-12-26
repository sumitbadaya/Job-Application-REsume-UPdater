
import React from 'react';
import { BriefcaseIcon } from './icons/BriefcaseIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center">
        <BriefcaseIcon className="h-8 w-8 text-cyan-400 mr-3" />
        <h1 className="text-2xl font-bold text-white tracking-tight">
          LinkedIn Job Application <span className="text-cyan-400">Copilot</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
