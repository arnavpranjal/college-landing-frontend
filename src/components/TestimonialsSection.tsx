// src/components/TestimonialsSection.tsx
"use client"; // Needed for potential carousel later, or if using client-side libraries

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'; // Icon for quote marks
// For a carousel, you might use a library like Swiper or build a simpler one.
// For now, we'll do a static grid or a simple flex row that could become a carousel.

interface Testimonial {
  id: string;
  name: string;
  program: string; // e.g., "B.Tech CSE, Class of 2023"
  quote: string;
  avatarUrl?: string; // Optional student photo
}

interface TestimonialsSectionProps {
  collegeName: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ collegeName }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialsData, setTestimonialsData] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Function to check if an image exists
  const checkImageExists = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = document.createElement('img');
      const timeout = setTimeout(() => {
        resolve(false);
      }, 2000); // 2 second timeout for avatars
      
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

  // Function to find available avatar format
  const findAvatarUrl = async (collegeName: string, avatarNumber: number): Promise<string | undefined> => {
    const formats = ['png'];
    const basePath = `/${collegeName}/avatars/avatar${avatarNumber}`;
    
    for (const format of formats) {
      const avatarUrl = `${basePath}.${format}`;
      const exists = await checkImageExists(avatarUrl);
      if (exists) {
        return avatarUrl;
      }
    }
    
    return undefined; // No avatar found
  };

  // Function to parse markdown testimonials
  const parseTestimonials = useCallback(async (markdownText: string, collegeName: string): Promise<Testimonial[]> => {
    const sections = markdownText.split('---').filter(section => section.trim());
    
    // Process each section and find avatars in parallel
    const testimonialPromises = sections.map(async (section, index) => {
      const lines = section.trim().split('\n').filter(line => line.trim());
      
      let name = '';
      let program = '';
      let quote = '';
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('## ')) {
          name = line.replace('## ', '');
        } else if (line.startsWith('**Program:**')) {
          program = line.replace('**Program:**', '').trim();
        } else if (line && !line.startsWith('#') && !line.startsWith('**')) {
          quote += (quote ? ' ' : '') + line;
        }
      }
      
      if (name && program && quote) {
        // Find available avatar format (jpg or jpeg)
        const avatarUrl = await findAvatarUrl(collegeName, index + 1);
        
        return {
          id: `t${index + 1}`,
          name,
          program,
          quote,
          avatarUrl
        };
      }
      
      return null;
    });
    
    const results = await Promise.all(testimonialPromises);
    return results.filter(testimonial => testimonial !== null) as Testimonial[];
  }, []);

  // Load testimonials from MD file
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/${collegeName}/testimonials.md`);
        
        if (response.ok) {
          const markdownText = await response.text();
          const parsedTestimonials = await parseTestimonials(markdownText, collegeName);
          setTestimonialsData(parsedTestimonials);
        } else {
          console.warn('Testimonials file not found, using fallback data');
          // Fallback testimonials if file doesn't exist
          setTestimonialsData([
            {
              id: 't1',
              name: 'Student Name',
              program: 'Program Name, Class of 2024',
              quote: "This college has provided me with excellent education and opportunities for growth.",
              avatarUrl: `/${collegeName}/avatars/avatar1.png`
            }
          ]);
        }
      } catch (error) {
        console.error('Error loading testimonials:', error);
        // Fallback testimonials on error
        setTestimonialsData([
          {
            id: 't1',
            name: 'Student Name',
            program: 'Program Name, Class of 2024',
            quote: "This college has provided me with excellent education and opportunities for growth.",
            avatarUrl: `/${collegeName}/avatars/avatar1.jpeg`
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (collegeName) {
      loadTestimonials();
    }
  }, [collegeName, parseTestimonials]);

  const scrollToSlide = (slideIndex: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const slideWidth = container.clientWidth * 0.85; // 85% of container width per slide
      const scrollPosition = slideIndex * slideWidth;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentSlide(slideIndex);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const slideWidth = container.clientWidth * 0.85;
      const scrollPosition = container.scrollLeft;
      const newSlide = Math.round(scrollPosition / slideWidth);
      setCurrentSlide(Math.min(newSlide, testimonialsData.length - 1));
    }
  };

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % testimonialsData.length;
    scrollToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentSlide === 0 ? testimonialsData.length - 1 : currentSlide - 1;
    scrollToSlide(prevIndex);
  };

  if (loading) {
    return (
      <section id="testimonials" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 mb-4">
            Words From Our Students
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Hear directly from our students and alumni about their experiences and achievements.
          </p>
        </div>

        {/* Desktop Layout - Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-slate-50 p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
            >
              <Quote className="w-10 h-10 text-blue-500 mb-4 transform rotate-180" />
              
              <p className="text-xs sm:text-sm md:text-base text-gray-600 italic leading-relaxed mb-6 flex-grow">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="mt-auto pt-4 border-t border-slate-200 w-full">
                {testimonial.avatarUrl ? (
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-blue-200 overflow-hidden bg-gray-100">
                    <Image
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl sm:text-2xl font-semibold mx-auto mb-3">
                    {testimonial.name.charAt(0)} 
                  </div>
                )}
                <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                <p className="text-xs sm:text-sm text-gray-500">{testimonial.program}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Layout - Horizontal Scroll */}
        <div className="md:hidden">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Swipe to read more testimonials →
            </p>
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-4 space-x-4 snap-x snap-mandatory testimonials-scroll-container"
            onScroll={handleScroll}
          >
            {testimonialsData.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="flex-shrink-0 snap-start w-[85vw] max-w-sm bg-slate-50 p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
              >
                <Quote className="w-8 h-8 text-blue-500 mb-4 transform rotate-180" />
                
                <p className="text-gray-600 italic leading-relaxed mb-6 flex-grow text-sm">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="mt-auto pt-4 border-t border-slate-200 w-full">
                  {testimonial.avatarUrl ? (
                    <div className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-blue-200 overflow-hidden bg-gray-100">
                      <Image
                        src={testimonial.avatarUrl}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl sm:text-2xl font-semibold mx-auto mb-3">
                      {testimonial.name.charAt(0)} 
                    </div>
                  )}
                  <h4 className="text-sm font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500">{testimonial.program}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile scroll indicator dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  currentSlide === index 
                    ? 'bg-blue-500' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for mobile scrollbar */}
      <style jsx global>{`
        .testimonials-scroll-container {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .testimonials-scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;