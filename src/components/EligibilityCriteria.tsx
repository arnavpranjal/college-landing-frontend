// src/components/EligibilityCriteria.tsx
"use client";
import React, { useState, useEffect } from 'react';
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

interface EligibilityCriteriaProps {
  onEnquireClick: () => void;
  collegeName: string;
}

const EligibilityCriteria: React.FC<EligibilityCriteriaProps> = ({ onEnquireClick, collegeName }) => {
  const [eligibilityData, setEligibilityData] = useState<ProgramEligibility[]>([]);
  const [loading, setLoading] = useState(true);
  //ok
 //ok
  // Load eligibility data from MD files
  useEffect(() => {
    const loadEligibilityData = async () => {
      try {
        setLoading(true);
        
        // Try to load college-specific eligibility data
        let eligibilityUrl = `/${collegeName}/eligibility.md`;
        let response = await fetch(eligibilityUrl);
        
        // If college-specific file doesn't exist, fall back to default
        if (!response.ok) {
          eligibilityUrl = '/default/eligibility.md';
          response = await fetch(eligibilityUrl);
        }
        
        if (response.ok) {
          const markdownText = await response.text();
          const parsedEligibility = parseMarkdownToEligibility(markdownText);
          setEligibilityData(parsedEligibility);
        } else {
          // Fallback to default data if no files found
          setEligibilityData(getDefaultEligibilityData());
        }
      } catch (error) {
        console.warn('Error loading eligibility data:', error);
        setEligibilityData(getDefaultEligibilityData());
      } finally {
        setLoading(false);
      }
    };

    if (collegeName) {
      loadEligibilityData();
    }
  }, [collegeName]);

  const parseMarkdownToEligibility = (markdown: string): ProgramEligibility[] => {
    const sections = markdown.split('## ').slice(1); // Remove the first empty element
    const eligibility: ProgramEligibility[] = [];

    sections.forEach((section) => {
      const lines = section.trim().split('\n');
      const title = lines[0].trim() as 'Undergraduate (UG)' | 'Postgraduate (PG)';
      
      let generalIntro = '';
      const criteria: CriteriaDetail[] = [];
      let additionalNotes = '';
      
      let currentSection = '';
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('**General Introduction:**')) {
          generalIntro = line.replace('**General Introduction:**', '').trim();
        } else if (line.startsWith('**Criteria:**')) {
          currentSection = 'criteria';
        } else if (line.startsWith('**Additional Notes:**')) {
          currentSection = 'notes';
          additionalNotes = line.replace('**Additional Notes:**', '').trim();
        } else if (line.startsWith('- ') && currentSection === 'criteria') {
          criteria.push({
            id: `criteria-${criteria.length + 1}`,
            text: line.substring(2)
          });
        } else if (currentSection === 'notes' && line && !line.startsWith('**') && !line.startsWith('---')) {
          additionalNotes += (additionalNotes ? ' ' : '') + line;
        } else if (!line.startsWith('**') && !line.startsWith('---') && !line.startsWith('- ') && line.length > 0 && !generalIntro && currentSection !== 'criteria') {
          generalIntro += (generalIntro ? ' ' : '') + line;
        }
      }

      eligibility.push({
        level: title,
        icon: GraduationCap,
        generalIntro,
        criteria,
        additionalNotes
      });
    });

    return eligibility;
  };

  const getDefaultEligibilityData = (): ProgramEligibility[] => {
    return [
      {
        level: 'Undergraduate (UG)',
        icon: GraduationCap,
        generalIntro: 'To be eligible for our undergraduate programmes, candidates generally need to meet the following requirements:',
        criteria: [
          { id: 'ug1', text: 'Successfully completed Higher Secondary Education (10+2) or equivalent examination from a recognized board' },
          { id: 'ug2', text: 'Achieved minimum aggregate score of 50% in the qualifying examination' },
          { id: 'ug3', text: 'Relevant subject combinations as per program requirements' },
          { id: 'ug4', text: 'Valid scores in national/state level entrance examinations or institutional entrance tests' },
          { id: 'ug5', text: 'Age limits as per university/regulatory guidelines' },
        ],
        additionalNotes: 'Age limits may apply as per university guidelines. Some programs may have specific subject prerequisites or additional selection rounds like interviews or portfolio reviews.'
      },
      {
        level: 'Postgraduate (PG)',
        icon: GraduationCap,
        generalIntro: 'For admission to our postgraduate programmes, the general eligibility criteria include:',
        criteria: [
          { id: 'pg1', text: 'Bachelor\'s degree in relevant discipline from a recognized university with minimum 50% aggregate marks' },
          { id: 'pg2', text: 'Valid scores in national level entrance tests (CAT/MAT/XAT/GATE) or institutional entrance tests' },
          { id: 'pg3', text: 'Meeting program-specific requirements and prerequisites' },
          { id: 'pg4', text: 'Some programs may require relevant work experience' },
        ],
        additionalNotes: 'Candidates in their final year of Bachelor\'s degree may apply provisionally. Final admission subject to meeting eligibility criteria and successful completion of qualifying degree.'
      }
    ];
  };

  if (loading) {
    return (
      <section id="eligibility" className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 rounded-xl h-96"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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