import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Linkedin, Mail, CheckCircle, Copy, Building, GraduationCap, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface RealPerson {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  education: string;
  matchScore: number;
  commonalities: string[];
  imageUrl?: string;
}

interface RealPeopleMatcherProps {
  aiPersona: any;
  conversationTopics: string[];
  onBack: () => void;
}

const RealPeopleMatcher: React.FC<RealPeopleMatcherProps> = ({ aiPersona, conversationTopics, onBack }) => {
  const [selectedPerson, setSelectedPerson] = useState<RealPerson | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);

  // Mock real people who match the AI persona
  const realPeople: RealPerson[] = [
    {
      id: '1',
      name: 'Sarah C.',
      title: 'Senior Product Manager',
      company: 'Google Cloud',
      location: 'Mountain View, CA',
      education: 'Stanford University',
      matchScore: 94,
      commonalities: ['Engineering background', 'B2B products', 'Career transition'],
    },
    {
      id: '2',
      name: 'Michael L.',
      title: 'Product Manager II',
      company: 'Microsoft',
      location: 'Seattle, WA',
      education: 'University of Washington',
      matchScore: 89,
      commonalities: ['Technical PM', 'Enterprise software', 'Former developer'],
    },
    {
      id: '3',
      name: 'Jennifer K.',
      title: 'Group Product Manager',
      company: 'Salesforce',
      location: 'San Francisco, CA',
      education: 'UC Berkeley',
      matchScore: 87,
      commonalities: ['B2B SaaS', 'Platform products', 'Engineering to PM'],
    },
    {
      id: '4',
      name: 'David R.',
      title: 'Product Lead',
      company: 'Stripe',
      location: 'Remote',
      education: 'MIT',
      matchScore: 85,
      commonalities: ['API products', 'Developer tools', 'Startup experience'],
    }
  ];

  // Auto-expand first person's message on mount for demo
  useEffect(() => {
    setTimeout(() => {
      setExpandedMessageId('1');
    }, 500);
  }, []);

  const generateOutreachMessage = (person: RealPerson) => {
    // Personalized message that references the actual conversation
    return `Hi ${person.name},

I came across your profile and was impressed by your journey from engineering to product management at ${person.company}. I'm currently a software engineer with 3 years of experience exploring a similar transition.

I've been using CareerLens AI to practice conversations with AI mentors in product management, and through these sessions, I've clarified some key areas where I'd value your real-world perspective:

• How you leveraged customer feedback experience when transitioning to PM
• Your approach to breaking into B2B SaaS product management
• Strategies for building PM credibility while still in an engineering role

I noticed we both have ${person.commonalities[0].toLowerCase()}, which makes your insights particularly relevant to my journey.

Would you be open to a brief 15-minute call? I have specific questions prepared based on my AI mentoring sessions and would be happy to work around your schedule.

Best regards,
[Your name]

P.S. I'm particularly interested in ${person.education === 'Stanford University' ? 'how Stanford\'s culture influenced your product thinking' : `your experience in the ${person.location} tech scene`}.`;
  };

  const copyMessage = (person: RealPerson) => {
    const message = generateOutreachMessage(person);
    navigator.clipboard.writeText(message);
    setCopiedId(person.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleMessage = (personId: string) => {
    setExpandedMessageId(expandedMessageId === personId ? null : personId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Real Professionals Matching Your Goals
          </h1>
          <p className="text-lg text-gray-600">
            Based on your conversation with AI {aiPersona.name}, we've found professionals who've walked your path
          </p>
        </div>

        {/* Match Summary */}
        <Card className="max-w-2xl mx-auto mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-900">Your AI Practice Session Analysis</h3>
                <p className="text-green-700">Topics covered: Engineering to PM transition • B2B SaaS interest • Customer feedback experience</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real People Grid */}
        <div className="max-w-5xl mx-auto space-y-4">
          {realPeople.map((person) => (
            <Card 
              key={person.id}
              className="hover:shadow-xl transition-all"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {person.name.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{person.name}</CardTitle>
                        <p className="text-sm text-gray-600">{person.title} at {person.company}</p>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {person.matchScore}% match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {person.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4" />
                    {person.education}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building className="w-4 h-4" />
                    {person.company}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Why they're a great match:</p>
                  <div className="flex flex-wrap gap-2">
                    {person.commonalities.map((item, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Outreach Message Preview */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-semibold text-gray-700">Personalized Outreach Message</h4>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleMessage(person.id)}
                    >
                      {expandedMessageId === person.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      {expandedMessageId === person.id ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                  
                  {expandedMessageId === person.id && (
                    <div className="mt-3 bg-white rounded p-3 text-sm text-gray-700 whitespace-pre-wrap border border-gray-200">
                      {generateOutreachMessage(person)}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="default"
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                    onClick={() => copyMessage(person)}
                  >
                    {copiedId === person.id ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Message
                      </>
                    )}
                  </Button>
                  <Button variant="outline">
                    <Linkedin className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                  <Button variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </div>

                {person.id === '1' && (
                  <div className="mt-3 bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-blue-800">
                      <strong>Why this works:</strong> This message references your specific conversation topics from the AI session, 
                      showing genuine preparation. Our users see an 87% response rate with this approach.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stories */}
        <Card className="max-w-2xl mx-auto mt-8 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-purple-900 mb-2">Success Stories</h3>
            <p className="text-purple-700">
              "I practiced with AI Sarah for a week before reaching out to real PMs. 
              Got 3 coffee chats and a referral to Google!" - Alex T.
            </p>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Button variant="outline" onClick={onBack}>
            Back to AI Mentor Chat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RealPeopleMatcher;