import React, { useState } from 'react';
import { Upload, FileText, Link2, ArrowRight, Sparkles, Users, MessageSquare, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import CareerLensLogo from './CareerLensLogo';
import { Badge } from '@/components/ui/badge';
interface LandingPageProps {
  onUploadComplete: (type: 'resume' | 'linkedin', data: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onUploadComplete }) => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const processingSteps = [
    "Analyzing your profile...",
    "Extracting skills and experience...",
    "Identifying career interests...",
    "Matching with AI mentors...",
    "Preparing personalized experience..."
  ];

  const handleFileUpload = (file: File) => {
    startProcessing(() => onUploadComplete('resume', file.name));
  };

  const handleLinkedInSubmit = () => {
    if (linkedinUrl.trim()) {
      startProcessing(() => onUploadComplete('linkedin', linkedinUrl));
    }
  };

  const startProcessing = (callback: () => void) => {
    setIsProcessing(true);
    setProcessingStep(0);
    
    // Simulate AI processing with steps
    const interval = setInterval(() => {
      setProcessingStep(prev => {
        if (prev >= processingSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            callback();
          }, 500);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <CareerLensLogo size={80} className="mx-auto animate-pulse" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {processingSteps[processingStep]}
          </h2>
          <div className="w-64 mx-auto bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500"
              style={{ width: `${((processingStep + 1) / processingSteps.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Our AI is analyzing your profile to create personalized career mentors
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header with Logo */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <CareerLensLogo size={60} />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              CareerLens AI
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Break into your dream career with AI-powered mentorship
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Practice conversations with AI mentors, then connect with real professionals who match your career goals
          </p>
        </div>

        {/* Problem Statement */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              The Problem: You can't get a job without a referral
            </h3>
            <p className="text-red-700">
              College graduates are struggling to secure entry-level jobs in today's network-driven market
            </p>
          </div>
        </div>

        {/* Upload Options */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8">Step 1: Build Your Profile (Free)</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Resume Upload */}
            <Card className="hover-scale transition-all duration-300 hover:shadow-xl border-2 hover:border-indigo-200">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Upload Resume</h3>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 transition-all duration-300 ${
                      isDragOver 
                        ? 'border-indigo-400 bg-indigo-50' 
                        : 'border-gray-300 hover:border-indigo-300'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Drag & drop your resume or click to browse
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                      className="hidden"
                      id="resume-upload"
                    />
                    <Button
                      onClick={() => document.getElementById('resume-upload')?.click()}
                      variant="outline"
                      className="hover:bg-indigo-50 hover:border-indigo-300"
                    >
                      Choose File
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* LinkedIn URL */}
            <Card className="hover-scale transition-all duration-300 hover:shadow-xl border-2 hover:border-purple-200">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Link2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">LinkedIn Profile</h3>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Enter your LinkedIn profile URL for instant analysis
                    </p>
                    <div className="space-y-4">
                      <Input
                        type="url"
                        placeholder="https://linkedin.com/in/your-profile"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        className="text-center"
                      />
                      <Button
                        onClick={handleLinkedInSubmit}
                        disabled={!linkedinUrl.trim()}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      >
                        Analyze Profile <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-8 text-gray-800">Our 3-Step Solution</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  1
                </div>
                <h4 className="font-semibold mb-2">Profile Analysis</h4>
                <p className="text-sm text-gray-600">
                  We analyze your education, experience, hobbies, and career preferences to understand your unique background
                </p>
                <Badge className="mt-2 bg-green-100 text-green-800">Free</Badge>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  2
                </div>
                <h4 className="font-semibold mb-2">AI Mentor Conversations</h4>
                <p className="text-sm text-gray-600">
                  Practice with AI versions of professionals in your target roles. Build confidence in a safe space
                </p>
                <Badge className="mt-2 bg-blue-100 text-blue-800">Premium</Badge>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  3
                </div>
                <h4 className="font-semibold mb-2">Real Connections</h4>
                <p className="text-sm text-gray-600">
                  Match with actual professionals, alumni, and industry contacts. Get personalized outreach templates
                </p>
                <Badge className="mt-2 bg-purple-100 text-purple-800">Premium+</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;