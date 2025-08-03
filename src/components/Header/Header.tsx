// components/Header/Header.tsx
import React from 'react';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Menu className="w-6 h-6 text-gray-600" />
            <div className="flex items-center space-x-2">
              <div className="text-2xl">✈️</div>
              <span className="text-xl font-medium text-gray-900">Google Flights</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;