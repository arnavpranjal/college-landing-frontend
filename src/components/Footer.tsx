// src/components/Footer.tsx
import React from 'react';
import ClientSafeDate from './ClientSafeDate';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
      <div className="container mx-auto">
        <p className="text-xs sm:text-sm">© <ClientSafeDate /> Your College Name. All rights reserved.</p>
        <p className="text-xs sm:text-sm">
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a> | 
          <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;