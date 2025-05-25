// src/components/Header.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onRegisterClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRegisterClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleRegisterClick = () => {
    onRegisterClick();
    closeMobileMenu();
  };

  return (
    <header className="bg-white p-4 border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg md:text-2xl font-bold text-blue-600">
          CollegeLogo
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-4 items-center">
          <li><Link href="#programs" className="text-sm md:text-base hover:text-blue-500 transition-colors">Programs</Link></li>
          <li><Link href="#recruiters" className="text-sm md:text-base hover:text-blue-500 transition-colors">Recruiters</Link></li>
          <li><Link href="#eligibility" className="text-sm md:text-base hover:text-blue-500 transition-colors">Eligibility</Link></li>
          <li><Link href="#campus-life" className="text-sm md:text-base hover:text-blue-500 transition-colors">Campus Life</Link></li>
          <li><Link href="#why-choose-us" className="text-sm md:text-base hover:text-blue-500 transition-colors">Why Choose Us</Link></li>
          <li><Link href="#testimonials" className="text-sm md:text-base hover:text-blue-500 transition-colors">Testimonials</Link></li>
          <li>
            <Button 
              onClick={onRegisterClick}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] text-sm"
            >
              Register
            </Button>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-200 transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-[9999] transition-all duration-300 ease-in-out ${
        isMobileMenuOpen 
          ? 'opacity-100 translate-y-0 visible' 
          : 'opacity-0 -translate-y-2 invisible'
      }`}>
        <ul className="flex flex-col py-4">
            <li>
              <Link 
                href="#programs" 
                className="block px-6 py-3 text-sm hover:bg-gray-50 hover:text-blue-500 transition-colors"
                onClick={closeMobileMenu}
              >
                Programs
              </Link>
            </li>
            <li>
              <Link 
                href="#recruiters" 
                className="block px-6 py-3 text-sm hover:bg-gray-50 hover:text-blue-500 transition-colors"
                onClick={closeMobileMenu}
              >
                Recruiters
              </Link>
            </li>
            <li>
              <Link 
                href="#eligibility" 
                className="block px-6 py-3 text-sm hover:bg-gray-50 hover:text-blue-500 transition-colors"
                onClick={closeMobileMenu}
              >
                Eligibility
              </Link>
            </li>
            <li>
              <Link 
                href="#campus-life" 
                className="block px-6 py-3 text-sm hover:bg-gray-50 hover:text-blue-500 transition-colors"
                onClick={closeMobileMenu}
              >
                Campus Life
              </Link>
            </li>
            <li>
              <Link 
                href="#why-choose-us" 
                className="block px-6 py-3 text-sm hover:bg-gray-50 hover:text-blue-500 transition-colors"
                onClick={closeMobileMenu}
              >
                Why Choose Us
              </Link>
            </li>
            <li>
              <Link 
                href="#testimonials" 
                className="block px-6 py-3 text-sm hover:bg-gray-50 hover:text-blue-500 transition-colors"
                onClick={closeMobileMenu}
              >
                Testimonials
              </Link>
            </li>
            <li className="px-6 py-3">
              <Button 
                onClick={handleRegisterClick}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] text-sm"
              >
                Register
              </Button>
            </li>
          </ul>
        </div>
    </header>
  );
};

export default Header;