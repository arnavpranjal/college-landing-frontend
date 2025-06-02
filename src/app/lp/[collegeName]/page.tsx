// src/app/lp/[collegeName]/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProgramsOffered from '@/components/ProgramsOffered';
import RecruitersSection from '@/components/RecruitersSection';
import CampusLifeSection from '@/components/CampusLifeSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import RegistrationDialog from '@/components/RegistrationDialog';
import Footer from '@/components/Footer';

// Loading Component
const PageLoader = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center z-50">
    <div className="text-center">
      {/* Animated Logo/Icon */}
      <div className="mb-8">
        <div className="w-20 h-20 mx-auto mb-4 relative">
          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
          <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center animate-bounce">
            <svg className="w-10 h-10 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 12 12;10 12 12;-10 12 12;0 12 12"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Loading Text */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Loading Your Experience
      </h2>
      <p className="text-white/80 text-lg mb-8">
        Preparing something amazing for you...
      </p>
      
      {/* Floating Book Elements */}
      <div className="absolute top-20 left-20 w-6 h-6 text-white/30 animate-bounce">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <div className="absolute top-40 right-32 w-5 h-5 text-white/20 animate-bounce delay-300">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <div className="absolute bottom-32 left-32 w-4 h-4 text-white/40 animate-bounce delay-700">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-20 w-7 h-7 text-white/25 animate-bounce delay-500">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
    </div>
  </div>
);

// Simple redirect loading component
const RedirectLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Redirecting...</p>
    </div>
  </div>
);

export default function HomePage() {
  const params = useParams();
  const router = useRouter();
  const collegeName = params.collegeName as string;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isValidCollege, setIsValidCollege] = useState<boolean | null>(null);

  // Validate college name against collegeNames.json
  useEffect(() => {
    const validateCollege = async () => {
      try {
        const response = await fetch('/collegeNames.json');
        if (!response.ok) {
          console.error('Failed to fetch collegeNames.json');
          router.replace('/');
          return;
        }
        
        const collegeNames = await response.json();
        
        // Check if the college name exists in the JSON file
        if (collegeNames[collegeName]) {
          setIsValidCollege(true);
        } else {
          console.warn(`College name "${collegeName}" not found in collegeNames.json`);
          router.replace('/');
          return;
        }
      } catch (error) {
        console.error('Error validating college name:', error);
        router.replace('/');
      }
    };

    if (collegeName) {
      validateCollege();
    } else {
      router.replace('/');
    }
  }, [collegeName, router]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleImageLoaded = () => {
    // Add a small delay for smooth transition
    setTimeout(() => {
      setPageLoading(false);
    }, 500);
  };

  // Show redirect loader while validating college name
  if (isValidCollege === null) {
    return <RedirectLoader />;
  }

  // If college is not valid, show redirect loader (useEffect will handle redirect)
  if (isValidCollege === false) {
    return <RedirectLoader />;
  }

  return (
    <>
      {pageLoading && <PageLoader />}
      
      <div className={`transition-opacity duration-500 ${pageLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header onRegisterClick={handleOpenDialog} collegeName={collegeName} />
        <HeroSection collegeName={collegeName} onImageLoaded={handleImageLoaded} />
        <ProgramsOffered onApplyClick={handleOpenDialog} collegeName={collegeName} />
        <RecruitersSection collegeName={collegeName} />
        <CampusLifeSection collegeName={collegeName} />
        <WhyChooseUsSection collegeName={collegeName} />
        <TestimonialsSection collegeName={collegeName} />
       

        <RegistrationDialog 
          isOpen={isDialogOpen} 
          onClose={handleCloseDialog}
          collegeName={collegeName}
        />
        
        <Footer />
      </div>
    </>
  );
} 