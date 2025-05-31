"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  // DialogDescription, // Commented out as it's unused
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Schema from HeroSection
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
});

interface RegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  // title?: string; // Commented out as it's unused
  // description?: string; // Commented out as it's unused
}

const RegistrationDialog: React.FC<RegistrationDialogProps> = ({ 
  isOpen, 
  onClose, 
  // title = "Register Your Interest", // Commented out as it's unused
  // description = "Fill out the form below and we'll get back to you with more information about our programs." // Commented out as it's unused
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobilePhone: "", 
    },
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      form.reset();
      form.clearErrors();
      setIsLoading(false);
    }
  }, [isOpen, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const submissionData = {
      ...values,
      mobilePhone: `+91${values.mobilePhone}`,
    };

    try {
      // Replace with your actual API URL and port for the backend
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://college-landing-backend.vercel.app';
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
        onClose(); // Close the dialog on successful submission
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] max-h-[90vh] overflow-y-auto bg-white border-2 border-gray-200 shadow-2xl p-0 [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="sr-only">Registration Form</DialogTitle>
        </DialogHeader>
        <div className="p-6 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </button>
          
          <div className="text-center mb-4 md:mb-3">
            <div className="w-12 h-12 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-1">
              <svg className="w-6 h-6 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-lg md:text-base font-bold mb-1 md:mb-0.5 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Start Your Journey
            </h2>
            <p className="text-sm md:text-xs text-gray-600">Register your interest</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 md:space-y-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm md:text-xs font-medium text-gray-700 flex items-center">
                      <svg className="w-4 h-4 md:w-3 md:h-3 mr-2 md:mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        {...field} 
                        disabled={isLoading}
                        className="border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded-md transition-all duration-200 bg-white/80 h-11 md:h-9 text-base md:text-xs px-4 md:px-3"
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
                    <FormLabel className="text-sm md:text-xs font-medium text-gray-700 flex items-center">
                      <svg className="w-4 h-4 md:w-3 md:h-3 mr-2 md:mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        className="border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded-md transition-all duration-200 bg-white/80 h-11 md:h-9 text-base md:text-xs px-4 md:px-3"
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
                    <FormLabel className="text-sm md:text-xs font-medium text-gray-700 flex items-center">
                      <svg className="w-4 h-4 md:w-3 md:h-3 mr-2 md:mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Mobile Number
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-3 md:px-2 rounded-l-md border border-r-0 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 font-medium text-base md:text-xs h-11 md:h-9">
                          +91
                        </span>
                        <Input
                          type="tel"
                          placeholder="9876543210"
                          maxLength={10}
                          {...field}
                          className="rounded-l-none border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-200 bg-white/80 h-11 md:h-9 text-base md:text-xs px-4 md:px-3"
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 md:py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] text-sm md:text-xs h-12 md:h-10 mt-4 md:mt-3" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 md:mr-1.5 h-4 w-4 md:h-3 md:w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-4 h-4 md:w-3 md:h-3 mr-2 md:mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Register Now
                  </div>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog; 