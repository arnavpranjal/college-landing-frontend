// src/components/EligibilityCriteria.tsx
"use client";
import React from 'react';
import { CheckSquare, GraduationCap } from 'lucide-react'; // Using suitable icons
import { Button } from "@/components/ui/button"; // For the CTA

interface CriteriaDetail {
  id: string;
  text: string;
}

interface ProgramEligibility {
  level: 'Undergraduate (UG)' | 'Postgraduate (PG)';
  icon: React.ElementType;
  generalIntro: string;
  criteria: CriteriaDetail[];
  additionalNotes?: string;
}

// Sample eligibility data - replace with actual college criteria
const eligibilityData: ProgramEligibility[] = [
  {
    level: 'Undergraduate (UG)',
    icon: GraduationCap, // Or another relevant icon for UG
    generalIntro: 'To be eligible for our undergraduate programmes, candidates generally need to meet the following:',
    criteria: [
      { id: 'ug1', text: 'Successfully completed Higher Secondary Education (10+2) or an equivalent examination from a recognized national or state board.' },
      { id: 'ug2', text: 'Achieved a minimum aggregate score of 50% in the qualifying examination (specific B.Tech programs may require 60% in PCM).' },
      { id: 'ug3', text: 'For B.Tech Programmes: Physics, Chemistry, and Mathematics (PCM) are mandatory subjects in 10+2.' },
      { id: 'ug4', text: 'For other UG Programmes (BBA, B.Com, B.Des, BA): Relevant subject combinations may be preferred; check specific program details.' },
      { id: 'ug5', text: 'Appeared for and obtained a valid score in the [College Name] Entrance Test (CNET-UG) or other specified national/state level entrance exams (e.g., JEE Main for certain B.Tech seats).' },
    ],
    additionalNotes: 'Age limits may apply as per university guidelines. Some programs may have specific subject prerequisites or additional selection rounds like interviews or portfolio reviews.'
  },
  {
    level: 'Postgraduate (PG)',
    icon: GraduationCap, // Or another relevant icon for PG
    generalIntro: 'For admission to our postgraduate programmes, the general eligibility criteria include:',
    criteria: [
      { id: 'pg1', text: 'A Bachelor\'s degree in a relevant discipline from a recognized university with a minimum of 50% aggregate marks or equivalent CGPA.' },
      { id: 'pg2', text: 'For MBA Programmes: A valid score in CAT/MAT/XAT/CMAT or [College Name] Entrance Test (CNET-PG).' },
      { id: 'pg3', text: 'For M.Tech Programmes: A B.E./B.Tech degree in a relevant engineering discipline and often a valid GATE score or performance in CNET-PG (M.Tech).' },
      { id: 'pg4', text: 'Some PG programs may require prior work experience; refer to specific program brochures for details.' },
    ],
    additionalNotes: 'Candidates in their final year of their Bachelor\'s degree may also apply, provided they can submit their final mark sheets by the stipulated deadline.'
  }
];

interface EligibilityCriteriaProps {
  onEnquireClick: () => void;
}

const EligibilityCriteria: React.FC<EligibilityCriteriaProps> = ({ onEnquireClick }) => {
  return (
    <section id="eligibility" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 mb-4">
            Admission Eligibility Criteria
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Find out the essential qualifications needed to join our esteemed undergraduate and postgraduate programmes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {eligibilityData.map((programType) => (
            <div key={programType.level} className="p-6 md:p-8 bg-white rounded-xl shadow-lg h-full flex flex-col">
              <div className="flex items-center mb-6">
                <programType.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-600 mr-4" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-700">{programType.level} Programmes</h3>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-6">{programType.generalIntro}</p>
              
              <ul className="space-y-4 mb-6 flex-grow">
                {programType.criteria.map((item) => (
                  <li key={item.id} className="flex items-start">
                    <CheckSquare className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-3 mt-1" />
                    <span className="text-xs sm:text-sm md:text-base text-gray-700">{item.text}</span>
                  </li>
                ))}
              </ul>
              {programType.additionalNotes && (
                <p className="text-xs sm:text-sm text-gray-500 border-t border-slate-200 pt-4 mt-auto">
                  <strong>Note:</strong> {programType.additionalNotes}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4">
            The criteria mentioned are general. For detailed and updated information specific to courses, always refer to the latest official admissions brochure or contact the admissions office.
          </p>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm md:text-lg px-3 sm:px-4 md:px-8 py-2 sm:py-3 w-auto min-w-fit"
            onClick={onEnquireClick}
          >
            Enquire for Detailed Prospectus
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EligibilityCriteria;