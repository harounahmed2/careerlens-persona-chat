
import React, { useState } from 'react';
import { Upload, FileText, Link2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface LandingPageProps {
  onUploadComplete: (type: 'resume' | 'linkedin', data: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onUploadComplete }) => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadType, setUploadType] = useState<'resume' | 'linkedin' | null>(null);

  const handleFileUpload = (file: File) => {
    // In a real app, you'd process the file here
    console.log('File uploaded:', file.name);
    onUploadComplete('resume', file.name);
  };

  const handleLinkedInSubmit = () => {
    if (linkedinUrl.trim()) {
      onUploadComplete('linkedin', linkedinUrl);
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            CareerLens AI
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get personalized career guidance from diverse AI mentors. Upload your resume or LinkedIn profile 
            and connect with expert personas tailored to your career goals.
          </p>
        </div>

        {/* Upload Options */}
        <div className="max-w-4xl mx-auto">
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

          {/* Features Preview */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-8 text-gray-800">What happens next?</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  1
                </div>
                <h4 className="font-semibold mb-2">AI Analysis</h4>
                <p className="text-sm text-gray-600">We analyze your profile to understand your background</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  2
                </div>
                <h4 className="font-semibold mb-2">Meet Your Mentors</h4>
                <p className="text-sm text-gray-600">Choose from diverse AI career personas</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  3
                </div>
                <h4 className="font-semibold mb-2">Get Guidance</h4>
                <p className="text-sm text-gray-600">Start chatting for personalized career advice</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
