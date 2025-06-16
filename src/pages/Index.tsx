
import React, { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import PersonaSelection from '@/components/PersonaSelection';
import ChatInterface from '@/components/ChatInterface';
import PersonaSidebar from '@/components/PersonaSidebar';
import { Persona } from '@/components/PersonaSelection';

type AppState = 'landing' | 'persona-selection' | 'chat';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadData, setUploadData] = useState<{ type: 'resume' | 'linkedin', data: string } | null>(null);

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

  return null;
};

export default Index;
