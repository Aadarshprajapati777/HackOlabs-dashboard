import { ChevronDown, Menu, X } from 'lucide-react';
import React, { useState } from 'react';

const menuItems = [
  { name: 'Home', hasDropdown: false },
  { name: 'About', hasDropdown: true },
  { name: 'In the news', hasDropdown: false },
  { name: 'Workshops', hasDropdown: true },
  { name: 'Training', hasDropdown: true },
  { name: 'Download', hasDropdown: false },
  { name: 'Contact us', hasDropdown: false },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Add state for hover effect demonstration if needed
  const [activeItem, setActiveItem] = useState(null);

  return (
    <nav className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile menu button - Updated styling */}
        <div className="flex md:hidden justify-between items-center py-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md font-bold text-gray-700 hover:bg-cyan-700 hover:text-white transition-all duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Languages dropdown - kept original styling */}
          <div className="flex items-center">
            <a href="#" className="flex items-center p-2 rounded-md font-bold text-gray-700 hover:bg-cyan-700 hover:text-white transition-all duration-300">
              Languages
              <ChevronDown className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Mobile menu - Updated styling */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col space-y-2 pb-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className="flex items-center font-bold text-gray-700 hover:bg-cyan-700 hover:text-white p-2 rounded transition-all duration-300"
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop menu - Updated styling */}
        <div className="hidden md:flex justify-between items-center">
          <ul className="flex space-x-8">
            {menuItems.map((item, index) => (
              <li key={index} className="py-3">
                <a 
                  href="#" 
                  className="flex items-center font-bold text-gray-700 hover:bg-cyan-700 hover:text-white p-2 rounded transition-all duration-300"
                  onMouseEnter={() => setActiveItem(index)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Languages link - desktop - Updated styling */}
          <div className="py-3">
            <a 
              href="#" 
              className="flex items-center font-bold text-gray-700 hover:bg-cyan-700 hover:text-white p-2 rounded transition-all duration-300"
            >
              Languages
              <ChevronDown className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;