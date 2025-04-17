import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#fdf0d1] shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="https://www.zeemui.com/img/zeemui_logo_green.svg" 
              alt="Zeemui Logo" 
              className="h-10 w-auto mr-2"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-custom-green transition-colors">HOME</Link>
            <Link to="/properties" className="text-gray-800 hover:text-custom-green transition-colors">PROPERTIES</Link>
            <Link to="/blog/buyers-guide" className="text-gray-800 hover:text-custom-green transition-colors">BUYERS GUIDE</Link>
            <Link to="/about" className="text-gray-800 hover:text-custom-green transition-colors">ABOUT</Link>
            <Link to="/contact" className="text-gray-800 hover:text-custom-green transition-colors">CONTACT</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="mt-4 pb-4 space-y-3 md:hidden">
            <Link 
              to="/" 
              className="block text-gray-800 hover:text-custom-green transition-colors"
              onClick={() => setIsOpen(false)}
            >
              HOME
            </Link>
            <Link 
              to="/properties" 
              className="block text-gray-800 hover:text-custom-green transition-colors"
              onClick={() => setIsOpen(false)}
            >
              PROPERTIES
            </Link>
            <Link 
              to="/blog" 
              className="block text-gray-800 hover:text-custom-green transition-colors"
              onClick={() => setIsOpen(false)}
            >
              BLOG
            </Link>
            <Link 
              to="/blog/buyers-guide" 
              className="block text-gray-800 hover:text-custom-green transition-colors"
              onClick={() => setIsOpen(false)}
            >
              BUYERS GUIDE
            </Link>
            <Link 
              to="/about" 
              className="block text-gray-800 hover:text-custom-green transition-colors"
              onClick={() => setIsOpen(false)}
            >
              ABOUT
            </Link>
            <Link 
              to="/contact" 
              className="block text-gray-800 hover:text-custom-green transition-colors"
              onClick={() => setIsOpen(false)}
            >
              CONTACT
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;