// src/app/page.tsx
"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection'; // Import HeroSection
import ProgramsOffered from '@/components/ProgramsOffered'; // Import ProgramsOffered
import RecruitersSection from '@/components/RecruitersSection'; // Import RecruitersSection
import EligibilityCriteria from '@/components/EligibilityCriteria'; // Import EligibilityCriteria
import CampusLifeSection from '@/components/CampusLifeSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import RegistrationDialog from '@/components/RegistrationDialog';

export default function HomePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <> {/* Use a Fragment as we'll have multiple top-level sections */}
      <Header onRegisterClick={handleOpenDialog} />
      <HeroSection onApplyNowClick={handleOpenDialog} />
      <ProgramsOffered onApplyClick={handleOpenDialog} />
      <RecruitersSection />
      <EligibilityCriteria onEnquireClick={handleOpenDialog} />
      <CampusLifeSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <div className="container mx-auto px-4 py-8"> {/* Existing container for other content */}
        <h1 className="text-3xl font-bold text-center my-8">
          Explore More About Our College
        </h1>
        <p className="text-center text-lg">
          Further details about programs, campus life, etc., will follow.
        </p>
        {/* Other sections will be added here */}
      </div>

      <RegistrationDialog 
        isOpen={isDialogOpen} 
        onClose={handleCloseDialog}
      />
    </>
  );
}