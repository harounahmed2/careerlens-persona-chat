
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Star, Award, Briefcase, GraduationCap } from 'lucide-react';

export interface Persona {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  expertise: string[];
  experience: string;
  bio: string;
  specialties: string[];
  rating: number;
  sessions: number;
  background: string;
}

const personas: Persona[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Senior Engineering Manager',
    company: 'Google',
    avatar: '👩‍💻',
    expertise: ['Tech Leadership', 'Career Transition', 'Negotiation'],
    experience: '12 years in tech',
    bio: 'Former startup founder turned Big Tech leader. Specialized in helping engineers navigate career growth and leadership transitions.',
    specialties: ['Technical Leadership', 'Startup to Corporate', 'Salary Negotiation'],
    rating: 4.9,
    sessions: 847,
    background: 'bg-gradient-to-br from-blue-400 to-indigo-600'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    title: 'Creative Director',
    company: 'Nike',
    avatar: '🎨',
    expertise: ['Creative Strategy', 'Brand Building', 'Portfolio Review'],
    experience: '15 years in design',
    bio: 'Award-winning creative director with experience across fashion, sports, and lifestyle brands. Passionate about diverse representation in creative fields.',
    specialties: ['Creative Portfolio', 'Brand Strategy', 'Design Leadership'],
    rating: 4.8,
    sessions: 623,
    background: 'bg-gradient-to-br from-purple-400 to-pink-600'
  },
  {
    id: '3',
    name: 'Dr. Amara Okafor',
    title: 'Chief Data Scientist',
    company: 'Microsoft',
    avatar: '👩‍🔬',
    expertise: ['Data Science', 'AI/ML', 'Research to Industry'],
    experience: '10 years in data science',
    bio: 'PhD in Machine Learning, transitioned from academia to industry. Advocates for ethical AI and helps others break into data science.',
    specialties: ['Data Science Career', 'AI Ethics', 'Academic Transition'],
    rating: 4.9,
    sessions: 734,
    background: 'bg-gradient-to-br from-green-400 to-teal-600'
  },
  {
    id: '4',
    name: 'James Wellington',
    title: 'Investment Director',
    company: 'Goldman Sachs',
    avatar: '💼',
    expertise: ['Finance', 'Investment Banking', 'Career Pivoting'],
    experience: '18 years in finance',
    bio: 'Former investment banker now in private equity. Helps professionals navigate high-pressure careers and work-life balance in finance.',
    specialties: ['Finance Careers', 'Investment Banking', 'Executive Presence'],
    rating: 4.7,
    sessions: 512,
    background: 'bg-gradient-to-br from-yellow-400 to-orange-600'
  },
  {
    id: '5',
    name: 'Priya Sharma',
    title: 'Head of Product',
    company: 'Stripe',
    avatar: '🚀',
    expertise: ['Product Management', 'Startups', 'Growth Strategy'],
    experience: '8 years in product',
    bio: 'Product leader who built 0-to-1 products at multiple unicorn startups. Specializes in product strategy and go-to-market execution.',
    specialties: ['Product Strategy', 'Startup Growth', 'Go-to-Market'],
    rating: 4.8,
    sessions: 689,
    background: 'bg-gradient-to-br from-indigo-400 to-purple-600'
  }
];

interface PersonaSelectionProps {
  onSelectPersona: (persona: Persona) => void;
}

const PersonaSelection: React.FC<PersonaSelectionProps> = ({ onSelectPersona }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Choose Your AI Career Mentor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select from our diverse panel of AI career personas, each with unique expertise and backgrounds
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {personas.map((persona, index) => (
            <Card 
              key={persona.id} 
              className="hover-scale transition-all duration-300 hover:shadow-2xl border-2 hover:border-indigo-200 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`h-24 ${persona.background} relative`}>
                <div className="absolute bottom-0 left-6 transform translate-y-1/2">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl shadow-lg">
                    {persona.avatar}
                  </div>
                </div>
              </div>
              
              <CardContent className="pt-10 pb-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{persona.name}</h3>
                  <p className="text-indigo-600 font-semibold">{persona.title}</p>
                  <p className="text-gray-600 text-sm">{persona.company} • {persona.experience}</p>
                </div>

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

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {persona.bio}
                </p>

                <div className="space-y-3 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      Specialties
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {persona.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => onSelectPersona(persona)}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Mentoring Session
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonaSelection;
