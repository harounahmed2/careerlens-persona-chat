import React, { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import PersonaSelection from '@/components/PersonaSelection';
import ChatInterface from '@/components/ChatInterface';
import PersonaSidebar from '@/components/PersonaSidebar';
import RealPeopleMatcher from '@/components/RealPeopleMatcher';
import { Persona } from '@/components/PersonaSelection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type AppState = 'landing' | 'persona-selection' | 'chat' | 'real-people';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadData, setUploadData] = useState<{ type: 'resume' | 'linkedin', data: string } | null>(null);
  const [conversationTopics] = useState<string[]>([
    'Transitioning from engineering to PM',
    'Building product sense',
    'Preparing for PM interviews',
    'Understanding B2B product management'
  ]);

  const handleUploadComplete = (type: 'resume' | 'linkedin', data: string) => {
    setUploadData({ type, data });
    console.log(`${type} uploaded:`, data);
    setAppState('persona-selection');
  };

  const handleSelectPersona = (persona: Persona) => {
    setSelectedPersona(persona);
    setAppState('chat');
    setSidebarOpen(true);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleReadyForRealPeople = () => {
    setAppState('real-people');
    setSidebarOpen(false);
  };

  const handleBackToChat = () => {
    setAppState('chat');
    setSidebarOpen(true);
  };

  if (appState === 'landing') {
    return <LandingPage onUploadComplete={handleUploadComplete} />;
  }

  if (appState === 'persona-selection') {
    return <PersonaSelection onSelectPersona={handleSelectPersona} />;
  }

  if (appState === 'chat' && selectedPersona) {
    return (
      <div className="flex h-screen">
        <div className="flex-1">
          <ChatInterface 
            persona={selectedPersona} 
            onToggleSidebar={toggleSidebar}
            onReadyForRealPeople={handleReadyForRealPeople}
          />
        </div>
        <PersonaSidebar
          persona={selectedPersona}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        

      </div>
    );
  }

  if (appState === 'real-people' && selectedPersona) {
    return (
      <RealPeopleMatcher
        aiPersona={selectedPersona}
        conversationTopics={conversationTopics}
        onBack={handleBackToChat}
      />
    );
  }

  return null;
};

export default Index;