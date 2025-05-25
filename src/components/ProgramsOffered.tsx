// src/components/ProgramsOffered.tsx
"use client";
import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';

interface Program {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  details?: string[];
}

const programsData: Program[] = [
  // Using 6 programs for a good scroll test (same data as before)
  { id: 'cs', title: 'B.Tech in Computer Science', description: 'Algorithms, AI, software dev.', imageUrl: '/images/programs/cs.jpg', details: ['AI/ML focus', 'Labs', 'Internships'] },
  { id: 'bba', title: 'Bachelor of Business Admin', description: 'Leadership & business acumen.', imageUrl: '/images/programs/bba.jpg', details: ['Case-studies', 'E-cell', 'Global immersion'] },
  { id: 'mech', title: 'B.Tech in Mechanical Eng.', description: 'Robotics, automotive, thermo.', imageUrl: '/images/programs/mech.jpg', details: ['Workshops', 'Robotics club', 'Sustainability'] },
  { id: 'design', title: 'Bachelor of Design (B.Des)', description: 'Graphic design, UX/UI, product.', imageUrl: '/images/programs/design.jpg', details: ['Portfolio', 'Software', 'Studio env.'] },
  { id: 'arts', title: 'Bachelor of Arts (BA)', description: 'Humanities, social sciences.', imageUrl: '/images/programs/arts.jpg', details: ['Diverse subjects', 'Research', 'Cultural studies'] },
  { id: 'ecomm', title: 'M.Sc. E-commerce Tech', description: 'Online business & tech solutions.', imageUrl: '/images/programs/ecommerce.jpg', details: ['Digital marketing', 'Platform dev', 'Analytics'] },
];

interface ProgramsOfferedProps {
  onApplyClick: () => void;
}

const ProgramsOffered: React.FC<ProgramsOfferedProps> = ({ onApplyClick }) => {
  return (
    <section id="programs" className="py-16 md:py-24 bg-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 mb-4">
            Explore Our Programmes
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            We offer a diverse range of programmes designed to equip you for a successful career.
          </p>
        </div>

        {/* Horizontal scroll container with custom scrollbar styles */}
        <div 
          className="flex overflow-x-auto pb-8 space-x-6 snap-x snap-mandatory
                     scrollbar scrollbar-thin scrollbar-track-slate-200 
                     scrollbar-thumb-blue-600 hover:scrollbar-thumb-blue-700
                     scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
        >
          {programsData.map((program) => (
            <div
              key={program.id}
              className="snap-start flex-shrink-0 w-[calc(100vw-4rem)] sm:w-72 md:w-80 lg:w-80 xl:w-80 group" // Added 'group' for group-hover
            >
              <Card 
                className="flex flex-col h-full shadow-lg 
                           transition-all duration-300 ease-in-out 
                           hover:shadow-2xl group-hover:scale-105" // Enhanced hover animation
              >
                <div className="relative w-full h-40 sm:h-48 overflow-hidden rounded-t-lg"> {/* overflow-hidden for image zoom effect */}
                  <Image
                    src={program.imageUrl}
                    alt={program.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg transition-transform duration-300 ease-in-out group-hover:scale-110" // Image zoom on hover
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 320px, 320px"
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm sm:text-base md:text-lg text-blue-700 line-clamp-2">
                    {program.title}
                  </CardTitle>
                  <CardDescription className="pt-1 text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3 h-10 sm:h-16">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-grow">
                  {program.details && program.details.length > 0 && (
                    <ul className="space-y-1 mt-1 list-disc list-inside text-gray-500 text-xs sm:text-sm">
                      {program.details.slice(0, 2).map((detail, index) => (
                        <li key={index} className="line-clamp-1">{detail}</li>
                      ))}
                    </ul>
                  )}
                </CardContent>
                <CardFooter className="p-4 pt-2">
                  <Button
                    variant="outline"
                    className="w-full mt-auto border-blue-600 text-blue-600 
                               hover:bg-blue-600 hover:text-white 
                               transition-colors duration-300 text-sm" // Adjusted hover for button
                    onClick={onApplyClick}
                  >
                    Learn More & Apply
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsOffered;