// Add this new component: AnalyticsDashboard.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, MessageSquare, Target } from 'lucide-react';

const AnalyticsDashboard: React.FC = () => {
  const metrics = [
    {
      label: 'Active Users',
      value: '12,847',
      change: '+23%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      label: 'Conversations',
      value: '48,392',
      change: '+18%',
      icon: MessageSquare,
      color: 'text-green-600'
    },
    {
      label: 'Success Rate',
      value: '87%',
      change: '+5%',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      label: 'Career Pivots',
      value: '3,241',
      change: '+31%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Card className="w-80 shadow-2xl border-2 border-indigo-100">
        <CardHeader className="pb-3 bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardTitle className="text-sm font-semibold text-gray-700">
            Platform Analytics (Live Demo)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric, idx) => (
              <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg">
                <metric.icon className={`w-5 h-5 ${metric.color} mx-auto mb-1`} />
                <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                <div className="text-xs text-gray-600">{metric.label}</div>
                <div className="text-xs font-semibold text-green-600">{metric.change}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-500 text-center">
            Updates every 5 seconds
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;