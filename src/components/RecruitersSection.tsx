// src/components/RecruitersSection.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Recruiter {
  id: string;
  name: string;
  logoUrl: string;
}

interface RecruitersProps {
  collegeName: string;
}

const RecruitersSection: React.FC<RecruitersProps> = ({ collegeName }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentDot, setCurrentDot] = useState(0);
  const [recruitersData, setRecruitersData] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const itemsPerView = 3; // Number of items visible at once on mobile

  // Function to check if an image exists
  const checkImageExists = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new (window as any).Image() as HTMLImageElement;
      const timeout = setTimeout(() => {
        resolve(false);
      }, 2000); // 2 second timeout
      
      img.onload = () => {
        clearTimeout(timeout);
        resolve(true);
      };
      img.onerror = () => {
        clearTimeout(timeout);
        resolve(false);
      };
      img.src = url;
    });
  };

  // Load recruiters dynamically
  useEffect(() => {
    const loadRecruiters = async () => {
      try {
        setLoading(true);
        const recruiters: Recruiter[] = [];
        
        // Try to load recruiter images from recruiter1.svg to recruiter20.svg (or until we find none)
        for (let i = 1; i <= 20; i++) {
          const logoUrl = `/${collegeName}/recruiters/recruiter${i}.svg`;
          const exists = await checkImageExists(logoUrl);
          
          if (exists) {
            recruiters.push({
              id: `r${i}`,
              name: `Recruiter ${i}`, // You can customize this or load from a separate config
              logoUrl
            });
          } else {
            // If we don't find recruiter{i}.svg, try recruiter{i}.png as fallback
            const pngLogoUrl = `/${collegeName}/recruiters/recruiter${i}.png`;
            const pngExists = await checkImageExists(pngLogoUrl);
            
            if (pngExists) {
              recruiters.push({
                id: `r${i}`,
                name: `Recruiter ${i}`,
                logoUrl: pngLogoUrl
              });
            }
          }
          
          // If we haven't found any recruiters in the last 3 attempts, stop looking
          if (i > 3 && recruiters.length === 0) {
            break;
          }
          
          // If we found some recruiters but haven't found any in the last 3, stop looking
          if (i > recruiters.length + 3 && recruiters.length > 0) {
            break;
          }
        }
        
        if (recruiters.length === 0) {
          // Fallback recruiters if no images found
          setRecruitersData([
            { id: 'r1', name: 'Tech Solutions Inc.', logoUrl: '' },
            { id: 'r2', name: 'Innovate Corp', logoUrl: '' },
            { id: 'r3', name: 'Global Ventures', logoUrl: '' },
            { id: 'r4', name: 'Future Systems', logoUrl: '' },
          ]);
        } else {
          setRecruitersData(recruiters);
        }
        
      } catch (error) {
        console.error('Error loading recruiters:', error);
        // Fallback recruiters on error
        setRecruitersData([
          { id: 'r1', name: 'Tech Solutions Inc.', logoUrl: '' },
          { id: 'r2', name: 'Innovate Corp', logoUrl: '' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (collegeName) {
      loadRecruiters();
    }
  }, [collegeName]);

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

  if (loading) {
    return (
      <section id="recruiters" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Valued Recruiters
            </h2>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="animate-pulse">
              <div className="h-20 bg-gray-200 rounded w-full max-w-4xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
                      {recruiter.logoUrl ? (
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
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-bold text-sm">
                          {recruiter.name.split(' ').map(word => word[0]).join('')}
                        </div>
                      )}
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
                    {recruiter.logoUrl ? (
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
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-bold text-xs">
                        {recruiter.name.split(' ').map(word => word[0]).join('')}
                      </div>
                    )}
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