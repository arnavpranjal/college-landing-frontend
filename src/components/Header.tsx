// src/components/Header.tsx
import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-100 p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          CollegeLogo
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="#programs" className="hover:text-blue-500">Programs</Link></li>
          <li><Link href="#recruiters" className="hover:text-blue-500">Recruiters</Link></li>
          <li><Link href="#about" className="hover:text-blue-500">About</Link></li>
          <li><Link href="#contact" className="hover:text-blue-500 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">Register</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;