// src/components/WhyChooseUsSection.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Award, Users, Lightbulb, BookOpenText, TrendingUp, ShieldCheck } from 'lucide-react'; // Example icons

interface USP {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

interface WhyChooseUsSectionProps {
  collegeName: string;
}

// Sample Unique Selling Propositions - replace with actual college USPs
const uspData: USP[] = [
  {
    id: 'usp1',
    title: 'Experienced & Dedicated Faculty',
    description: 'Learn from seasoned academics and industry experts committed to your success and mentorship.',
    icon: Users,
  },
  {
    id: 'usp2',
    title: 'Industry-Relevant Curriculum',
    description: 'Our programs are constantly updated to meet current industry demands and future trends.',
    icon: BookOpenText,
  },
  {
    id: 'usp3',
    title: 'Excellent Placement Record',
    description: 'Benefit from our strong industry connections and dedicated placement cell for great career opportunities.',
    icon: Award,
  },
  {
    id: 'usp4',
    title: 'Focus on Innovation & Research',
    description: 'Engage in cutting-edge research projects and foster a spirit of innovation and entrepreneurship.',
    icon: Lightbulb,
  },
  {
    id: 'usp5',
    title: 'Holistic Student Development',
    description: 'We emphasize not just academics but also personal growth, leadership skills, and extracurricular activities.',
    icon: TrendingUp,
  },
  {
    id: 'usp6',
    title: 'Safe & Supportive Environment',
    description: 'A secure, inclusive, and supportive campus that nurtures learning and well-being.',
    icon: ShieldCheck,
  },
];

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ collegeName }) => {
  const [collegeDisplayName, setCollegeDisplayName] = useState<string>('Our College');

  // Load college display name
  useEffect(() => {
    const loadCollegeName = async () => {
      try {
        const response = await fetch('/collegeNames.json');
        if (response.ok) {
          const collegeNames = await response.json();
          setCollegeDisplayName(collegeNames[collegeName] || collegeNames.default || 'Our College');
        }
      } catch (error) {
        console.warn('Error loading college names:', error);
        setCollegeDisplayName('Our College');
      }
    };

    if (collegeName) {
      loadCollegeName();
    }
  }, [collegeName]);

  return (
    <section id="why-choose-us" className="py-16 md:py-24 bg-slate-100"> {/* Light background for contrast */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose {collegeDisplayName}?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the distinct advantages that make our institution the ideal choice for your higher education journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {uspData.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 group"
            >
              <div className="flex justify-center items-center mb-5 w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 text-center mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-600 text-center text-xs sm:text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;