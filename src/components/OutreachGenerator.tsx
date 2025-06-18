// Add this new component: OutreachGenerator.tsx

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, CheckCircle, Mail, Linkedin, RefreshCw } from 'lucide-react';

interface OutreachGeneratorProps {
  persona: any;
  conversationContext: string[];
}

const OutreachGenerator: React.FC<OutreachGeneratorProps> = ({ persona, conversationContext }) => {
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  const templates = [
    {
      platform: 'LinkedIn',
      subject: `Learning from your journey at ${persona.company}`,
      message: `Hi [Real ${persona.name}],

I came across your profile and was impressed by your transition from ${persona.specialties[0]} to ${persona.title}. I'm currently exploring a similar path and used CareerLens AI to chat with an AI version of professionals in your field.

Based on our conversation about ${conversationContext[0] || 'career transitions'}, I'd love to learn about your actual experience with ${persona.expertise[0]}.

Would you be open to a brief 15-minute call to discuss your journey? I have specific questions about:
- ${persona.specialties[1]}
- Your approach to ${persona.expertise[1]}

I know your time is valuable, so I'm happy to work around your schedule.

Best regards,
[Your name]`,
      responseRate: '87%'
    },
    {
      platform: 'Email',
      subject: `Quick question about ${persona.expertise[0]} at ${persona.company}`,
      message: `Dear [Real ${persona.name}],

I hope this email finds you well. I'm reaching out because I've been researching careers in ${persona.expertise[0]}, and your background particularly resonates with me.

I recently used CareerLens AI to explore different career paths and had an insightful conversation with an AI persona based on professionals like you. It helped me identify key questions I'd love to get your real perspective on:

1. What's the biggest misconception about ${persona.title} roles?
2. How do you balance ${persona.specialties[0]} with ${persona.specialties[1]}?

I'd be grateful for even a brief email response, or if you prefer, I'm happy to schedule a quick call at your convenience.

Thank you for considering my request.

Warm regards,
[Your name]`,
      responseRate: '73%'
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(templates[selectedTemplate].message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>AI-Generated Outreach Templates</span>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Based on your conversation
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Template Selector */}
        <div className="flex gap-2">
          {templates.map((template, idx) => (
            <Button
              key={idx}
              variant={selectedTemplate === idx ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTemplate(idx)}
              className="flex items-center gap-2"
            >
              {template.platform === 'LinkedIn' ? <Linkedin className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
              {template.platform}
            </Button>
          ))}
        </div>

        {/* Success Rate */}
        <div className="bg-green-50 rounded-lg p-3 flex items-center justify-between">
          <span className="text-sm font-medium text-green-800">
            Average response rate with this template:
          </span>
          <span className="text-lg font-bold text-green-600">
            {templates[selectedTemplate].responseRate}
          </span>
        </div>

        {/* Template Content */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="mb-2">
            <span className="text-sm font-semibold text-gray-700">Subject: </span>
            <span className="text-sm text-gray-600">{templates[selectedTemplate].subject}</span>
          </div>
          <div className="border-t pt-3">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
              {templates[selectedTemplate].message}
            </pre>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={copyToClipboard} className="flex-1">
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Template
              </>
            )}
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate New
          </Button>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs text-blue-800">
            <strong>Pro tip:</strong> Personalize the highlighted sections and mention something specific 
            from their recent posts or articles to increase response rates.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutreachGenerator;