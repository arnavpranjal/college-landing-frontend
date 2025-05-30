// src/components/Header.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onRegisterClick: () => void;
  collegeName: string;
}

const Header: React.FC<HeaderProps> = ({ onRegisterClick, collegeName }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Logo styling configuration for different colleges/logo types
  const getLogoStyle = (collegeName: string) => {
    // You can configure specific styles for different colleges
    const logoConfigs = {
      // For colleges with white logos
      college1: {
        background: "bg-gradient-to-r from-gray-800 to-gray-900",
        border: "border-gray-700",
        shadow: "shadow-md"
      },
      brindavan: {
        background: "bg-gradient-to-r from-gray-800 to-gray-900",
        border: "border-gray-700",
        shadow: "shadow-md"
      },
      college2: {
        background: "bg-gradient-to-r from-gray-50 to-gray-100", 
        border: "border-gray-200",
        shadow: "shadow-sm"
      },
      // Default for unknown colleges
      default: {
        background: "bg-gradient-to-r from-gray-100 to-gray-200",
        border: "border-gray-300", 
        shadow: "shadow-sm"
      }
    };

    return logoConfigs[collegeName as keyof typeof logoConfigs] || logoConfigs.default;
  };

  const logoStyle = getLogoStyle(collegeName);

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
    <header className="bg-white p-2 md:p-4 border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href={`/lp/${collegeName}`} className="flex items-center">
          <div className={`${logoStyle.background} ${logoStyle.border} ${logoStyle.shadow} p-1 px-2 md:p-2 md:px-3 rounded-md border hover:shadow-md transition-all duration-200`}>
            <Image
              src={`/${collegeName}/logo/logo.png`}
              alt="College Logo"
              width={150}
              height={40}
              className="h-6 md:h-8 lg:h-10 w-auto"
              priority
              style={{
                filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))'
              }}
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-4 items-center">
          <li><Link href="#programs" className="text-sm md:text-base hover:text-blue-500 transition-colors">Programs</Link></li>
          <li><Link href="#recruiters" className="text-sm md:text-base hover:text-blue-500 transition-colors">Recruiters</Link></li>
          {/* <li><Link href="#eligibility" className="text-sm md:text-base hover:text-blue-500 transition-colors">Eligibility</Link></li> */}
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
          className="md:hidden p-1.5 rounded-md hover:bg-gray-200 transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-gray-600" />
          ) : (
            <Menu className="h-5 w-5 text-gray-600" />
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