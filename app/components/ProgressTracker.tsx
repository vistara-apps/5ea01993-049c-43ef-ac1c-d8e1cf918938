'use client';

import { Check, Clock, AlertCircle } from 'lucide-react';

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'pending' | 'error';
  timestamp?: Date;
}

interface ProgressTrackerProps {
  steps: ProgressStep[];
  variant?: 'active' | 'completed';
}

export function ProgressTracker({ steps, variant = 'active' }: ProgressTrackerProps) {
  const getStepIcon = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4 text-success" />;
      case 'active':
        return <Clock className="h-4 w-4 text-accent animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-error" />;
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-neutral" />;
    }
  };

  const getStepStyles = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-success bg-opacity-20 border-success';
      case 'active':
        return 'bg-accent bg-opacity-20 border-accent';
      case 'error':
        return 'bg-error bg-opacity-20 border-error';
      default:
        return 'bg-surface border-neutral border-opacity-30';
    }
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-fg mb-6">
        {variant === 'completed' ? 'Draw Completed' : 'Draw Progress'}
      </h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start space-x-4">
            {/* Step Indicator */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center ${getStepStyles(step.status)}`}>
              {getStepIcon(step.status)}
            </div>

            {/* Step Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-fg">{step.title}</h4>
                {step.timestamp && (
                  <span className="text-xs text-neutral">
                    {step.timestamp.toLocaleDateString()} {step.timestamp.toLocaleTimeString()}
                  </span>
                )}
              </div>
              <p className="text-sm text-neutral mt-1">{step.description}</p>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="absolute left-4 mt-8 w-px h-6 bg-neutral bg-opacity-30" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
