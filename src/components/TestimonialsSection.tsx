// src/components/TestimonialsSection.tsx
"use client"; // Needed for potential carousel later, or if using client-side libraries

import React, { useState, useRef } from 'react';
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

// Sample testimonial data - replace with actual testimonials
const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    name: 'Priya Sharma',
    program: 'B.Tech Computer Science, Class of 2023',
    quote: "The faculty here is incredibly supportive, and the hands-on projects gave me the confidence to excel in my career. The placement support was fantastic!",
    avatarUrl: '/images/avatars/avatar1.png',
  },
  {
    id: 't2',
    name: 'Rahul Verma',
    program: 'MBA, Class of 2022',
    quote: "My time at [College Name] was transformative. The industry exposure and leadership training prepared me for the corporate world. The campus life is also vibrant.",
    avatarUrl: '/images/avatars/avatar2.png',
  },
  {
    id: 't3',
    name: 'Aisha Khan',
    program: 'B.Des Graphic Design, Class of 2024',
    quote: "The creative freedom and mentorship I received were invaluable. The collaborative studio environment and access to resources helped me build a strong portfolio.",
    avatarUrl: '/images/avatars/avatar3.png', // Example with no avatar provided
  },
];

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 mb-4">
            Words From Our Students
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Hear directly from our students and alumni about their experiences and achievements at [College Name].
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
                "{testimonial.quote}"
              </p>

              <div className="mt-auto pt-4 border-t border-slate-200 w-full">
                {testimonial.avatarUrl ? (
                  <Image
                    src={testimonial.avatarUrl}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="rounded-full mx-auto mb-3 border-2 border-blue-200"
                    style={{ objectFit: 'cover' }}
                  />
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
                  "{testimonial.quote}"
                </p>

                <div className="mt-auto pt-4 border-t border-slate-200 w-full">
                  {testimonial.avatarUrl ? (
                    <Image
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="rounded-full mx-auto mb-3 border-2 border-blue-200"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-semibold mx-auto mb-3">
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