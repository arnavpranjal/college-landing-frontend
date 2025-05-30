// src/components/CampusLifeSection.tsx
import React from 'react';
import Image from 'next/image';
import { Zap, BookOpen, Home, Users } from 'lucide-react'; // Example icons

interface CampusFeature {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  icon: React.ElementType;
}

interface CampusLifeSectionProps {
  collegeName: string;
}

const CampusLifeSection: React.FC<CampusLifeSectionProps> = ({ collegeName }) => {
  // Dynamic campus features data based on college name
  const campusFeaturesData: CampusFeature[] = [
    {
      id: 'cl1',
      title: 'State-of-the-Art Library',
      description: 'Access a vast collection of books, journals, and digital resources in a modern, quiet study environment.',
      imageUrl: `/${collegeName}/campuslife/library.png`,
      icon: BookOpen,
    },
    {
      id: 'cl2',
      title: 'Vibrant Sports Culture',
      description: 'Engage in various sports with excellent facilities for cricket, football, basketball, and indoor games.',
      imageUrl: `/${collegeName}/campuslife/sports.png`,
      icon: Zap, // Using Zap for energy/sports
    },
    {
      id: 'cl3',
      title: 'Comfortable Hostel Life',
      description: 'Well-maintained and secure hostels with all necessary amenities, creating a home away from home.',
      imageUrl: `/${collegeName}/campuslife/hostel.png`,
      icon: Home,
    },
    {
      id: 'cl4',
      title: 'Student Clubs & Events',
      description: 'Join diverse student-run clubs (tech, cultural, social) and participate in year-round exciting events and fests.',
      imageUrl: `/${collegeName}/campuslife/extra.png`,
      icon: Users,
    },
  ];

  return (
    <section id="campus-life" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 mb-4">
            Experience Campus Life
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            More than just academics, our campus offers a vibrant and enriching environment for holistic development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {campusFeaturesData.map((feature, index) => (
            <div 
              key={feature.id} 
              className={`bg-slate-50 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl group ${
                index % 2 !== 0 ? 'md:mt-8' : ''
              }`}
            >
              <div className="relative w-full h-64 md:h-72">
                <Image
                  src={feature.imageUrl}
                  alt={feature.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-3">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-blue-600 mr-3" />
                  <h3 className="text-base sm:text-lg md:text-2xl font-semibold text-blue-700">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampusLifeSection;