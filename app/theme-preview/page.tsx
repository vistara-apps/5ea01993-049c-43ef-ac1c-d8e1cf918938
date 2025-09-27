'use client';

import { AppShell } from '../components/AppShell';
import { DrawCard } from '../components/DrawCard';
import { PrizeDisplay } from '../components/PrizeDisplay';
import { ActionForm } from '../components/ActionForm';
import { ProgressTracker } from '../components/ProgressTracker';
import { useTheme } from '../components/ThemeProvider';
import { MOCK_DRAWS, MOCK_PRIZES } from '@/lib/constants';

export default function ThemePreviewPage() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'default', name: 'Finance (Default)', description: 'Professional finance theme with dark navy and gold' },
    { id: 'celo', name: 'Celo', description: 'Black background with yellow accents' },
    { id: 'solana', name: 'Solana', description: 'Dark purple with magenta accents' },
    { id: 'base', name: 'Base', description: 'Dark blue with Base blue accents' },
    { id: 'coinbase', name: 'Coinbase', description: 'Dark navy with Coinbase blue' },
  ];

  const sampleProgressSteps = [
    {
      id: '1',
      title: 'Draw Created',
      description: 'Smart contract deployed successfully',
      status: 'completed' as const,
      timestamp: new Date(),
    },
    {
      id: '2',
      title: 'Collecting Entries',
      description: 'Currently accepting participants',
      status: 'active' as const,
    },
    {
      id: '3',
      title: 'Winner Selection',
      description: 'Pending blockchain RNG',
      status: 'pending' as const,
    },
  ];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Theme Selector */}
        <div className="glass-card p-6">
          <h1 className="text-2xl font-bold text-fg mb-6">Theme Preview</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id as any)}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  theme === themeOption.id
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-neutral border-opacity-30 hover:border-accent hover:border-opacity-50'
                }`}
              >
                <h3 className="font-semibold text-fg mb-1">{themeOption.name}</h3>
                <p className="text-sm text-neutral">{themeOption.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Component Previews */}
        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-fg">Component Previews</h2>

          {/* Buttons */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-medium text-fg mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary Button</button>
              <button className="btn-primary" disabled>Disabled Button</button>
            </div>
          </div>

          {/* Status Badges */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-medium text-fg mb-4">Status Badges</h3>
            <div className="flex flex-wrap gap-4">
              <span className="status-active">Active</span>
              <span className="status-completed">Completed</span>
              <span className="status-pending">Pending</span>
            </div>
          </div>

          {/* Draw Card */}
          <div>
            <h3 className="text-lg font-medium text-fg mb-4">Draw Card</h3>
            <div className="max-w-lg">
              <DrawCard draw={MOCK_DRAWS[0]} variant="detailed" />
            </div>
          </div>

          {/* Prize Display */}
          <div>
            <h3 className="text-lg font-medium text-fg mb-4">Prize Display</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <PrizeDisplay prize={MOCK_PRIZES[0]} />
              <PrizeDisplay prize={MOCK_PRIZES[2]} />
            </div>
          </div>

          {/* Progress Tracker */}
          <div>
            <h3 className="text-lg font-medium text-fg mb-4">Progress Tracker</h3>
            <div className="max-w-lg">
              <ProgressTracker steps={sampleProgressSteps} />
            </div>
          </div>

          {/* Action Form */}
          <div>
            <h3 className="text-lg font-medium text-fg mb-4">Action Form</h3>
            <div className="max-w-md">
              <ActionForm variant="entry" />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
