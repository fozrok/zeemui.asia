import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Facebook, Instagram, Linkedin, Settings } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="https://res.cloudinary.com/dhxriuzu5/image/upload/v1741727697/zeemui_logo-sand_jnqs5s.png" 
                alt="Zeemui Logo" 
                className="h-10 w-auto mr-2"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Zeemui offers a bespoke collection of luxury properties in Koh Samui's most sought-after locations.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/zeemui" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/zeemuirealestate/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/zanette-cross-099451227/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-400 hover:text-white transition-colors">Properties</Link>
              </li>
              <li>
                <Link to="/blog/buyers-guide" className="text-gray-400 hover:text-white transition-colors">Buyers Guide</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone size={20} className="text-custom-green mr-2 flex-shrink-0" />
                <a href="tel:+660620492980" className="text-gray-400 hover:text-white transition-colors">+66(0)620492980</a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-custom-green mr-2 flex-shrink-0" />
                <a href="mailto:info@zeemui.asia" className="text-gray-400 hover:text-white transition-colors">info@zeemui.asia</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p className="flex items-center justify-center">
            &copy; {new Date().getFullYear()} Zeemui. All rights reserved.
            <Link to="/admin/login" className="ml-2 text-gray-500 hover:text-custom-green transition-colors" aria-label="Admin Login">
              <Settings size={14} />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;