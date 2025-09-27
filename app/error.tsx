'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-error bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-8 w-8 text-error" />
        </div>
        <h2 className="text-2xl font-bold text-fg mb-4">Something went wrong!</h2>
        <p className="text-neutral mb-6">
          We encountered an error while loading FairChain Draws. Please try again.
        </p>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="btn-primary flex items-center space-x-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="btn-secondary mx-auto block"
          >
            Go Home
          </button>
        </div>
        {error.digest && (
          <p className="text-xs text-neutral mt-4">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
