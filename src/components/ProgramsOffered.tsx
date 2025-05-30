// src/components/ProgramsOffered.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, FlaskConical, CheckCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';

interface ProgramCategory {
  id: string;
  title: string;
  duration: string;
  description: string;
  keyFeatures: string[];
  popularPrograms: string[];
  icon: React.ElementType;
}

interface ProgramsOfferedProps {
  onApplyClick: () => void;
  collegeName: string;
}

const ProgramsOffered: React.FC<ProgramsOfferedProps> = ({ onApplyClick, collegeName }) => {
  const [programsData, setProgramsData] = useState<ProgramCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgramsData = async () => {
      try {
        setLoading(true);
        
        // Try to load college-specific programs data
        let programsUrl = `/${collegeName}/programs.md`;
        let response = await fetch(programsUrl);
        
        // If college-specific file doesn't exist, fall back to default
        if (!response.ok) {
          programsUrl = '/default/programs.md';
          response = await fetch(programsUrl);
        }
        
        if (response.ok) {
          const markdownText = await response.text();
          const parsedPrograms = parseMarkdownToPrograms(markdownText);
          setProgramsData(parsedPrograms);
        } else {
          // Fallback to default data if no files found
          setProgramsData(getDefaultPrograms());
        }
      } catch (error) {
        console.warn('Error loading programs data:', error);
        setProgramsData(getDefaultPrograms());
      } finally {
        setLoading(false);
      }
    };

    if (collegeName) {
      loadProgramsData();
    }
  }, [collegeName]);

  const parseMarkdownToPrograms = (markdown: string): ProgramCategory[] => {
    const sections = markdown.split('## ').slice(1); // Remove the first empty element
    const programs: ProgramCategory[] = [];

    sections.forEach((section, index) => {
      const lines = section.trim().split('\n');
      const title = lines[0].trim();
      
      let duration = '';
      let description = '';
      let keyFeatures: string[] = [];
      let popularPrograms = '';
      let popularProgramsList: string[] = [];
      
      let currentSection = '';
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('**Duration:**')) {
          duration = line.replace('**Duration:**', '').trim();
        } else if (line.startsWith('**Key Features:**')) {
          currentSection = 'features';
        } else if (line.startsWith('**Popular Programs:**')) {
          currentSection = 'programs';
        } else if (line.startsWith('**Available Areas:**')) {
          currentSection = 'programs';
        } else if (line.startsWith('- ') && currentSection === 'features') {
          keyFeatures.push(line.substring(2));
        } else if (line.startsWith('- ') && currentSection === 'programs') {
          popularProgramsList.push(line.substring(2));
        } else if (currentSection === 'programs' && line && !line.startsWith('**') && !line.startsWith('---') && !line.startsWith('- ')) {
          popularPrograms = line;
        } else if (!line.startsWith('**') && !line.startsWith('---') && !line.startsWith('- ') && line.length > 0 && !description) {
          description = line;
        }
      }

      // If we have a bulleted list, use that; otherwise use the single line
      const finalPopularPrograms = popularProgramsList.length > 0 ? popularProgramsList : [popularPrograms];

      const icons = [GraduationCap, BookOpen, FlaskConical];
      const ids = ['undergraduate', 'postgraduate', 'research'];
      
      programs.push({
        id: ids[index] || `program-${index}`,
        title,
        duration,
        description,
        keyFeatures,
        popularPrograms: finalPopularPrograms,
        icon: icons[index] || GraduationCap
      });
    });

    return programs;
  };

  const getDefaultPrograms = (): ProgramCategory[] => {
    return [
      {
        id: 'undergraduate',
        title: 'Undergraduate Programmes',
        duration: '3-4 Years',
        description: 'Comprehensive foundation programs designed to prepare students for successful careers across various fields.',
        keyFeatures: [
          'Industry-relevant curriculum',
          'Practical learning through projects', 
          'Internship opportunities',
          'Faculty mentorship',
          'Career guidance and placement support'
        ],
        popularPrograms: ['B.Tech', 'BBA', 'B.Com', 'B.Sc.', 'BA', 'B.Design'],
        icon: GraduationCap
      },
      {
        id: 'postgraduate',
        title: 'Postgraduate Programmes',
        duration: '1-2 Years',
        description: 'Advanced programs offering specialized knowledge and skills for career advancement and professional growth.',
        keyFeatures: [
          'Advanced specialized curriculum',
          'Research opportunities',
          'Industry connections',
          'Professional development',
          'Career advancement support'
        ],
        popularPrograms: ['MBA', 'M.Tech', 'M.Sc.', 'M.Com', 'MA'],
        icon: BookOpen
      },
      {
        id: 'research',
        title: 'Research Programmes',
        duration: '3-5 Years',
        description: 'Doctoral and research programs focused on advancing knowledge and innovation through rigorous scholarly work.',
        keyFeatures: [
          'Research facilities and resources',
          'Faculty guidance and mentorship',
          'Conference and publication opportunities',
          'Collaboration with industry and institutions',
          'Research funding support'
        ],
        popularPrograms: ['Ph.D. in Engineering', 'Management', 'Sciences', 'Arts & Humanities'],
        icon: FlaskConical
      }
    ];
  };

  if (loading) {
    return (
      <section id="programs" className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
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
    <section id="programs" className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Explore Our Programmes
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a diverse range of programmes designed to equip you for a successful career
            and make you industry-ready from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {programsData.map((program, index) => (
            <Card 
              key={program.id}
              className={`relative flex flex-col h-full shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out hover:scale-105 group overflow-hidden border-0 ${
                index === 0 ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white' :
                index === 1 ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white' :
                'bg-gradient-to-br from-emerald-600 to-teal-700 text-white'
              }`}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/20 transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 transform -translate-x-12 translate-y-12"></div>
              </div>
              
              <CardHeader className="text-center pb-3 md:pb-4 relative z-10">
                <div className="flex justify-center mb-3 md:mb-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                    <program.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-lg md:text-xl font-bold mb-2 md:mb-3 leading-tight">
                  {program.title}
                </CardTitle>
                <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold">
                  Duration: {program.duration}
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow px-4 md:px-6 pb-3 md:pb-4 relative z-10">
                <CardDescription className="text-white/90 mb-4 md:mb-5 leading-relaxed text-center text-sm md:text-base">
                  {program.description}
                </CardDescription>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20 flex-grow">
                  <h4 className="font-bold text-white mb-3 md:mb-4 text-center flex items-center justify-center text-sm md:text-base">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Available Programs
                  </h4>
                  <div className="space-y-1.5 md:space-y-2 max-h-40 md:max-h-48 overflow-y-auto custom-scrollbar">
                    {program.popularPrograms.filter(p => p.trim()).map((prog, progIndex) => (
                      <div key={progIndex} className="flex items-center bg-white/10 rounded-lg p-2 md:p-2.5 hover:bg-white/20 transition-colors duration-200">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full mr-2 md:mr-3 flex-shrink-0"></div>
                        <span className="text-white/95 text-xs md:text-sm font-medium leading-tight">{prog}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0 pb-4 md:pb-6 px-4 md:px-6 relative z-10">
                <Button
                  className="w-full bg-white text-gray-800 hover:bg-gray-100 font-semibold py-2.5 md:py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
                  onClick={onApplyClick}
                >
                  Learn More & Apply
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </section>
  );
};

export default ProgramsOffered;