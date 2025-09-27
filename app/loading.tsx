import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Loader2 className="h-8 w-8 text-bg animate-spin" />
        </div>
        <h2 className="text-xl font-semibold text-fg mb-2">Loading FairChain Draws</h2>
        <p className="text-neutral">Preparing your blockchain-verified experience...</p>
      </div>
    </div>
  );
}
