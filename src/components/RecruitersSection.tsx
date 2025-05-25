// src/components/RecruitersSection.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Recruiter {
  id: string;
  name: string;
  logoUrl: string;
}

const recruitersData: Recruiter[] = [
  { id: 'r1', name: 'Tech Solutions Inc.', logoUrl: '/images/recruiters/logo1.svg' },
  { id: 'r2', name: 'Innovate Corp', logoUrl: '/images/recruiters/logo2.png' },
  { id: 'r3', name: 'Global Ventures', logoUrl: '/images/recruiters/logo3.svg' },
  { id: 'r4', name: 'Future Systems', logoUrl: '/images/recruiters/logo4.png' },
  { id: 'r5', name: 'Eco World', logoUrl: '/images/recruiters/logo5.png' },
  { id: 'r6', name: 'Data Insights', logoUrl: '/images/recruiters/logo6.png' },
  { id: 'r7', name: 'Alpha Group', logoUrl: '/images/recruiters/logo1.svg' },
  { id: 'r8', name: 'Beta Corporation', logoUrl: '/images/recruiters/logo2.png' },
];

const RecruitersSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentDot, setCurrentDot] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const itemsPerView = 3; // Number of items visible at once on mobile
  const totalDots = Math.ceil(recruitersData.length / itemsPerView);

  // Create multiple copies for seamless infinite scroll
  const infiniteRecruiters = [
    ...recruitersData,
    ...recruitersData,
    ...recruitersData,
    ...recruitersData
  ];

  const scrollToDot = (dotIndex: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = 128 + 16; // w-32 (128px) + space-x-4 (16px)
      const scrollPosition = dotIndex * itemsPerView * itemWidth;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentDot(dotIndex);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = 128 + 16;
      const scrollPosition = container.scrollLeft;
      const newDot = Math.round(scrollPosition / (itemsPerView * itemWidth));
      setCurrentDot(Math.min(newDot, totalDots - 1));
    }
  };

  return (
    <>
      <section id="recruiters" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Valued Recruiters
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Showcasing some of the esteemed organizations that recruit our talented graduates.
            </p>
          </div>

          {/* Desktop View - Infinite Scroll Animation */}
          <div className="hidden md:block">
            <div 
              className="relative overflow-hidden h-24"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                className={`flex items-center h-full ${isPaused ? 'animation-paused' : 'animate-infinite-scroll'}`}
                style={{
                  width: `${infiniteRecruiters.length * 200}px`, // Each logo takes 200px width
                }}
              >
                {infiniteRecruiters.map((recruiter, index) => (
                  <div
                    key={`${recruiter.id}-${index}`}
                    className="flex-shrink-0 flex items-center justify-center px-8"
                    style={{ width: '200px' }}
                  >
                    <div className="relative w-32 h-16 flex items-center justify-center">
                      <Image
                        src={recruiter.logoUrl}
                        alt={`${recruiter.name} logo`}
                        fill
                        className="object-contain"
                        sizes="128px"
                        onError={(e) => {
                          // Fallback: create a text-based logo
                          const target = e.target as HTMLImageElement;
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-bold text-sm">
                                ${recruiter.name.split(' ').map(word => word[0]).join('')}
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile View - Horizontal Scroll */}
          <div className="md:hidden">
            <div className="mb-4">
              <p className="text-xs sm:text-sm text-gray-500 text-center">
                Swipe to see more recruiters →
              </p>
            </div>
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-4 space-x-4 snap-x snap-mandatory mobile-scroll-container"
              onScroll={handleScroll}
            >
              {recruitersData.map((recruiter) => (
                <div
                  key={recruiter.id}
                  className="flex-shrink-0 snap-start w-32 h-20 flex items-center justify-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="relative w-24 h-12 flex items-center justify-center">
                    <Image
                      src={recruiter.logoUrl}
                      alt={`${recruiter.name} logo`}
                      fill
                      className="object-contain"
                      sizes="96px"
                      onError={(e) => {
                        // Fallback for mobile
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-bold text-xs">
                              ${recruiter.name.split(' ').map(word => word[0]).join('')}
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
              {/* Add a few more items to show there's more content */}
              {recruitersData.slice(0, 3).map((recruiter, index) => (
                <div
                  key={`extra-${recruiter.id}-${index}`}
                  className="flex-shrink-0 snap-start w-32 h-20 flex items-center justify-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="relative w-24 h-12 flex items-center justify-center">
                    <Image
                      src={recruiter.logoUrl}
                      alt={`${recruiter.name} logo`}
                      fill
                      className="object-contain"
                      sizes="96px"
                      onError={(e) => {
                        // Fallback for mobile
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-bold text-xs">
                              ${recruiter.name.split(' ').map(word => word[0]).join('')}
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile scroll indicator dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalDots }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToDot(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    currentDot === index 
                      ? 'bg-blue-500' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Scroll to recruiter group ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global CSS Styles */}
      <style jsx global>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${recruitersData.length * 200}px);
          }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 30s linear infinite;
        }

        .animation-paused {
          animation-play-state: paused;
        }

        /* Mobile scrollbar styling */
        .mobile-scroll-container {
          scrollbar-width: thin;
          scrollbar-color: #93c5fd #f3f4f6;
        }

        .mobile-scroll-container::-webkit-scrollbar {
          height: 6px;
        }
        
        .mobile-scroll-container::-webkit-scrollbar-track {
          background-color: #f3f4f6;
          border-radius: 9999px;
        }
        
        .mobile-scroll-container::-webkit-scrollbar-thumb {
          background-color: #93c5fd;
          border-radius: 9999px;
        }
        
        .mobile-scroll-container::-webkit-scrollbar-thumb:hover {
          background-color: #60a5fa;
        }

        /* Hide scrollbar on mobile if needed */
        @media (max-width: 768px) {
          .mobile-scroll-container {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .mobile-scroll-container::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default RecruitersSection;