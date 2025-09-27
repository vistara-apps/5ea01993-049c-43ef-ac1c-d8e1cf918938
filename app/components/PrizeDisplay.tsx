'use client';

import { Package, Gem, ExternalLink } from 'lucide-react';
import { Prize } from '@/lib/types';
import { PRIZE_TYPES } from '@/lib/constants';

interface PrizeDisplayProps {
  prize: Prize;
  variant?: 'physical' | 'digital-nft' | 'digital-crypto' | 'compact';
}

export function PrizeDisplay({ prize, variant = 'compact' }: PrizeDisplayProps) {
  const isPhysical = prize.type === 'physical';
  const Icon = isPhysical ? Package : Gem;
  
  return (
    <div className={`glass-card p-4 group hover:prize-glow transition-all duration-200 ${
      variant === 'compact' ? 'flex items-center space-x-3' : 'text-center'
    }`}>
      {/* Prize Icon/Image */}
      <div className={`${variant === 'compact' ? 'flex-shrink-0' : 'mx-auto mb-4'}`}>
        {prize.imageUrl ? (
          <img 
            src={prize.imageUrl} 
            alt={prize.name}
            className={`rounded-lg object-cover ${
              variant === 'compact' ? 'w-12 h-12' : 'w-24 h-24'
            }`}
          />
        ) : (
          <div className={`bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center ${
            variant === 'compact' ? 'w-12 h-12' : 'w-24 h-24'
          }`}>
            <Icon className={`text-bg ${variant === 'compact' ? 'h-6 w-6' : 'h-8 w-8'}`} />
          </div>
        )}
      </div>

      {/* Prize Details */}
      <div className={`${variant === 'compact' ? 'flex-1 min-w-0' : ''}`}>
        <h4 className={`font-semibold text-fg ${
          variant === 'compact' ? 'text-sm' : 'text-lg mb-2'
        }`}>
          {prize.name}
        </h4>
        
        {variant !== 'compact' && (
          <p className="text-neutral text-sm mb-3 line-clamp-2">
            {prize.description}
          </p>
        )}

        <div className={`flex items-center ${
          variant === 'compact' ? 'justify-between' : 'justify-center space-x-4'
        }`}>
          {/* Prize Type Badge */}
          <div className={`flex items-center space-x-1 ${
            variant === 'compact' ? 'text-xs' : 'text-sm'
          }`}>
            <span className={PRIZE_TYPES[prize.type].color}>
              {PRIZE_TYPES[prize.type].icon}
            </span>
            <span className="text-neutral">{PRIZE_TYPES[prize.type].label}</span>
          </div>

          {/* Prize Value */}
          <div className={`text-accent font-medium ${
            variant === 'compact' ? 'text-sm' : 'text-lg'
          }`}>
            {prize.type === 'physical' ? `$${prize.value.toLocaleString()}` : `${prize.value} ETH`}
          </div>
        </div>

        {/* Distribution Status */}
        {variant !== 'compact' && (
          <div className="mt-3">
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              prize.distributionStatus === 'distributed' ? 'status-completed' :
              prize.distributionStatus === 'claimed' ? 'status-active' : 'status-pending'
            }`}>
              {prize.distributionStatus.charAt(0).toUpperCase() + prize.distributionStatus.slice(1)}
            </div>
          </div>
        )}

        {/* Action Button for detailed view */}
        {variant !== 'compact' && prize.type === 'digital' && prize.nftContractAddress && (
          <button className="mt-4 btn-secondary text-sm flex items-center space-x-2 mx-auto">
            <span>View on Explorer</span>
            <ExternalLink className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
}
