
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Star, MessageSquare, Award, Briefcase, GraduationCap, Mail, Phone, Calendar } from 'lucide-react';
import { Persona } from './PersonaSelection';
import OutreachGenerator from './OutreachGenerator';

interface PersonaSidebarProps {
  persona: Persona;
  isOpen: boolean;
  onClose: () => void;
}

const PersonaSidebar: React.FC<PersonaSidebarProps> = ({ persona, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Mentor Profile</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Profile Card */}
          <Card className="mb-6">
            <div className={`h-20 ${persona.background} relative`}>
              <div className="absolute bottom-0 left-6 transform translate-y-1/2">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl shadow-lg">
                  {persona.avatar}
                </div>
              </div>
            </div>
            
            <CardContent className="pt-8 pb-4">
              <h3 className="text-xl font-bold mb-1">{persona.name}</h3>
              <p className="text-indigo-600 font-semibold text-sm">{persona.title}</p>
              <p className="text-gray-600 text-sm mb-3">{persona.company}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{persona.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">{persona.sessions} sessions</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-3">{persona.bio}</p>
              <div className="text-sm">
                <span className="font-semibold text-gray-700">Experience: </span>
                <span className="text-gray-600">{persona.experience}</span>
              </div>
            </CardContent>
          </Card>

          {/* Specialties */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="w-4 h-4" />
                Specialties
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {persona.specialties.map((specialty, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expertise Areas */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Expertise Areas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {persona.expertise.map((area, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{area}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

            {/* Outreach Generator */}
                    <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Generate Outreach Message</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  // For demo purposes, you can show an alert or open a modal
                  alert('Outreach generator would open here - showing personalized templates based on your conversation!');
                }}
              >
                <Mail className="w-4 h-4 mr-2" />
                Generate Personalized Outreach
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                87% response rate with AI-generated templates
              </p>
            </CardContent>
          </Card>

          {/* Connection Options */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Connect & Schedule</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule 1:1 Session
              </Button>
              
              <Button variant="outline" className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Send Follow-up Email
              </Button>
              
              <Button variant="outline" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Request Phone Call
              </Button>

              <Separator className="my-4" />
              
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-2">Available for mentoring</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Online now</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PersonaSidebar;
