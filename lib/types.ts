export interface Organizer {
  organizerId: string;
  name: string;
  contactInfo: string;
  walletAddress: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
}

export interface Supplier {
  supplierId: string;
  name: string;
  contactInfo: string;
  walletAddress: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export interface Prize {
  prizeId: string;
  drawId: string;
  name: string;
  description: string;
  type: 'physical' | 'digital';
  value: number;
  distributionStatus: 'pending' | 'distributed' | 'claimed';
  supplierId?: string;
  nftContractAddress?: string;
  tokenId?: string;
  chain?: string;
  imageUrl?: string;
}

export interface Draw {
  drawId: string;
  organizerId: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  prizeIds: string[];
  winnerAddresses: string[];
  onChainTxHash?: string;
  participantCount: number;
  maxParticipants?: number;
}

export interface Participant {
  participantId: string;
  drawId: string;
  walletAddress: string;
  entryTimestamp: Date;
  winnerStatus: boolean;
}

export interface DrawStats {
  totalDraws: number;
  activeDraws: number;
  totalPrizes: number;
  totalParticipants: number;
}
