'use client';

import { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Users, Gift, Plus, Filter } from 'lucide-react';
import { AppShell } from './components/AppShell';
import { DrawCard } from './components/DrawCard';
import { ActionForm } from './components/ActionForm';
import { ProgressTracker } from './components/ProgressTracker';
import { MOCK_DRAWS } from '@/lib/constants';
import { DrawStats } from '@/lib/types';

export default function HomePage() {
  const [selectedDrawId, setSelectedDrawId] = useState<string | null>(null);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');
  
  const [stats, setStats] = useState<DrawStats>({
    totalDraws: 0,
    activeDraws: 0,
    totalPrizes: 0,
    totalParticipants: 0,
  });

  // Calculate stats from mock data
  useEffect(() => {
    const activeDraws = MOCK_DRAWS.filter(draw => draw.status === 'active').length;
    const totalParticipants = MOCK_DRAWS.reduce((sum, draw) => sum + draw.participantCount, 0);
    const totalPrizes = MOCK_DRAWS.reduce((sum, draw) => sum + draw.prizeIds.length, 0);

    setStats({
      totalDraws: MOCK_DRAWS.length,
      activeDraws,
      totalPrizes,
      totalParticipants,
    });
  }, []);

  const filteredDraws = MOCK_DRAWS.filter(draw => 
    filterStatus === 'all' || draw.status === filterStatus
  );

  const handleEnterDraw = (drawId: string) => {
    setSelectedDrawId(drawId);
    setShowEntryForm(true);
  };

  const handleFormSubmit = async (data: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form submitted:', data);
    setShowEntryForm(false);
    setSelectedDrawId(null);
  };

  // Sample progress steps for demo
  const sampleProgressSteps = [
    {
      id: '1',
      title: 'Draw Created',
      description: 'Smart contract deployed and draw initialized',
      status: 'completed' as const,
      timestamp: new Date('2024-01-15T10:00:00Z'),
    },
    {
      id: '2',
      title: 'Entry Period Active',
      description: 'Participants can now enter the draw',
      status: 'completed' as const,
      timestamp: new Date('2024-01-15T10:05:00Z'),
    },
    {
      id: '3',
      title: 'Collecting Entries',
      description: 'Currently accepting participant entries',
      status: 'active' as const,
    },
    {
      id: '4',
      title: 'Winner Selection',
      description: 'Blockchain RNG will select winners',
      status: 'pending' as const,
    },
    {
      id: '5',
      title: 'Prize Distribution',
      description: 'Winners will receive their prizes',
      status: 'pending' as const,
    },
  ];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
            <Trophy className="h-10 w-10 text-bg" />
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-4">
            FairChain Draws
          </h1>
          <p className="text-xl text-neutral max-w-2xl mx-auto mb-8">
            Transparent, Blockchain-Verified Draws with Seamless Prize Fulfillment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Create Draw</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>Browse Draws</span>
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="metric-card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-6 w-6 text-bg" />
            </div>
            <div className="text-2xl font-bold text-fg mb-1">{stats.totalDraws}</div>
            <div className="text-sm text-neutral">Total Draws</div>
          </div>

          <div className="metric-card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-success to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-bg" />
            </div>
            <div className="text-2xl font-bold text-fg mb-1">{stats.activeDraws}</div>
            <div className="text-sm text-neutral">Active Draws</div>
          </div>

          <div className="metric-card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-bg" />
            </div>
            <div className="text-2xl font-bold text-fg mb-1">{stats.totalParticipants.toLocaleString()}</div>
            <div className="text-sm text-neutral">Participants</div>
          </div>

          <div className="metric-card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-warning to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <Gift className="h-6 w-6 text-bg" />
            </div>
            <div className="text-2xl font-bold text-fg mb-1">{stats.totalPrizes}</div>
            <div className="text-sm text-neutral">Total Prizes</div>
          </div>
        </div>

        {/* Draws Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-semibold text-fg">Active Draws</h2>
            
            {/* Filter Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-neutral" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="bg-surface border border-neutral border-opacity-30 rounded-lg px-3 py-2 text-sm text-fg"
                >
                  <option value="all">All Draws</option>
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Draws Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDraws.map((draw) => (
              <DrawCard
                key={draw.drawId}
                draw={draw}
                variant="detailed"
                onEnter={handleEnterDraw}
              />
            ))}
          </div>

          {filteredDraws.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="h-16 w-16 text-neutral mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-fg mb-2">No draws found</h3>
              <p className="text-neutral">Try adjusting your filters or check back later.</p>
            </div>
          )}
        </div>

        {/* Progress Tracker for Featured Draw */}
        {MOCK_DRAWS.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-fg">Featured Draw Progress</h2>
            <ProgressTracker steps={sampleProgressSteps} variant="active" />
          </div>
        )}

        {/* Entry Form Modal */}
        {showEntryForm && (
          <div className="fixed inset-0 bg-bg bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="max-w-md w-full">
              <ActionForm
                variant="entry"
                drawId={selectedDrawId || undefined}
                onSubmit={handleFormSubmit}
              />
              <button
                onClick={() => setShowEntryForm(false)}
                className="mt-4 w-full btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
