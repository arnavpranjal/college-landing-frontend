// src/components/HeroSection.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Schema from your provided code
const formSchema = z.object({
  fullName: z.string()
    .min(2, { message: "Full name must be at least 2 characters long." })
    .max(100, { message: "Full name must be at most 100 characters long." })
    .trim(),
  email: z.string()
    .email({ message: "Please provide a valid email address." })
    .max(255, { message: "Email address must be at most 255 characters long." })
    .trim(),
  mobilePhone: z.string()
    .length(10, { message: "Mobile number must be exactly 10 digits." })
    .regex(/^[6-9]\d{9}$/, { 
      message: "Please enter a valid 10-digit Indian mobile number."
    })
    .trim(),
  consent: z.boolean().refine(val => val === true, {
    message: "You must consent to data processing and communication."
  }),
});

interface HeroSectionProps {
  collegeName: string;
  onImageLoaded?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ collegeName, onImageLoaded }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [heroImageUrl, setHeroImageUrl] = useState<string>('');
  const [imageLoading, setImageLoading] = useState(true);

  // Function to check if an image exists with timeout
  const checkImageExists = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      const timeout = setTimeout(() => {
        resolve(false);
      }, 3000); // 3 second timeout
      
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

  // Find the available hero image format (parallel loading)
  useEffect(() => {
    const findHeroImage = async () => {
      setImageLoading(true);
      const imageFormats = ['png','jpg', 'jpeg', 'webp'];
      const basePath = `/${collegeName}/backgroundImage/hero`;
      
      // Check all formats in parallel
      const promises = imageFormats.map(async (format) => {
        const imageUrl = `${basePath}.${format}`;
        const exists = await checkImageExists(imageUrl);
        return exists ? imageUrl : null;
      });
      
      try {
        const results = await Promise.all(promises);
        const foundImage = results.find(url => url !== null);
        
        if (foundImage) {
          setHeroImageUrl(foundImage);
        } else {
          setHeroImageUrl('');
        }
      } catch (error) {
        console.warn('Error loading hero image:', error);
        setHeroImageUrl('');
      } finally {
        setImageLoading(false);
        // Notify parent component that image loading is complete
        onImageLoaded?.();
      }
    };

    if (collegeName) {
      findHeroImage();
    }
  }, [collegeName, onImageLoaded]);

  const handleApplyNowClick = () => {
    const formSection = document.getElementById('registration-form-actual');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobilePhone: "", 
      consent: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const submissionData = {
      ...values,
      mobilePhone: `+91${values.mobilePhone}`,
    };

    try {
      // Replace with your actual API URL and port for the backend
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/leads/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result.message || `Server responded with ${response.status}`;
        console.error("Submission failed:", errorMessage, result);
        toast.error(`Submission failed: ${errorMessage}`);
      } else {
        console.log("Submission successful:", result);
        toast.success("Thank you for registering! We will be in touch shortly.");
        form.reset();
      }
    } catch (error) {
      console.error("An error occurred during submission:", error);
      const message = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast.error(`Submission error: ${message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      className="relative bg-cover bg-center md:bg-cover bg-no-repeat py-16 md:py-32 text-white min-h-screen md:min-h-0"
      style={{
        backgroundImage: imageLoading 
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
          : heroImageUrl 
            ? `url('${heroImageUrl}')` 
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: "cover",
        backgroundPosition: "center center",
        transition: 'background-image 0.5s ease-in-out'
      }}
    >
      {imageLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
      )}
      <div className="absolute inset-0 bg-black opacity-40 md:opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
        <div className="flex flex-col md:flex-row items-center w-full">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Unlock Your Future at [College Name]
            </h1>
            <p className="text-sm sm:text-base md:text-xl mb-6">
              Join a community of learners and innovators. Discover programs that ignite your passion.
            </p>
            <Button
              variant="default"
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] text-sm md:text-base px-6 py-3"
              onClick={handleApplyNowClick}
              disabled={isLoading} 
            >
              Apply Now
            </Button>
          </div>

          <div className="md:w-1/2 flex justify-center md:justify-end px-4 md:px-0" id="registration-form-section">
            <div id="registration-form-actual" className="bg-white/95 backdrop-blur-md p-2 md:p-3 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md text-gray-800">
              <div className="text-center mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-base font-bold mb-0.5 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Start Your Journey
                </h2>
                <p className="text-xs text-gray-600">Register your interest</p>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-medium text-gray-700 flex items-center">
                          <svg className="w-3 h-3 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your full name" 
                            {...field} 
                            disabled={isLoading}
                            className="border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded-md transition-all duration-200 bg-white/80 h-7 text-xs px-2"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-medium text-gray-700 flex items-center">
                          <svg className="w-3 h-3 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your.email@example.com" 
                            {...field} 
                            disabled={isLoading}
                            className="border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded-md transition-all duration-200 bg-white/80 h-7 text-xs px-2"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mobilePhone"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-medium text-gray-700 flex items-center">
                          <svg className="w-3 h-3 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Mobile Number
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <span className="inline-flex items-center px-1.5 rounded-l-md border border-r-0 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 font-medium text-xs h-7">
                              +91
                            </span>
                            <Input
                              type="tel"
                              placeholder="9876543210"
                              maxLength={10}
                              {...field}
                              className="rounded-l-none border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-200 bg-white/80 h-7 text-xs px-2"
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <div className="flex flex-row items-start space-x-2 space-y-0 rounded-md border border-gray-200 p-2 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={isLoading}
                              className="border border-blue-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 h-3 w-3"
                            />
                          </FormControl>
                          <div className="space-y-0.5 leading-tight">
                            <FormLabel className="text-xs font-medium text-gray-700">
                              I agree to receive communications
                            </FormLabel>
                            <FormDescription className="text-xs text-gray-500 leading-tight">
                              By submitting, you agree to our{' '}
                              <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-medium">
                                Privacy Policy
                              </a>
                            </FormDescription>
                          </div>
                        </div>
                        <FormMessage className="text-xs" /> 
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-1.5 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] text-xs" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-1.5 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Register Now
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;