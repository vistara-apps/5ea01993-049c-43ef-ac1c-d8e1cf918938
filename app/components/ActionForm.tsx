'use client';

import { useState } from 'react';
import { Loader2, ExternalLink, Gift } from 'lucide-react';

interface ActionFormProps {
  variant: 'entry' | 'claim';
  drawId?: string;
  prizeId?: string;
  onSubmit?: (data: any) => Promise<void>;
}

export function ActionForm({ variant, drawId, prizeId, onSubmit }: ActionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    walletAddress: '',
    email: '',
    shippingAddress: '',
    agreeToTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit) return;

    setIsLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (variant === 'entry') {
    return (
      <div className="glass-card p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="h-8 w-8 text-bg" />
          </div>
          <h3 className="text-xl font-semibold text-fg mb-2">Enter Draw</h3>
          <p className="text-neutral">Connect your wallet to participate in this draw</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-fg mb-2">
              Wallet Address
            </label>
            <input
              type="text"
              value={formData.walletAddress}
              onChange={(e) => handleInputChange('walletAddress', e.target.value)}
              placeholder="0x..."
              className="w-full bg-surface border border-neutral border-opacity-30 rounded-lg px-4 py-3 text-fg placeholder-neutral focus:border-accent focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-fg mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-surface border border-neutral border-opacity-30 rounded-lg px-4 py-3 text-fg placeholder-neutral focus:border-accent focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreeToTerms}
              onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
              className="mt-1 h-4 w-4 text-accent bg-surface border-neutral rounded focus:ring-accent"
              required
            />
            <label htmlFor="terms" className="text-sm text-neutral">
              I agree to the{' '}
              <a href="/terms" className="text-accent hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-accent hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading || !formData.agreeToTerms}
            className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Entering Draw...</span>
              </>
            ) : (
              <>
                <span>Enter Draw</span>
                <ExternalLink className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    );
  }

  // Claim variant
  return (
    <div className="glass-card p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-success to-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
          <Gift className="h-8 w-8 text-bg" />
        </div>
        <h3 className="text-xl font-semibold text-fg mb-2">Congratulations! 🎉</h3>
        <p className="text-neutral">You've won a prize! Please provide your details to claim it.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-fg mb-2">
            Wallet Address
          </label>
          <input
            type="text"
            value={formData.walletAddress}
            onChange={(e) => handleInputChange('walletAddress', e.target.value)}
            placeholder="0x..."
            className="w-full bg-surface border border-neutral border-opacity-30 rounded-lg px-4 py-3 text-fg placeholder-neutral focus:border-accent focus:outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-fg mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your@email.com"
            className="w-full bg-surface border border-neutral border-opacity-30 rounded-lg px-4 py-3 text-fg placeholder-neutral focus:border-accent focus:outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-fg mb-2">
            Shipping Address (for physical prizes)
          </label>
          <textarea
            value={formData.shippingAddress}
            onChange={(e) => handleInputChange('shippingAddress', e.target.value)}
            placeholder="Full shipping address..."
            rows={3}
            className="w-full bg-surface border border-neutral border-opacity-30 rounded-lg px-4 py-3 text-fg placeholder-neutral focus:border-accent focus:outline-none transition-colors resize-none"
          />
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="claim-terms"
            checked={formData.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
            className="mt-1 h-4 w-4 text-accent bg-surface border-neutral rounded focus:ring-accent"
            required
          />
          <label htmlFor="claim-terms" className="text-sm text-neutral">
            I confirm that the information provided is accurate and agree to the prize claim terms.
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading || !formData.agreeToTerms}
          className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Processing Claim...</span>
            </>
          ) : (
            <>
              <span>Claim Prize</span>
              <Gift className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
