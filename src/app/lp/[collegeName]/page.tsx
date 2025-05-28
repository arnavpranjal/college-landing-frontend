// src/app/lp/[collegeName]/page.tsx
"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProgramsOffered from '@/components/ProgramsOffered';
import RecruitersSection from '@/components/RecruitersSection';
import EligibilityCriteria from '@/components/EligibilityCriteria';
import CampusLifeSection from '@/components/CampusLifeSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import RegistrationDialog from '@/components/RegistrationDialog';

// Loading Component
const PageLoader = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center z-50">
    <div className="text-center">
      {/* Animated Logo/Icon */}
      <div className="mb-8">
        <div className="w-20 h-20 mx-auto mb-4 relative">
          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
          <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
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
      
      {/* Loading Bar */}
      <div className="w-64 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
        <div className="h-full bg-white rounded-full animate-pulse"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-white/30 rounded-full animate-bounce"></div>
      <div className="absolute top-40 right-32 w-6 h-6 bg-white/20 rounded-full animate-bounce delay-300"></div>
      <div className="absolute bottom-32 left-32 w-3 h-3 bg-white/40 rounded-full animate-bounce delay-700"></div>
      <div className="absolute bottom-20 right-20 w-5 h-5 bg-white/25 rounded-full animate-bounce delay-500"></div>
    </div>
  </div>
);

export default function HomePage() {
  const params = useParams();
  const collegeName = params.collegeName as string;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // You can now use collegeName to fetch college-specific data or customize content
  // For example: console.log("Current College:", collegeName);

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

  return (
    <>
      {pageLoading && <PageLoader />}
      
      <div className={`transition-opacity duration-500 ${pageLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header onRegisterClick={handleOpenDialog} collegeName={collegeName} />
        <HeroSection collegeName={collegeName} onImageLoaded={handleImageLoaded} />
        <ProgramsOffered onApplyClick={handleOpenDialog} />
        <RecruitersSection />
        <EligibilityCriteria onEnquireClick={handleOpenDialog} />
        <CampusLifeSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center my-8">
            Explore More About Our College
          </h1>
          <p className="text-center text-lg">
            Further details about programs, campus life, etc., will follow.
          </p>
        </div>

        <RegistrationDialog 
          isOpen={isDialogOpen} 
          onClose={handleCloseDialog}
        />
      </div>
    </>
  );
} 