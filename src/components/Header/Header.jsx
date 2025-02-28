import React from 'react';

const Header = () => {

  return (
    <header className="bg-gray-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img 
              src="/assets/logo3.jpg" 
              alt="Ministry Logo" 
              className="h-8 md:h-12 w-auto"
            />
          </div>

          <div className="flex items-center gap-4">
            <img 
              src="/assets/amritalogo.png" 
              alt="Amrita Logo" 
              className="h-8 md:h-12 w-auto"
            />
            <img 
              src="/assets/logoCdac.png" 
              alt="CDAC Logo" 
              className="h-8 md:h-12 w-auto"
            />
          </div>
        </div>
      </div>
     
    </header>
  );
};

export default Header;