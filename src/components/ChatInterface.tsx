import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Menu, Sparkles, Users } from 'lucide-react';
import { Persona } from './PersonaSelection';
import CareerLensLogo from './CareerLensLogo';
import { Badge } from '@/components/ui/badge';
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'persona';
  timestamp: Date;
}

interface ChatInterfaceProps {
  persona: Persona;
  onToggleSidebar: () => void;
  onReadyForRealPeople?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ persona, onToggleSidebar, onReadyForRealPeople }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm ${persona.name}, ${persona.title} at ${persona.company}. I'm here to help you practice and prepare for your career journey. Remember, I'm an AI mentor designed to help you build confidence before connecting with real professionals. What would you like to explore today?`,
      sender: 'persona',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationDepth, setConversationDepth] = useState(0);
  const [showRealPeoplePrompt, setShowRealPeoplePrompt] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Track conversation depth and show "Find Real People" after meaningful exchange
  useEffect(() => {
    if (conversationDepth >= 4 && !showRealPeoplePrompt) {
      setShowRealPeoplePrompt(true);
    }
  }, [conversationDepth]);

  const getDetailedResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Demo script for Sarah Chen - Engineering to PM transition
    if (persona.name === 'Sarah Chen') {
      // First question about transition
      if (conversationDepth === 0 && (lowerMessage.includes('transition') || lowerMessage.includes('engineer') || lowerMessage.includes('pm'))) {
        return "Great question! I transitioned from software engineering to product management at age 28, and it was one of the best decisions I made. The key was leveraging my technical skills while developing new competencies. I started by volunteering to write technical specifications and gradually took on more product-oriented tasks. What's your current role, and what's drawing you to product management?";
      }
      
      // Follow-up about current role - very flexible matching
      if (conversationDepth === 1) {
        // Check for any mention of engineering/developer/SWE and years/experience
        if (lowerMessage.includes('engineer') || lowerMessage.includes('developer') || lowerMessage.includes('swe') || 
            lowerMessage.includes('software') || lowerMessage.includes('coding') || lowerMessage.includes('programming')) {
          return "That's a solid foundation! As a software engineer, you already understand how products are built - that's a huge advantage. The main shifts I had to make were: 1) Moving from 'how' to 'why' - focusing on user problems rather than implementation details, 2) Learning to influence without authority, and 3) Getting comfortable with ambiguity. I'd suggest starting with small product ownership opportunities in your current role. Have you had any exposure to customer feedback or product decisions in your current position?";
        }
        // Fallback if they say something unexpected
        return "That's interesting! Tell me more about your technical background. The path from engineering to PM is one I know well, and I'd love to understand your starting point better. Have you had any exposure to customer feedback or product decisions in your current role?";
      }
      
      // Discussing specific skills - flexible matching for feedback
      if (conversationDepth === 2) {
        if (lowerMessage.includes('feedback') || lowerMessage.includes('customer') || lowerMessage.includes('user') || 
            lowerMessage.includes('client') || lowerMessage.includes('collect')) {
          return "Perfect! That customer interaction experience is gold. Here's what I'd recommend as next steps: First, start documenting those customer insights in a structured way - create simple one-pagers showing the problem, impact, and potential solutions. Second, volunteer to lead a feature from conception to launch. Third, start networking with PMs at your company - offer to help with technical feasibility assessments. The goal is to build a portfolio of 'PM-like' work while still in your engineering role. What type of products are you most interested in working on?";
        }
        // Fallback
        return "That's valuable experience! Any interaction with customers or user feedback is incredibly relevant for PM roles. Even if you haven't had direct customer contact yet, you can start by analyzing support tickets or user reviews. The key is showing you understand user needs. What type of products are you most interested in working on?";
      }
      
      // Career goals discussion - flexible B2B matching
      if (conversationDepth === 3) {
        if (lowerMessage.includes('b2b') || lowerMessage.includes('saas') || lowerMessage.includes('enterprise') || 
            lowerMessage.includes('business')) {
          return "B2B SaaS is an excellent choice for engineers transitioning to PM! The technical complexity plays to your strengths. I made a similar choice - I focused on infrastructure products at Google where my engineering background was a differentiator. For B2B, you'll need to understand sales cycles, enterprise needs, and how to balance customization requests with product vision. I'd recommend reading 'Crossing the Chasm' and following Product Hunt for B2B launches. Have you thought about which companies you'd like to target? I can share insights on their PM interview processes.";
        }
        // Fallback for other product interests
        return "That's a great area to focus on! Your engineering background will be particularly valuable there. The key is understanding the unique dynamics of your chosen market. Have you thought about which specific companies you'd like to target? I can share insights on their PM interview processes and what they look for in candidates.";
      }
      
      // Ready for real connections - trigger on any company-related question
      if (conversationDepth >= 4) {
        if (lowerMessage.includes('compan') || lowerMessage.includes('where') || lowerMessage.includes('target') || 
            lowerMessage.includes('apply') || lowerMessage.includes('which')) {
          return "You're asking all the right questions! Based on our conversation, you're definitely ready to connect with real PMs who've made this transition. They can share specific company insights and potentially refer you for positions. I've helped you practice the key talking points - your technical background as an advantage, your customer exposure, and your clear interest in B2B SaaS. You're ready to have these conversations with confidence. Would you like me to help you prepare outreach messages for real professionals in product management?";
        }
        // Fallback - still trigger the ready state
        return "That's exactly the strategic thinking you'll need as a PM! Based on our conversation covering your engineering background, customer feedback experience, and product interests, you're ready to take the next step. Real PMs who've made this transition can provide specific insights about their companies and potentially refer you. You've built a strong foundation through our practice session. Ready to connect with actual professionals who can help you make this career transition?";
      }
    }
    
    // Generic response for other personas or unexpected inputs
    return `That's an insightful question about ${
      lowerMessage.includes('career') ? 'career development' :
      lowerMessage.includes('interview') ? 'interview preparation' :
      lowerMessage.includes('skill') ? 'skill building' :
      'professional growth'
    }. Based on my experience at ${persona.company}, ${
      persona.specialties[0]
    } is crucial. Can you tell me more about your specific situation so I can provide targeted advice?`;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    // Increment conversation depth
    setConversationDepth(prev => prev + 1);

    // Simulate persona response with realistic delay based on response length
    const responseText = getDetailedResponse(inputText);
    const typingDelay = Math.min(2000 + (responseText.length * 15), 4000); // 15ms per character, max 4 seconds
    
    setTimeout(() => {
      const personaMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'persona',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, personaMessage]);
      setIsTyping(false);
    }, typingDelay);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <CareerLensLogo size={32} />
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-lg">
                {persona.avatar}
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{persona.name}</h2>
                <p className="text-sm text-gray-600">{persona.title} at {persona.company}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-800 text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Mentor
            </Badge>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-xs lg:max-w-md ${
              message.sender === 'user' 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                : 'bg-white shadow-sm'
            }`}>
              <CardContent className="p-3">
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-indigo-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Ready for Real People Prompt */}
        {showRealPeoplePrompt && (
          <div className="flex justify-center my-6">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">You're ready for real connections!</p>
                    <p className="text-sm text-green-700">
                      Based on this conversation, we can match you with actual {persona.title}s
                    </p>
                  </div>
                </div>
                <Button 
                  className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => onReadyForRealPeople?.()}
                >
                  Find Real Professionals to Connect With
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Ask ${persona.name} about ${persona.specialties[0]}...`}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="mt-2 flex gap-2 flex-wrap max-w-4xl mx-auto">
          <span className="text-xs text-gray-500">Suggested:</span>
          <button 
            onClick={() => setInputText("How did you transition from engineering to PM?")}
            className="text-xs text-indigo-600 hover:text-indigo-700"
          >
            "How did you transition?"
          </button>
          <button 
            onClick={() => setInputText("What skills should I focus on developing?")}
            className="text-xs text-indigo-600 hover:text-indigo-700"
          >
            "What skills matter most?"
          </button>
          <button 
            onClick={() => setInputText("How do I get my first PM interview?")}
            className="text-xs text-indigo-600 hover:text-indigo-700"
          >
            "Breaking into PM?"
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;