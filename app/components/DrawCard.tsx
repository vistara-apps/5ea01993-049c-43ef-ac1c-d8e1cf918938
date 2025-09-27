'use client';

import { Clock, Users, Trophy, ExternalLink } from 'lucide-react';
import { Draw, Prize } from '@/lib/types';
import { DRAW_STATUS_COLORS, MOCK_PRIZES } from '@/lib/constants';
import { PrizeDisplay } from './PrizeDisplay';

interface DrawCardProps {
  draw: Draw;
  variant?: 'compact' | 'detailed';
  onEnter?: (drawId: string) => void;
}

export function DrawCard({ draw, variant = 'compact', onEnter }: DrawCardProps) {
  const prizes = MOCK_PRIZES.filter(prize => draw.prizeIds.includes(prize.prizeId));
  const totalPrizeValue = prizes.reduce((sum, prize) => sum + prize.value, 0);
  
  const timeRemaining = draw.status === 'active' 
    ? Math.max(0, draw.endTime.getTime() - Date.now())
    : 0;
  
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  const handleEnterDraw = () => {
    if (onEnter) {
      onEnter(draw.drawId);
    }
  };

  return (
    <div className="metric-card group">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-fg mb-2">{draw.title}</h3>
          <p className="text-neutral text-sm line-clamp-2">{draw.description}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border border-opacity-30 ${DRAW_STATUS_COLORS[draw.status]}`}>
          {draw.status.charAt(0).toUpperCase() + draw.status.slice(1)}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Users className="h-4 w-4 text-accent mr-1" />
          </div>
          <div className="text-lg font-semibold text-fg">{draw.participantCount.toLocaleString()}</div>
          <div className="text-xs text-neutral">Participants</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Trophy className="h-4 w-4 text-accent mr-1" />
          </div>
          <div className="text-lg font-semibold text-fg">{prizes.length}</div>
          <div className="text-xs text-neutral">Prizes</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Clock className="h-4 w-4 text-accent mr-1" />
          </div>
          <div className="text-lg font-semibold text-fg">
            {draw.status === 'active' ? `${daysRemaining}d ${hoursRemaining}h` : 
             draw.status === 'upcoming' ? 'Soon' : 'Ended'}
          </div>
          <div className="text-xs text-neutral">
            {draw.status === 'active' ? 'Remaining' : 'Status'}
          </div>
        </div>
      </div>

      {/* Prizes Preview */}
      {variant === 'detailed' && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-fg mb-3">Featured Prizes</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {prizes.slice(0, 2).map((prize) => (
              <PrizeDisplay key={prize.prizeId} prize={prize} variant="compact" />
            ))}
          </div>
          {prizes.length > 2 && (
            <div className="text-center mt-3">
              <span className="text-sm text-neutral">+{prizes.length - 2} more prizes</span>
            </div>
          )}
        </div>
      )}

      {/* Progress Bar */}
      {draw.maxParticipants && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-neutral mb-1">
            <span>Progress</span>
            <span>{Math.round((draw.participantCount / draw.maxParticipants) * 100)}%</span>
          </div>
          <div className="w-full bg-surface rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-accent to-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((draw.participantCount / draw.maxParticipants) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-neutral">
          Total Value: <span className="text-accent font-medium">{totalPrizeValue} ETH</span>
        </div>
        
        {draw.status === 'active' && (
          <button 
            onClick={handleEnterDraw}
            className="btn-primary flex items-center space-x-2 text-sm px-4 py-2"
          >
            <span>Enter Draw</span>
            <ExternalLink className="h-3 w-3" />
          </button>
        )}
        
        {draw.status === 'completed' && (
          <button className="btn-secondary text-sm px-4 py-2">
            View Results
          </button>
        )}
        
        {draw.status === 'upcoming' && (
          <button className="btn-secondary text-sm px-4 py-2" disabled>
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
}
